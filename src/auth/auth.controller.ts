import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../services/prisma.service';
import { LoginUserDto, RegisterUserDto } from 'src/user/user.dto';

// Decorator to specify the base route for this controller
@Controller('auth')
export class AuthController {
  // Constructor injection: NestJS will automatically provide instances of AuthService and PrismaService
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  // Endpoint for user registration with a POST request
  @Post('register')
  async register(@Body() userDto: RegisterUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });
    if (existingUser) {
      throw new Error('Email already exists.');
    }
    return this.authService.register(userDto);
  }

  // Endpoint for user login with a POST request
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    // If validation is successful, generate and return a JWT token
    return this.authService.login(user);
  }
}
