// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type LeaseDetailPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type LeaseDetailPage = {
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
		  }
		| null
		| undefined;
};

export type LeaseDetails = {
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
};

export type LeaseDetailsVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteLeaseVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteLease = {
	__typename?: 'mutation_root';
	delete_leases_by_pk?:
		| { __typename?: 'leases'; id: number }
		| null
		| undefined;
};

export const LeaseDetails = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'leaseDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'leases' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'monthly_rent' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
				],
			},
		},
	],
} as unknown as DocumentNode<LeaseDetails, LeaseDetailsVariables>;
export const LeaseDetailPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LeaseDetailPage' },
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
						name: { kind: 'Name', value: 'leases_by_pk' },
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
} as unknown as DocumentNode<LeaseDetailPage, LeaseDetailPageVariables>;
export const DeleteLeaseDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteLease' },
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
						name: { kind: 'Name', value: 'delete_leases_by_pk' },
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
} as unknown as DocumentNode<DeleteLease, DeleteLeaseVariables>;
export type LeaseDetailPageStore = OperationStore<
	LeaseDetailPage,
	LeaseDetailPageVariables
>;
export type DeleteLeaseStore = OperationStore<
	DeleteLease,
	DeleteLeaseVariables
>;
