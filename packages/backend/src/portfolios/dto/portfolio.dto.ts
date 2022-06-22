import { Portfolio } from '@prisma/client';

export class PortfolioDto implements Portfolio {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  shortName: string | null;
  civilid: string | null;
  phone: string | null;
  email: string | null;
  dob: Date | null;
  organizationId: string;
}
