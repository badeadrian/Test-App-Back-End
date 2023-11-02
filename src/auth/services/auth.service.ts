// Import necessary modules and services
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Decorator marks the class as injectable for NestJS's dependency injection system
@Injectable()
export class AuthService {
  // Define the number of salt rounds for hashing
  private readonly saltRounds: number;

  // Constructor to initialize necessary services
  constructor(
    private prisma: PrismaService, // Database service for querying user details
    private jwtService: JwtService, // Service for JWT operations
    private configService: ConfigService, // Configuration service for environment variables
  ) {
    // Set salt rounds from configuration or default to 12
    this.saltRounds =
      Number(this.configService.get('BCRYPT_SALT_ROUNDS')) || 12;
  }

  // Register a new user
  async register(userDto: any) {
    console.log('Attempting to register user:', userDto);
    // Hash the user password
    const hashedPassword = await bcrypt.hash(userDto.password, this.saltRounds);
    console.log('Password hashed successfully');
    // Create a new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        ...userDto,
        password: hashedPassword,
      },
    });
    console.log('User created in database:', newUser);
    return newUser;
  }

  // Log in an existing user and return a JWT token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT token for the user
    };
  }

  // Validate user by email and password
  async validateUser(email: string, password: string): Promise<any> {
    // Find the user in the database by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude the password in the return
      return result;
    }
    return null;
  }
}
