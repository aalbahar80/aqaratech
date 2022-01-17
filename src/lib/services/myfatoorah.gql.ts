// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PaymentRelatedInfoVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type PaymentRelatedInfo = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
				receipt_url?: string | null | undefined;
				memo?: string | null | undefined;
				lease_id?: number | null | undefined;
				is_paid?: boolean | null | undefined;
				created_at?: any | null | undefined;
				lease?:
					| {
							__typename?: 'leases';
							tenant?:
								| {
										__typename?: 'tenants';
										first_name?: string | null | undefined;
										second_name?: string | null | undefined;
										last_name?: string | null | undefined;
										third_name?: string | null | undefined;
										email?: string | null | undefined;
										phone?: string | null | undefined;
										user?:
											| {
													__typename?: 'users';
													email?: string | null | undefined;
													phone?: string | null | undefined;
											  }
											| null
											| undefined;
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

export type MarkPaidVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	is_paid?: Types.InputMaybe<Types.Scalars['Boolean']>;
	receipt_url?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type MarkPaid = {
	__typename?: 'mutation_root';
	update_transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				is_paid?: boolean | null | undefined;
				lease_id?: number | null | undefined;
				memo?: string | null | undefined;
				receipt_url?: string | null | undefined;
				amount?: number | null | undefined;
		  }
		| null
		| undefined;
};

export const PaymentRelatedInfoDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PaymentRelatedInfo' },
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
						name: { kind: 'Name', value: 'transactions_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'receipt_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'memo' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lease_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'lease' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'tenant' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'first_name' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'second_name' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'last_name' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'third_name' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'email' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'phone' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'user' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'email' },
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'phone' },
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
} as unknown as DocumentNode<PaymentRelatedInfo, PaymentRelatedInfoVariables>;
export const MarkPaidDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'MarkPaid' },
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
						name: { kind: 'Name', value: 'is_paid' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'receipt_url' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_transactions_by_pk' },
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
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'is_paid' },
											value: {
												kind: 'Variable',
												name: { kind: 'Name', value: 'is_paid' },
											},
										},
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'receipt_url' },
											value: {
												kind: 'Variable',
												name: { kind: 'Name', value: 'receipt_url' },
											},
										},
									],
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'lease_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'memo' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'receipt_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MarkPaid, MarkPaidVariables>;
export type PaymentRelatedInfoStore = OperationStore<
	PaymentRelatedInfo,
	PaymentRelatedInfoVariables
>;
export type MarkPaidStore = OperationStore<MarkPaid, MarkPaidVariables>;
