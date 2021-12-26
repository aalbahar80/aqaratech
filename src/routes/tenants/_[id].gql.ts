/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TenantsByIdLocalVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	with_crumbs: Types.Scalars['Boolean'];
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
					start_date?: any | null | undefined;
					end_date?: any | null | undefined;
					is_expired?: boolean | null | undefined;
				}>;
		  }
		| null
		| undefined;
	breadcrumbs?:
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

export type TenantBreadcrumbsLocalVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TenantBreadcrumbsLocal = {
	__typename?: 'query_root';
	breadcrumbs?:
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
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'breadcrumbs' },
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
} as unknown as DocumentNode<TenantsByIdLocal, TenantsByIdLocalVariables>;
export const TenantBreadcrumbsLocalDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantBreadcrumbsLocal' },
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
						alias: { kind: 'Name', value: 'breadcrumbs' },
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
} as unknown as DocumentNode<
	TenantBreadcrumbsLocal,
	TenantBreadcrumbsLocalVariables
>;
