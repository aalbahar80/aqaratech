// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { LeaseDetails } from './[id]/_index.gql';
export type AddLeaseVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.Leases_Insert_Input>;
}>;

export type AddLease = {
	__typename?: 'mutation_root';
	insert_leases_one?:
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

export type AddLeasePageVariables = Types.Exact<{
	tenant_limit?: Types.InputMaybe<Types.Scalars['Int']>;
	tenant_order_by?: Types.InputMaybe<
		Array<Types.Tenants_Order_By> | Types.Tenants_Order_By
	>;
	tenant_where?: Types.InputMaybe<Types.Tenants_Bool_Exp>;
}>;

export type AddLeasePage = {
	__typename?: 'query_root';
	tenants: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type TenantComboBoxVariables = Types.Exact<{
	tenant_limit?: Types.InputMaybe<Types.Scalars['Int']>;
	tenant_order_by?: Types.InputMaybe<
		Array<Types.Tenants_Order_By> | Types.Tenants_Order_By
	>;
	tenant_where?: Types.InputMaybe<Types.Tenants_Bool_Exp>;
}>;

export type TenantComboBox = {
	__typename?: 'query_root';
	tenants: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type TenantLeaseFilter = {
	__typename?: 'query_root';
	tenants: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type TenantLeaseFilterVariables = Types.Exact<{ [key: string]: never }>;

export const TenantLeaseFilter = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'tenantLeaseFilter' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'tenants' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'tenant_limit' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'tenant_order_by' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'tenant_where' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantLeaseFilter, TenantLeaseFilterVariables>;
export const AddLeaseDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddLease' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'leases_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_leases_one' },
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
} as unknown as DocumentNode<AddLease, AddLeaseVariables>;
export const AddLeasePageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'AddLeasePage' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_limit' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'tenants_order_by' },
							},
						},
					},
					defaultValue: {
						kind: 'ListValue',
						values: [
							{
								kind: 'ObjectValue',
								fields: [
									{
										kind: 'ObjectField',
										name: { kind: 'Name', value: 'created_at' },
										value: { kind: 'EnumValue', value: 'desc' },
									},
								],
							},
						],
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'tenants_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'tenantLeaseFilter' },
					},
				],
			},
		},
		...TenantLeaseFilter.definitions,
	],
} as unknown as DocumentNode<AddLeasePage, AddLeasePageVariables>;
export const TenantComboBoxDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantComboBox' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_limit' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'tenants_order_by' },
							},
						},
					},
					defaultValue: {
						kind: 'ListValue',
						values: [
							{
								kind: 'ObjectValue',
								fields: [
									{
										kind: 'ObjectField',
										name: { kind: 'Name', value: 'created_at' },
										value: { kind: 'EnumValue', value: 'desc' },
									},
								],
							},
						],
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'tenant_where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'tenants_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'tenantLeaseFilter' },
					},
				],
			},
		},
		...TenantLeaseFilter.definitions,
	],
} as unknown as DocumentNode<TenantComboBox, TenantComboBoxVariables>;
export type AddLeaseStore = OperationStore<AddLease, AddLeaseVariables>;
export type AddLeasePageStore = OperationStore<
	AddLeasePage,
	AddLeasePageVariables
>;
export type TenantComboBoxStore = OperationStore<
	TenantComboBox,
	TenantComboBoxVariables
>;
