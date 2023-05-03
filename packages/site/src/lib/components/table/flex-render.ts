import { flexRender as flexRenderOrig } from '@tanstack/svelte-table';

import type { ComponentType } from 'svelte';

// BUG: https://github.com/TanStack/table/issues/4778#issuecomment-1517680029
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flexRender = <P extends Record<string, any>, C = any>(
	component: C,
	props: P,
): ComponentType => flexRenderOrig(component, props) as ComponentType;
