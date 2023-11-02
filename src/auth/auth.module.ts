import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from './jwt/jwt.module';
import { PrismaService } from '../services/prisma.service';

@Module({
  // Providers define the set of services that are available for injection throughout the module
  providers: [AuthService, PrismaService],
  // Controllers define the set of controllers that should be instantiated by the Nest injector
  controllers: [AuthController],
  // Imports specify other modules that this module uses.
  // It allows establishing module-to-module relationships, and ensures the necessary features
  imports: [JwtAuthModule],
})
// Define the AuthModule class which organizes relevant authentication-related functionality
export class AuthModule {}
