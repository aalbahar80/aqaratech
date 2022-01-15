// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PropertyDetails } from './[id]/_index.gql';
export type AddPropertyVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.Properties_Insert_Input>;
}>;

export type AddProperty = {
	__typename?: 'mutation_root';
	insert_properties_one?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export const AddPropertyDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddProperty' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'properties_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_properties_one' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'object' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'object' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'propertyDetails' },
								},
							],
						},
					},
				],
			},
		},
		...PropertyDetails.definitions,
	],
} as unknown as DocumentNode<AddProperty, AddPropertyVariables>;
export type AddPropertyStore = OperationStore<
	AddProperty,
	AddPropertyVariables
>;
