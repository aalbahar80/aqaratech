import type { DocumentNode } from 'graphql';
import type { Field } from '$components/form/Field';

export interface entity {
	title: string;
	graphqlName: string;
	graphqlNamePk: string;
	fieldList: Field[];
	docs: docs;
}

export interface docs {
	insert: DocumentNode;
	update: DocumentNode;
	del: DocumentNode;
	list: DocumentNode;
	byId: DocumentNode;
}
