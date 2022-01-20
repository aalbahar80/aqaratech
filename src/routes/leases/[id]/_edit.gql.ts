// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { LeaseById, LeaseDetails } from './_index.gql';
export type LeaseEditPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type LeaseEditPage = {
	__typename?: 'query_root';
	leases_by_pk?:
		| {
				__typename?: 'leases';
				id: number;
				deposit?: number | null | undefined;
				end_date?: string | null | undefined;
				is_expired?: boolean | null | undefined;
				is_signed?: boolean | null | undefined;
				license?: string | null | undefined;
				monthly_rent?: number | null | undefined;
				start_date?: string | null | undefined;
				tenant_id?: number | null | undefined;
				unit_id?: number | null | undefined;
				unit?:
					| {
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
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type UpdateLeaseVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Leases_Set_Input>;
}>;

export type UpdateLease = {
	__typename?: 'mutation_root';
	update_leases_by_pk?:
		| {
				__typename?: 'leases';
				id: number;
				deposit?: number | null | undefined;
				end_date?: string | null | undefined;
				is_expired?: boolean | null | undefined;
				is_signed?: boolean | null | undefined;
				license?: string | null | undefined;
				monthly_rent?: number | null | undefined;
				start_date?: string | null | undefined;
				tenant_id?: number | null | undefined;
				unit_id?: number | null | undefined;
		  }
		| null
		| undefined;
};

export const LeaseEditPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LeaseEditPage' },
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
						name: { kind: 'Name', value: 'leaseById' },
					},
				],
			},
		},
		...LeaseById.definitions,
	],
} as unknown as DocumentNode<LeaseEditPage, LeaseEditPageVariables>;
export const UpdateLeaseDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateLease' },
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
						name: { kind: 'Name', value: 'leases_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_leases_by_pk' },
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
									name: { kind: 'Name', value: 'leaseDetails' },
								},
							],
						},
					},
				],
			},
		},
		...LeaseDetails.definitions,
	],
} as unknown as DocumentNode<UpdateLease, UpdateLeaseVariables>;
export type LeaseEditPageStore = OperationStore<
	LeaseEditPage,
	LeaseEditPageVariables
>;
export type UpdateLeaseStore = OperationStore<
	UpdateLease,
	UpdateLeaseVariables
>;
