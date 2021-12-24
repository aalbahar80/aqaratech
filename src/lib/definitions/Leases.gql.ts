import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type LeasesInsertVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.leases_insert_input>;
}>;

export type LeasesInsert = {
	__typename?: 'mutation_root';
	insert_leases_one?:
		| {
				__typename?: 'leases';
				id: number;
				deposit?: number | null | undefined;
				end_date?: any | null | undefined;
				is_expired?: boolean | null | undefined;
				is_signed?: boolean | null | undefined;
				license?: string | null | undefined;
				monthly_rent?: number | null | undefined;
				start_date?: any | null | undefined;
				tenant_id?: number | null | undefined;
				unit_id?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type LeasesUpdateVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.leases_set_input>;
}>;

export type LeasesUpdate = {
	__typename?: 'mutation_root';
	update_leases_by_pk?:
		| {
				__typename?: 'leases';
				id: number;
				deposit?: number | null | undefined;
				end_date?: any | null | undefined;
				is_expired?: boolean | null | undefined;
				is_signed?: boolean | null | undefined;
				license?: string | null | undefined;
				monthly_rent?: number | null | undefined;
				start_date?: any | null | undefined;
				tenant_id?: number | null | undefined;
				unit_id?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type DeleteLeasesVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteLeases = {
	__typename?: 'mutation_root';
	delete_leases_by_pk?:
		| { __typename?: 'leases'; id: number }
		| null
		| undefined;
};

export type LeasesByIdVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type LeasesById = {
	__typename?: 'query_root';
	leases_by_pk?:
		| {
				__typename?: 'leases';
				id: number;
				deposit?: number | null | undefined;
				end_date?: any | null | undefined;
				is_expired?: boolean | null | undefined;
				is_signed?: boolean | null | undefined;
				license?: string | null | undefined;
				monthly_rent?: number | null | undefined;
				start_date?: any | null | undefined;
				tenant_id?: number | null | undefined;
				unit_id?: number | null | undefined;
				unit?:
					| {
							__typename?: 'units';
							id: number;
							client_id_s?: number | null | undefined;
							property_id?: number | null | undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type LeasesListVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.leases_order_by> | Types.leases_order_by
	>;
}>;

export type LeasesList = {
	__typename?: 'query_root';
	leases: Array<{
		__typename?: 'leases';
		id: number;
		deposit?: number | null | undefined;
		end_date?: any | null | undefined;
		is_expired?: boolean | null | undefined;
		is_signed?: boolean | null | undefined;
		license?: string | null | undefined;
		monthly_rent?: number | null | undefined;
		start_date?: any | null | undefined;
		tenant_id?: number | null | undefined;
		unit_id?: number | null | undefined;
	}>;
};

export const LeasesInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'LeasesInsert' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'monthly_rent' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LeasesInsert, LeasesInsertVariables>;
export const LeasesUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'LeasesUpdate' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'monthly_rent' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LeasesUpdate, LeasesUpdateVariables>;
export const DeleteLeasesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteLeases' },
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
} as unknown as DocumentNode<DeleteLeases, DeleteLeasesVariables>;
export const LeasesByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LeasesById' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'monthly_rent' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'unit' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'client_id_s' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'property_id' },
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
} as unknown as DocumentNode<LeasesById, LeasesByIdVariables>;
export const LeasesListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LeasesList' },
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
								name: { kind: 'Name', value: 'leases_order_by' },
							},
						},
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'leases' },
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
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'monthly_rent' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LeasesList, LeasesListVariables>;
