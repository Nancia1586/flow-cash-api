import { TCategory } from './category';
import { TUser } from './user';

export type TTransaction = {
  id: string;
  amount: number;
  categoryId: string;
  userId: string;
  createdAt: Date;
  user?: TUser;
  category?: TCategory;
};
