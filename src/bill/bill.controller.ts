import { Controller, Get, UseGuards, Param, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { BillService } from './services/bill.service';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    // Fetch all bills for the authenticated user using the provided service
    return this.billService.findAllforUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    // Fetch a specific bill by its ID for the authenticated user using the provided service
    return this.billService.findOneForUser(Number(id), req.user.id);
  }
}
