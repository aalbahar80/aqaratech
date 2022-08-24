import { Tenant } from '@prisma/client';

export class TenantIndexEvent {
  constructor(public readonly tenants: Tenant[]) {}
}
