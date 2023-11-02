import { Module } from '@nestjs/common';
import { InvoiceService } from './services/invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  providers: [InvoiceService, PrismaService],
  controllers: [InvoiceController]
})
export class InvoiceModule {}
