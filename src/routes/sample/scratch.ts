//@ts-nocheck
import { handleParams } from '../../lib/utils/table-utils.ts';

const a = handleParams({
	pageIndex: 1,
	search: 'sdf',
	sortKey: 'updatedAt',
	sortDir: 'desc',
	pageSize: 11,
});

console.log(a);
