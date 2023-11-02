import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to fetch all bills associated with a specific user by their ID
  async findAllforUser(userId: number) {
    return await this.prisma.bill.findMany({
      where: {
        userId: userId,
      },
    });
  }
  // Method to fetch a specific bill based on its ID and the associated user's ID
  async findOneForUser(id: number, userId: number) {
    return this.prisma.bill.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
