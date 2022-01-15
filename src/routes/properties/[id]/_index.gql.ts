// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PropertyDetails = {
	__typename?: 'properties';
	id: number;
	client_id?: number | null | undefined;
	area?: string | null | undefined;
	block?: string | null | undefined;
	street?: string | null | undefined;
	avenue?: string | null | undefined;
	number?: string | null | undefined;
	coordinates?: any | null | undefined;
};

export type PropertyDetailsVariables = Types.Exact<{ [key: string]: never }>;

export type PropertyDetailPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type PropertyDetailPage = {
	__typename?: 'query_root';
	properties_by_pk?:
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

export type PropertyById = {
	__typename?: 'query_root';
	properties_by_pk?:
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

export type PropertyByIdVariables = Types.Exact<{ [key: string]: never }>;

export type DeletePropertyVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteProperty = {
	__typename?: 'mutation_root';
	delete_properties_by_pk?:
		| { __typename?: 'properties'; id: number }
		| null
		| undefined;
};

export const PropertyDetails = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'propertyDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'properties' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
				],
			},
		},
	],
} as unknown as DocumentNode<PropertyDetails, PropertyDetailsVariables>;
export const PropertyById = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'propertyById' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'properties_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
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
} as unknown as DocumentNode<PropertyById, PropertyByIdVariables>;
export const PropertyDetailPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertyDetailPage' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'propertyById' },
					},
				],
			},
		},
		...PropertyById.definitions,
	],
} as unknown as DocumentNode<PropertyDetailPage, PropertyDetailPageVariables>;
export const DeletePropertyDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteProperty' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'delete_properties_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<DeleteProperty, DeletePropertyVariables>;
export type PropertyDetailPageStore = OperationStore<
	PropertyDetailPage,
	PropertyDetailPageVariables
>;
export type DeletePropertyStore = OperationStore<
	DeleteProperty,
	DeletePropertyVariables
>;
