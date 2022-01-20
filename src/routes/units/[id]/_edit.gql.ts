// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { UnitById, UnitDetails } from './_index.gql';
export type UnitEditPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type UnitEditPage = {
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

export type UpdateUnitVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Units_Set_Input>;
}>;

export type UpdateUnit = {
	__typename?: 'mutation_root';
	update_units_by_pk?:
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
		  }
		| null
		| undefined;
};

export const UnitEditPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UnitEditPage' },
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
} as unknown as DocumentNode<UnitEditPage, UnitEditPageVariables>;
export const UpdateUnitDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateUnit' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: '_set' } },
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'units_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_units_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'pk_columns' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'id' },
											value: {
												kind: 'Variable',
												name: { kind: 'Name', value: 'id' },
											},
										},
									],
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: '_set' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: '_set' },
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
							],
						},
					},
				],
			},
		},
		...UnitDetails.definitions,
	],
} as unknown as DocumentNode<UpdateUnit, UpdateUnitVariables>;
export type UnitEditPageStore = OperationStore<
	UnitEditPage,
	UnitEditPageVariables
>;
export type UpdateUnitStore = OperationStore<UpdateUnit, UpdateUnitVariables>;
