// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UnitDetails = {
	__typename?: 'units';
	id: number;
	is_vacant?: boolean | null | undefined;
	rent_market?: number | null | undefined;
	size?: number | null | undefined;
	type?: string | null | undefined;
	unit_number?: string | null | undefined;
	usage?: string | null | undefined;
	bed?: any | null | undefined;
	bath?: any | null | undefined;
	floor?: string | null | undefined;
	property_id?: number | null | undefined;
};

export type UnitDetailsVariables = Types.Exact<{ [key: string]: never }>;

export type BreadcrumbsUnit = {
	__typename?: 'units';
	id: number;
	property?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type BreadcrumbsUnitVariables = Types.Exact<{ [key: string]: never }>;

export type UnitDetailPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type UnitDetailPage = {
	__typename?: 'query_root';
	units_by_pk?:
		| {
				__typename?: 'units';
				id: number;
				is_vacant?: boolean | null | undefined;
				rent_market?: number | null | undefined;
				size?: number | null | undefined;
				type?: string | null | undefined;
				unit_number?: string | null | undefined;
				usage?: string | null | undefined;
				bed?: any | null | undefined;
				bath?: any | null | undefined;
				floor?: string | null | undefined;
				property_id?: number | null | undefined;
				property?:
					| {
							__typename?: 'properties';
							id: number;
							client_id?: number | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type UnitById = {
	__typename?: 'query_root';
	units_by_pk?:
		| {
				__typename?: 'units';
				id: number;
				is_vacant?: boolean | null | undefined;
				rent_market?: number | null | undefined;
				size?: number | null | undefined;
				type?: string | null | undefined;
				unit_number?: string | null | undefined;
				usage?: string | null | undefined;
				bed?: any | null | undefined;
				bath?: any | null | undefined;
				floor?: string | null | undefined;
				property_id?: number | null | undefined;
				property?:
					| {
							__typename?: 'properties';
							id: number;
							client_id?: number | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type UnitByIdVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteUnitVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteUnit = {
	__typename?: 'mutation_root';
	delete_units_by_pk?: { __typename?: 'units'; id: number } | null | undefined;
};

export const UnitDetails = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'unitDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'units' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_vacant' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'rent_market' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'size' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'unit_number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'usage' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'bed' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'bath' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'floor' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'property_id' } },
				],
			},
		},
	],
} as unknown as DocumentNode<UnitDetails, UnitDetailsVariables>;
export const BreadcrumbsUnit = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'breadcrumbsUnit' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'units' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'property' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<BreadcrumbsUnit, BreadcrumbsUnitVariables>;
export const UnitById = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'unitById' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'units_by_pk' },
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
									name: { kind: 'Name', value: 'unitDetails' },
								},
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'breadcrumbsUnit' },
								},
							],
						},
					},
				],
			},
		},
		...UnitDetails.definitions,
		...BreadcrumbsUnit.definitions,
	],
} as unknown as DocumentNode<UnitById, UnitByIdVariables>;
export const UnitDetailPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UnitDetailPage' },
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
					{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'unitById' } },
				],
			},
		},
		...UnitById.definitions,
	],
} as unknown as DocumentNode<UnitDetailPage, UnitDetailPageVariables>;
export const DeleteUnitDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteUnit' },
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
						name: { kind: 'Name', value: 'delete_units_by_pk' },
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
} as unknown as DocumentNode<DeleteUnit, DeleteUnitVariables>;
export type UnitDetailPageStore = OperationStore<
	UnitDetailPage,
	UnitDetailPageVariables
>;
export type DeleteUnitStore = OperationStore<DeleteUnit, DeleteUnitVariables>;
