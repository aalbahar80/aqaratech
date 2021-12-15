import { Field, FieldList } from '$components/form/Field';
import {
	DeleteTenantDocument,
	InsertTenantDocument,
	TenantListDocument,
	UpdateTenantDocument
} from '$generated/graphql';
import * as yup from 'yup';

const title = 'Tenants';
const graphQlName = 'tenants';

const docs = {
	delete: DeleteTenantDocument,
	insert: InsertTenantDocument,
	list: TenantListDocument,
	update: UpdateTenantDocument
};

const fieldList: FieldList = new FieldList([
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		inputType: 'text',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		inputType: 'text',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		inputType: 'email',
		validation: yup.string().nullable().email()
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		inputType: 'tel',
		validation: yup
			.string()
			.nullable()
			.matches(/^[0-9]{8}$/, {
				message: 'Must be an 8 digit number',
				excludeEmptyString: true
			})
	})
]);

const info = { title, graphQlName, docs, fieldList };
export default info;
