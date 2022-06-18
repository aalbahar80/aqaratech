import { Tenant } from '@prisma/client';

export class TenantDto implements Tenant {
  id: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  shortName: string | null;
  civilid: string | null;
  dob: Date | null;
  phone: string | null;
  email: string | null;
  passportNum: string | null;
  nationality: string | null;
  residencyNum: string | null;
  residencyEnd: Date | null;
  contactMethod: string | null;
}
