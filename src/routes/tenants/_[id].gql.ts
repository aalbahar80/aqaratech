/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TenantsByIdLocalVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	with_crumbs: Types.Scalars['Boolean'];
	with_past_leases: Types.Scalars['Boolean'];
}>;

export type TenantsByIdLocal = {
	__typename?: 'query_root';
	tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				dob?: any | null | undefined;
				civilid?: any | null | undefined;
				second_name?: string | null | undefined;
				third_name?: string | null | undefined;
				leases?: Array<{
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
					start_date?: any | null | undefined;
					end_date?: any | null | undefined;
					is_expired?: boolean | null | undefined;
					is_signed?: boolean | null | undefined;
					monthly_rent?: number | null | undefined;
					unit_id?: number | null | undefined;
					deposit?: number | null | undefined;
				}>;
		  }
		| null
		| undefined;
};

export type TenantBreadcrumbsVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TenantBreadcrumbs = {
	__typename?: 'query_root';
	tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
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
		  }
		| null
		| undefined;
};

export type TenantPastLeasesVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TenantPastLeases = {
	__typename?: 'query_root';
	tenants_by_pk?:
		| {
				__typename?: 'tenants';
				id: number;
				pastLeases: Array<{
					__typename?: 'leases';
					id: number;
					start_date?: any | null | undefined;
					end_date?: any | null | undefined;
					is_expired?: boolean | null | undefined;
					is_signed?: boolean | null | undefined;
					monthly_rent?: number | null | undefined;
					unit_id?: number | null | undefined;
					deposit?: number | null | undefined;
				}>;
		  }
		| null
		| undefined;
};

export const TenantsByIdLocalDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantsByIdLocal' },
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
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'with_crumbs' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'Boolean' },
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'with_past_leases' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'Boolean' },
						},
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
									directives: [
										{
											kind: 'Directive',
											name: { kind: 'Name', value: 'include' },
											arguments: [
												{
													kind: 'Argument',
													name: { kind: 'Name', value: 'if' },
													value: {
														kind: 'Variable',
														name: { kind: 'Name', value: 'with_crumbs' },
													},
												},
											],
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
									directives: [
										{
											kind: 'Directive',
											name: { kind: 'Name', value: 'include' },
											arguments: [
												{
													kind: 'Argument',
													name: { kind: 'Name', value: 'if' },
													value: {
														kind: 'Variable',
														name: { kind: 'Name', value: 'with_past_leases' },
													},
												},
											],
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
				],
			},
		},
	],
} as unknown as DocumentNode<TenantsByIdLocal, TenantsByIdLocalVariables>;
export const TenantBreadcrumbsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantBreadcrumbs' },
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
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TenantBreadcrumbs, TenantBreadcrumbsVariables>;
export const TenantPastLeasesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantPastLeases' },
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
				],
			},
		},
	],
} as unknown as DocumentNode<TenantPastLeases, TenantPastLeasesVariables>;
