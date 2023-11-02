import { Module } from '@nestjs/common';
import { BillService } from './services/bill.service';
import { BillController } from './bill.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  // Services that will be instantiated by the Nest injector and can be shared at least across this module
  providers: [BillService, PrismaService],
  // Set of controllers defined within this module which have to be instantiated
  controllers: [BillController],
})
export class BillModule {}
