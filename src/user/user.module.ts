import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaModule } from 'src/services/prisma.service'; 

@Module({
  imports: [PrismaModule],
  providers: [UserService],
})
export class UserModule {}
