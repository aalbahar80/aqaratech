import { Field, FieldList } from '$components/form/Field';
import { DeletePropertyDocument } from '$generated/graphql';
import * as yup from 'yup';
import { PropertyListDocument } from '../../generated/graphql';

const title = 'Properties';
const graphqlName = 'properties';
const docs = {
	delete: DeletePropertyDocument,
	list: PropertyListDocument
};

const fieldList: FieldList = new FieldList([
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'area',
		title: 'Area'
	}),
	new Field({
		fieldName: 'block',
		title: 'Block',
		validation: yup
			.number()
			.required()
			.min(1)
			.max(13)
			.typeError('Must be a number')
	}),
	new Field({
		fieldName: 'street',
		title: 'St',
		validation: yup
			.string()
			.required()
			.min(1)
			.max(13)
			.typeError('Must be a string')
	}),
	new Field({
		fieldName: 'avenue',
		title: 'Ave',
		visibile: false
	}),
	new Field({
		fieldName: 'number',
		title: 'Number'
	})
]);

const info = { title, graphqlName, docs, fieldList };
export default info;
