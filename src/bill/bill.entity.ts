import { User } from '../user/user.entity';

export class Bill {
  id: number;
  amount: number;
  date: Date;
  details: string;
  userId: number;
  user: User;
}
