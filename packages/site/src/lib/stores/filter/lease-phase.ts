import { LeasePhaseEnum } from '$api/openapi';
import { writable } from '$lib/utils/sandboxed';

export const LEASE_PHASE = {
	...LeasePhaseEnum,
	ALL: 'ALL',
} as const;

export type LeasePhase = (typeof LEASE_PHASE)[keyof typeof LEASE_PHASE];

export const leasePhase = writable<LeasePhase>(LEASE_PHASE.Ongoing);
