import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async findAllforUser(userId: number) {
  return await this.prisma.invoice.findMany({
        where: {
            userId: userId,
        },
    });
}

  async findOneForUser(id: number, userId: number) {
    return await this.prisma.invoice.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
