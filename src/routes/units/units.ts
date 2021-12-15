import { Field, FieldList } from '$components/form/Field';
import { DeleteUnitDocument, UnitListDocument } from '$generated/graphql';

const title = 'Units';
const graphQlName = 'units';

const docs = {
	delete: DeleteUnitDocument,
	list: UnitListDocument
};

const fieldList: FieldList = new FieldList([
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'is_vacant',
		title: 'Vacant?',
		editable: false
	}),
	new Field({
		fieldName: 'rent_market',
		title: 'Market Rent',
		inputType: 'number'
	}),
	new Field({
		fieldName: 'size',
		title: 'Size m²',
		inputType: 'number'
	}),
	new Field({
		fieldName: 'type',
		title: 'Type'
	}),
	new Field({
		fieldName: 'unit_number',
		title: 'Number'
	}),
	new Field({
		fieldName: 'usage',
		title: 'Usage'
	}),
	new Field({
		fieldName: 'bed',
		title: 'Beds',
		inputType: 'number'
	}),
	new Field({
		fieldName: 'bath',
		title: 'Baths',
		inputType: 'number'
	}),
	new Field({
		fieldName: 'floor',
		title: 'Floor',
		inputType: 'number'
	})
]);
const info = { title, graphQlName, docs, fieldList };
export default info;
