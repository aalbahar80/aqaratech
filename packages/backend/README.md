## Generate client library from openApi schema

```bash
pnpm run api:generate:all --force
# uses configs defined in openapitools.json (requires docker or java)
```

# Model notes

## Relation foreign keys

Relation id's are to be set on initial entity creation. They should never be updated.
Example: `Lease.unitId` & `Lease.tenantId` fields should never be updated. If they absolutely need to change, the `lease` should be deleted and re-entered with the correct `unitId`/`tenantId`.

## Names, labels, and titles

Some models have a `label` field (on the DB-schema level) to grant users the ability to provide a more user-friendly name for an entity.
Example: Portfolio model has a `fullName` field as well as `label` field.

For convenience, those same models also expose a `title` field on the API level. The `title` field always equals the `label`, unless it is undefined, in which case it will revert to another existing field. (`fullName` for Portfolio, derived `address` for Property, etc)

# Billing

1. New organization is created.
2. We create a new Stripe customer for the organization.
3. We create a new Stripe subscription for the organization.
