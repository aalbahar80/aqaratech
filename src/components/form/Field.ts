import type { BaseSchema } from 'yup';
import * as yup from 'yup';

export class Field {
	fieldName: string;
	title?: string;
	inputType?: string;
	editable?: boolean;
	visibile?: boolean;
	hideable?: boolean;
	sortable?: boolean;
	width?: number;
	validation?: BaseSchema;
	constructor(field: Field) {
		this.fieldName = field.fieldName;
		this.title = field.title || field.fieldName;
		this.inputType = field.inputType || 'text';
		this.editable = field.editable === undefined || field.editable === true;
		this.visibile = field.visibile === undefined || field.visibile === true;
		this.hideable = field.hideable === undefined || field.hideable === true;
		this.sortable = field.sortable === undefined || field.sortable === true;
		this.width = field.width;
		this.validation = field.validation;
	}
}

// a class to represent a list of fields
export class FieldList {
	fieldList: Field[];
	constructor(fieldList: Field[]) {
		this.fieldList = [
			new Field({
				fieldName: 'actions',
				title: 'Details',
				editable: false,
				sortable: false,
				hideable: false
			}),
			...fieldList
		];
	}

	// get validations for all fields
	getValidations() {
		const schema = this.fieldList.reduce((acc, field) => {
			if (field.editable && field.validation) {
				acc[field.fieldName] = field.validation;
			}
			return acc;
		}, {});
		return yup.object().shape(schema);
	}
}
