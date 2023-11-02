import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/services/prisma.service';

export interface UserData {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to find a user by email.
  async findOne(email: string): Promise<any> {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  // Method to create a new user.

  async create(createUserData: UserData): Promise<any> {
    try {
      createUserData.password = await this.hashPassword(
        createUserData.password,
      );
      return await this.prisma.user.create({
        data: createUserData,
      });
    } catch (error) {
      // Check for unique constraint violation error (email already in use).
      if (error.code === 'P2002') {
        throw new ConflictException('Email address is already in use.');
      }
      throw error;
    }
  }

  // Private method to hash a password using bcrypt.
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Method to compare a provided password with the stored hash.
  async checkPassword(
    attempt: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(attempt, storedPassword);
  }
}
