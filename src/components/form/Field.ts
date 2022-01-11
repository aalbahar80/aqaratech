import * as zod from 'zod';

export class Field {
	fieldName: string;

	title?: string;

	inputType?: string;

	editable?: boolean;

	visibile?: boolean;

	hideable?: boolean;

	sortable?: boolean;

	searchable?: boolean;

	searchType?: string;

	width?: number;

	pattern?: string;

	validation?;

	constructor(field: Field) {
		this.fieldName = field.fieldName;
		this.title = field.title || field.fieldName;
		this.inputType = field.inputType || 'text';
		this.editable = field.editable === undefined || field.editable === true;
		this.visibile = field.visibile === undefined || field.visibile === true;
		this.hideable = field.hideable === undefined || field.hideable === true;
		this.sortable = field.sortable === undefined || field.sortable === true;
		this.searchable =
			field.searchable === undefined || field.searchable === true;
		this.searchType = field.searchType || 'text';
		this.width = field.width;
		this.validation = field.validation;
	}

	static getZodValidations(fieldList: Field[]) {
		const schema = fieldList.reduce((acc, field) => {
			if (field.editable && field.validation) {
				acc[field.fieldName] = field.validation;
			}
			return acc;
		}, {});
		return zod.object(schema);
	}

	static addLinkField(fieldList: Field[]) {
		return [
			new Field({
				fieldName: 'actions',
				title: 'Details',
				editable: false,
				sortable: false,
				hideable: true,
			}),
			...fieldList,
		];
	}
}
