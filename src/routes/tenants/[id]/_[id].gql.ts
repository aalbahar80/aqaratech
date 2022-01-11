// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TenantIdScreenVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TenantIdScreen = {
	__typename?: 'query_root';
	tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				dob?: string | null | undefined;
				civilid?: any | null | undefined;
				second_name?: string | null | undefined;
				third_name?: string | null | undefined;
				leases: Array<{
					__typename?: 'leases';
					id: number;
					unit?:
						| {
								__typename?: 'units';
								id: number;
								property?:
									| {
											__typename?: 'properties';
											id: number;
											client?:
												| { __typename?: 'clients'; id: number }
												| null
												| undefined;
									  }
									| null
									| undefined;
						  }
						| null
						| undefined;
				}>;
				pastLeases: Array<{
					__typename?: 'leases';
					id: number;
					start_date?: string | null | undefined;
					end_date?: string | null | undefined;
					is_expired?: boolean | null | undefined;
					is_signed?: boolean | null | undefined;
					monthly_rent?: number | null | undefined;
					unit_id?: number | null | undefined;
					deposit?: number | null | undefined;
				}>;
		  }
		| null
		| undefined;
	transactions: Array<{
		__typename?: 'transactions';
		id: number;
		amount?: number | null | undefined;
		created_at?: any | null | undefined;
		due_date?: string | null | undefined;
		is_paid?: boolean | null | undefined;
		receipt_url?: string | null | undefined;
		memo?: string | null | undefined;
		lease_id?: number | null | undefined;
	}>;
};

export type TenantsListVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Tenants_Order_By> | Types.Tenants_Order_By
	>;
	where?: Types.InputMaybe<Types.Tenants_Bool_Exp>;
}>;

export type TenantsList = {
	__typename?: 'query_root';
	tenants: Array<{
		__typename?: 'tenants';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
		email?: string | null | undefined;
		phone?: string | null | undefined;
		dob?: string | null | undefined;
		civilid?: any | null | undefined;
		second_name?: string | null | undefined;
		third_name?: string | null | undefined;
	}>;
	agg: {
		__typename?: 'tenants_aggregate';
		aggregate?:
			| { __typename?: 'tenants_aggregate_fields'; count: number }
			| null
			| undefined;
	};
};

export type DeleteTenantVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteTenant = {
	__typename?: 'mutation_root';
	delete_tenants_by_pk?:
		| { __typename?: 'tenants'; id: number }
		| null
		| undefined;
};

export type TenantsInsertVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.Tenants_Insert_Input>;
}>;

export type TenantsInsert = {
	__typename?: 'mutation_root';
	insert_tenants_one?:
		| {
				__typename?: 'tenants';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				dob?: string | null | undefined;
				civilid?: any | null | undefined;
				second_name?: string | null | undefined;
				third_name?: string | null | undefined;
		  }
		| null
		| undefined;
};

export type TenantsUpdateVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Tenants_Set_Input>;
}>;

export type TenantsUpdate = {
	__typename?: 'mutation_root';
	update_tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				dob?: string | null | undefined;
				civilid?: any | null | undefined;
				second_name?: string | null | undefined;
				third_name?: string | null | undefined;
		  }
		| null
		| undefined;
};

export type TenantEditScreenVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TenantEditScreen = {
	__typename?: 'query_root';
	tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				dob?: string | null | undefined;
				civilid?: any | null | undefined;
				second_name?: string | null | undefined;
				third_name?: string | null | undefined;
		  }
		| null
		| undefined;
};

export const TenantIdScreenDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantIdScreen' },
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
						name: { kind: 'Name', value: 'tenants_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dob' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'second_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'third_name' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'leases' },
									arguments: [
										{
											kind: 'Argument',
											name: { kind: 'Name', value: 'order_by' },
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: { kind: 'Name', value: 'end_date' },
														value: { kind: 'EnumValue', value: 'desc' },
													},
												],
											},
										},
										{
											kind: 'Argument',
											name: { kind: 'Name', value: 'limit' },
											value: { kind: 'IntValue', value: '1' },
										},
									],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'unit' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'id' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'property' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'id' },
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'client' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'Field',
																					name: { kind: 'Name', value: 'id' },
																				},
																			],
																		},
																	},
																],
															},
														},
													],
												},
											},
										],
									},
								},
								{
									kind: 'Field',
									alias: { kind: 'Name', value: 'pastLeases' },
									name: { kind: 'Name', value: 'leases' },
									arguments: [
										{
											kind: 'Argument',
											name: { kind: 'Name', value: 'order_by' },
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: { kind: 'Name', value: 'end_date' },
														value: { kind: 'EnumValue', value: 'desc' },
													},
												],
											},
										},
									],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'start_date' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'end_date' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'is_expired' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'is_signed' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'monthly_rent' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'unit_id' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'deposit' },
											},
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'transactions' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'lease' },
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: { kind: 'Name', value: 'tenant_id' },
														value: {
															kind: 'ObjectValue',
															fields: [
																{
																	kind: 'ObjectField',
																	name: { kind: 'Name', value: '_eq' },
																	value: {
																		kind: 'Variable',
																		name: { kind: 'Name', value: 'id' },
																	},
																},
															],
														},
													},
												],
											},
										},
									],
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'created_at' },
											value: { kind: 'EnumValue', value: 'desc' },
										},
									],
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: { kind: 'IntValue', value: '5' },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'due_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'receipt_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'memo' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lease_id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantIdScreen, TenantIdScreenVariables>;
export const TenantsListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantsList' },
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
								name: { kind: 'Name', value: 'tenants_order_by' },
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
						name: { kind: 'Name', value: 'tenants_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'tenants' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dob' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'second_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'third_name' } },
							],
						},
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'agg' },
						name: { kind: 'Name', value: 'tenants_aggregate' },
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
	],
} as unknown as DocumentNode<TenantsList, TenantsListVariables>;
export const DeleteTenantDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteTenant' },
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
						name: { kind: 'Name', value: 'delete_tenants_by_pk' },
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
} as unknown as DocumentNode<DeleteTenant, DeleteTenantVariables>;
export const TenantsInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'TenantsInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'tenants_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_tenants_one' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dob' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'second_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'third_name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantsInsert, TenantsInsertVariables>;
export const TenantsUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'TenantsUpdate' },
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
						name: { kind: 'Name', value: 'tenants_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_tenants_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dob' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'second_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'third_name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantsUpdate, TenantsUpdateVariables>;
export const TenantEditScreenDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantEditScreen' },
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
						name: { kind: 'Name', value: 'tenants_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dob' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'second_name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'third_name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantEditScreen, TenantEditScreenVariables>;
export type TenantIdScreenStore = OperationStore<
	TenantIdScreen,
	TenantIdScreenVariables
>;
export type TenantsListStore = OperationStore<
	TenantsList,
	TenantsListVariables
>;
export type DeleteTenantStore = OperationStore<
	DeleteTenant,
	DeleteTenantVariables
>;
export type TenantsInsertStore = OperationStore<
	TenantsInsert,
	TenantsInsertVariables
>;
export type TenantsUpdateStore = OperationStore<
	TenantsUpdate,
	TenantsUpdateVariables
>;
export type TenantEditScreenStore = OperationStore<
	TenantEditScreen,
	TenantEditScreenVariables
>;
