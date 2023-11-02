import { Invoice } from '../invoice/invoice.entity';
import { Bill } from '../bill/bill.entity';

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  invoices: Invoice[];
  bills: Bill[];
}
