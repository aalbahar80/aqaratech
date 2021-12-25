/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
