/// <reference types="@sveltejs/kit" />

import type * as urql from '@urql/svelte';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type OperationStore<
	T extends TypedDocumentNode = any,
	Normalized = object,
> = T extends TypedDocumentNode<infer Data, infer Vars>
	? urql.OperationStore<Data & Normalized, Vars>
	: never;

export type Crumb = {
	name: string;
	title?: string
	href: string;
	id?: string;
};