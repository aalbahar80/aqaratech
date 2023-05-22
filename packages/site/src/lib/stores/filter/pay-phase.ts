import { PAY_PHASE, type PayPhase } from '@self/utils';

import { writable } from '$lib/utils/sandboxed';

export const payPhase = writable<PayPhase>(PAY_PHASE.ALL);
