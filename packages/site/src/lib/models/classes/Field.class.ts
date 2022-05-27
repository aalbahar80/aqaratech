import { startCase } from '$lib/utils/common';

type FeildType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'select'
	| 'checkbox'
	| 'radio';

export class Field {
	constructor(
		public id: string,
		public type: FeildType = 'text',
		public label: string = startCase(id),
	) {}
}
