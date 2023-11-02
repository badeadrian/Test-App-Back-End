import { Controller, Get, UseGuards, Param, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { InvoiceService } from './services/invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return this.invoiceService.findAllforUser(req.user.id);

}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.invoiceService.findOneForUser(Number(id), req.user.id);
  }
}
