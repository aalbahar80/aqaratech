// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { UnitDetails } from './[id]/_index.gql';
export type UnitListPageVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Units_Order_By> | Types.Units_Order_By
	>;
	where?: Types.InputMaybe<Types.Units_Bool_Exp>;
}>;

export type UnitListPage = {
	__typename?: 'query_root';
	units: Array<{
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
	}>;
	agg: {
		__typename?: 'units_aggregate';
		aggregate?:
			| { __typename?: 'units_aggregate_fields'; count: number }
			| null
			| undefined;
	};
};

export const UnitListPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UnitListPage' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'limit' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'offset' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'units_order_by' },
							},
						},
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'units_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'units' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'order_by' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'limit' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'offset' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'where' },
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
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'agg' },
						name: { kind: 'Name', value: 'units_aggregate' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'where' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'aggregate' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'count' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
		...UnitDetails.definitions,
	],
} as unknown as DocumentNode<UnitListPage, UnitListPageVariables>;
export type UnitListPageStore = OperationStore<
	UnitListPage,
	UnitListPageVariables
>;
