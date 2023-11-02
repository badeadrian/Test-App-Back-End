import { User } from '../user/user.entity';

export class Invoice {
  id: number;
  amount: number;
  date: Date;
  details: string;
  userId: number;
  user: User;
}