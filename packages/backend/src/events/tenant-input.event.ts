import { Tenant } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TenantIndexed implements Partial<Tenant> {
  id: string;
  fullName: string;
  label: string | null;
  phone: string | null;
  passportNum: string | null;
  civilid: string | null;
  residencyNum: string | null;
  organizationId: string;

  @Expose()
  get title(): string {
    return this.fullName;
  }
}

export class UpdateIndexEvent {
  constructor(
    // TODO add types
    public readonly indexName: 'tenants',
    public readonly instance: Record<string, any>,
  ) {}
}
