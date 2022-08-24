import { Tenant } from '@prisma/client';

export class TenantInputEvent {
  constructor(public readonly tenant: Tenant) {}
}
