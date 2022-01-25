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

export type TenantComboBoxVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Tenants_Order_By> | Types.Tenants_Order_By
	>;
	where?: Types.InputMaybe<Types.Tenants_Bool_Exp>;
}>;

export type TenantComboBox = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type TenantLeaseFilter = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type TenantLeaseFilterVariables = Types.Exact<{ [key: string]: never }>;

export type ClientComboBoxVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Clients_Order_By> | Types.Clients_Order_By
	>;
	where?: Types.InputMaybe<Types.Clients_Bool_Exp>;
}>;

export type ClientComboBox = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'clients';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type ClientLeaseFilter = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'clients';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
	}>;
};

export type ClientLeaseFilterVariables = Types.Exact<{ [key: string]: never }>;

export type PropertyComboBoxVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Properties_Order_By> | Types.Properties_Order_By
	>;
	where?: Types.InputMaybe<Types.Properties_Bool_Exp>;
}>;

export type PropertyComboBox = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'properties';
		id: number;
		area?: string | null | undefined;
		block?: string | null | undefined;
		street?: string | null | undefined;
		number?: string | null | undefined;
	}>;
};

export type PropertyLeaseFilter = {
	__typename?: 'query_root';
	results: Array<{
		__typename?: 'properties';
		id: number;
		area?: string | null | undefined;
		block?: string | null | undefined;
		street?: string | null | undefined;
		number?: string | null | undefined;
	}>;
};

export type PropertyLeaseFilterVariables = Types.Exact<{
	[key: string]: never;
}>;

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
						alias: { kind: 'Name', value: 'results' },
						name: { kind: 'Name', value: 'tenants' },
						arguments: [
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
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'order_by' },
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
export const ClientLeaseFilter = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'clientLeaseFilter' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'results' },
						name: { kind: 'Name', value: 'clients' },
						arguments: [
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
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'order_by' },
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
} as unknown as DocumentNode<ClientLeaseFilter, ClientLeaseFilterVariables>;
export const PropertyLeaseFilter = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'propertyLeaseFilter' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'results' },
						name: { kind: 'Name', value: 'properties' },
						arguments: [
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
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'order_by' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<PropertyLeaseFilter, PropertyLeaseFilterVariables>;
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
						name: { kind: 'Name', value: 'limit' },
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
						name: { kind: 'Name', value: 'where' },
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
export const ClientComboBoxDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientComboBox' },
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
						name: { kind: 'Name', value: 'order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'clients_order_by' },
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
						name: { kind: 'Name', value: 'where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'clients_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'clientLeaseFilter' },
					},
				],
			},
		},
		...ClientLeaseFilter.definitions,
	],
} as unknown as DocumentNode<ClientComboBox, ClientComboBoxVariables>;
export const PropertyComboBoxDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertyComboBox' },
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
						name: { kind: 'Name', value: 'order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'properties_order_by' },
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
						name: { kind: 'Name', value: 'where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'properties_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'propertyLeaseFilter' },
					},
				],
			},
		},
		...PropertyLeaseFilter.definitions,
	],
} as unknown as DocumentNode<PropertyComboBox, PropertyComboBoxVariables>;
export type AddLeaseStore = OperationStore<AddLease, AddLeaseVariables>;
export type TenantComboBoxStore = OperationStore<
	TenantComboBox,
	TenantComboBoxVariables
>;
export type ClientComboBoxStore = OperationStore<
	ClientComboBox,
	ClientComboBoxVariables
>;
export type PropertyComboBoxStore = OperationStore<
	PropertyComboBox,
	PropertyComboBoxVariables
>;
