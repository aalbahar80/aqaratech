import { Field } from '$components/form/Field';
import {
	DeleteTenantDocument,
	InsertTenantDocument,
	TenantListDocument,
	UpdateTenantDocument
} from '$generated/graphql';
import { z } from 'zod';

const title = 'Tenants';
const graphqlName = 'tenants';

const docs = {
	delete: DeleteTenantDocument,
	insert: InsertTenantDocument,
	list: TenantListDocument,
	update: UpdateTenantDocument
};

const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false
	}),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		inputType: 'text',
		validation: z.string().nonempty()
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		inputType: 'text',
		validation: z.string().nonempty()
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		inputType: 'email',
		validation: z.string().email().nonempty()
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		inputType: 'tel'
		// validation: yup
		// 	.string()
		// 	.nullable()
		// 	.matches(/^[0-9]{8}$/, {
		// 		message: 'Must be an 8 digit number',
		// 		excludeEmptyString: true
		// 	})
	})
];

const info = { title, graphqlName, docs, fieldList };
export default info;
