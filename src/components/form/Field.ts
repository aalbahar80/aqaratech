// import * as yup from 'yup';
import * as zod from 'zod';
export class Field {
	fieldName: string;
	title?: string;
	inputType?: string;
	editable?: boolean;
	visibile?: boolean;
	hideable?: boolean;
	sortable?: boolean;
	width?: number;
	validation?;
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

	// toObject(field: Field) {
	// 	return {
	// 		fieldName: field.fieldName,
	// 		title: field.title || field.fieldName,
	// 		inputType: field.inputType || 'text',
	// 		editable: field.editable === undefined || field.editable === true,
	// 		visibile: field.visibile === undefined || field.visibile === true,
	// 		hideable: field.hideable === undefined || field.hideable === true,
	// 		sortable: field.sortable === undefined || field.sortable === true,
	// 		width: field.width,
	// 		validation: field.validation
	// 	};

	// static getYupValidations(fieldList: Field[]) {
	// 	const schema = fieldList.reduce((acc, field) => {
	// 		if (field.editable && field.validation) {
	// 			acc[field.fieldName] = field.validation;
	// 		}
	// 		return acc;
	// 	}, {});
	// 	return yup.object(schema);
	// }

	static getZodValidations(fieldList: Field[]) {
		const schema = fieldList.reduce((acc, field) => {
			if (field.editable && field.validation) {
				acc[field.fieldName] = field.validation;
			}
			return acc;
		}, {});
		return zod.object(schema);
	}
}

// defin Field interfaces
export interface FieldInter {
	fieldName: string;
	title?: string;
	inputType?: string;
	editable?: boolean;
	visibile?: boolean;
	hideable?: boolean;
	sortable?: boolean;
	width?: number;
	validation?;
}

function createField(field: Field): FieldInter {
	return {
		fieldName: field.fieldName,
		title: field.title || field.fieldName,
		inputType: field.inputType || 'text',
		editable: field.editable === undefined || field.editable === true,
		visibile: field.visibile === undefined || field.visibile === true,
		hideable: field.hideable === undefined || field.hideable === true,
		sortable: field.sortable === undefined || field.sortable === true,
		width: field.width,
		validation: field.validation
	};
}
