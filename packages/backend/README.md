# Model notes

## Relation foreign keys

Relation id's are to be set on initial entity creation. They should never be updated.
Example: `Lease.unitId` & `Lease.tenantId` fields should never be updated. If they absolutely need to change, the `lease` should be deleted and re-entered with the correct `unitId`/`tenantId`.
