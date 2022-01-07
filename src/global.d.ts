/// <reference types="@sveltejs/kit" />

// import type * as urql from '@urql/svelte';
// import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

// type OperationStore<
// 	T extends TypedDocumentNode = any,
// 	Normalized = object,
// > = T extends TypedDocumentNode<infer Data, infer Vars>
// 	? urql.OperationStore<Data & Normalized, Vars>
// 	: never;

// type Crumb = {
// 	name: string;
// 	title?: string;
// 	href: string;
// 	id?: string;
// };

interface Locals {
	hasura: string;
	user: string;
}

interface Session {
	hasura: string;
	user: string;
}
interface CLoad {
	session: Session;
}

// export { }