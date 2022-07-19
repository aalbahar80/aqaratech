import { ExpenseType } from '@prisma/client';

export class ExpenseTypeDto implements ExpenseType {
  id: number;
  labelEn: string;
  labelAr: string;
  description: string | null;
  parentId: number | null;
}
