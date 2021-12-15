import { Field, FieldList } from '$components/form/Field';
import { DeleteClientDocument, ClientListDocument } from '$generated/graphql';
import * as yup from 'yup';

const title = 'Clients';
const graphQlName = 'clients';

const docs = {
	delete: DeleteClientDocument,
	list: ClientListDocument
};

const fieldList: FieldList = new FieldList([
	new Field({ fieldName: 'id', title: 'ID', editable: false }),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		validation: yup.string().required()
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		validation: yup.string().email()
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		validation: yup.string().matches(/^[0-9]{8}$/, {
			message: 'Must be an 8 digit number',
			excludeEmptyString: true
		})
	})
]);

const info = { title, graphQlName, docs, fieldList };
export default info;
