import { Field } from './Field';
// @ponicode
describe('Field.addLinkField', () => {
	test('0', () => {
		let result: any = Field.addLinkField([
			new Field({ fieldName: 'id', title: 'ID', editable: false }),
			new Field({
				fieldName: 'first_name',
				title: 'First Name',
			}),
			new Field({
				fieldName: 'last_name',
				title: 'Last Name',
			}),
			new Field({
				fieldName: 'email',
				title: 'Email',
			}),
			new Field({
				fieldName: 'phone',
				title: 'Phone',
			}),
		]);
		expect(result).toStrictEqual([
			new Field({
				fieldName: 'actions',
				title: 'Details',
				editable: false,
				sortable: false,
				hideable: true,
			}),
			new Field({ fieldName: 'id', title: 'ID', editable: false }),
			new Field({
				fieldName: 'first_name',
				title: 'First Name',
			}),
			new Field({
				fieldName: 'last_name',
				title: 'Last Name',
			}),
			new Field({
				fieldName: 'email',
				title: 'Email',
			}),
			new Field({
				fieldName: 'phone',
				title: 'Phone',
			}),
		]);
	});
});
