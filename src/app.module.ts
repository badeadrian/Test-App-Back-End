import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InvoiceModule,
    BillModule,
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
