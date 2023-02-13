import { PAID_LATE, type PaidLate } from '@self/utils';

import { writable } from '$lib/utils/sandboxed';

export const isPaidLate = writable<PaidLate>(PAID_LATE.ALL);
