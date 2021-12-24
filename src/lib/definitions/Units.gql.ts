/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UnitsInsertVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.units_insert_input>;
}>;

export type UnitsInsert = {
	__typename?: 'mutation_root';
	insert_units_one?:
		| {
				__typename?: 'units';
				id: number;
				is_vacant?: boolean | null | undefined;
				rent_market?: number | null | undefined;
				size?: number | null | undefined;
				type?: string | null | undefined;
				unit_number?: string | null | undefined;
				usage?: string | null | undefined;
				bed?: any | null | undefined;
				bath?: any | null | undefined;
				floor?: string | null | undefined;
				property_id?: number | null | undefined;
				client_id_s?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type UnitsUpdateVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.units_set_input>;
}>;

export type UnitsUpdate = {
	__typename?: 'mutation_root';
	update_units_by_pk?:
		| {
				__typename?: 'units';
				id: number;
				is_vacant?: boolean | null | undefined;
				rent_market?: number | null | undefined;
				size?: number | null | undefined;
				type?: string | null | undefined;
				unit_number?: string | null | undefined;
				usage?: string | null | undefined;
				bed?: any | null | undefined;
				bath?: any | null | undefined;
				floor?: string | null | undefined;
				property_id?: number | null | undefined;
				client_id_s?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type DeleteUnitsVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteUnits = {
	__typename?: 'mutation_root';
	delete_units_by_pk?: { __typename?: 'units'; id: number } | null | undefined;
};

export type UnitsByIdVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type UnitsById = {
	__typename?: 'query_root';
	units_by_pk?:
		| {
				__typename?: 'units';
				id: number;
				is_vacant?: boolean | null | undefined;
				rent_market?: number | null | undefined;
				size?: number | null | undefined;
				type?: string | null | undefined;
				unit_number?: string | null | undefined;
				usage?: string | null | undefined;
				bed?: any | null | undefined;
				bath?: any | null | undefined;
				floor?: string | null | undefined;
				property_id?: number | null | undefined;
				client_id_s?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type UnitsListVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.units_order_by> | Types.units_order_by
	>;
}>;

export type UnitsList = {
	__typename?: 'query_root';
	units: Array<{
		__typename?: 'units';
		id: number;
		is_vacant?: boolean | null | undefined;
		rent_market?: number | null | undefined;
		size?: number | null | undefined;
		type?: string | null | undefined;
		unit_number?: string | null | undefined;
		usage?: string | null | undefined;
		bed?: any | null | undefined;
		bath?: any | null | undefined;
		floor?: string | null | undefined;
		property_id?: number | null | undefined;
		client_id_s?: number | null | undefined;
	}>;
};

export const UnitsInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UnitsInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'units_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_units_one' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'is_vacant' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'rent_market' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'size' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'usage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bath' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'floor' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'property_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id_s' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UnitsInsert, UnitsInsertVariables>;
export const UnitsUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UnitsUpdate' },
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
						name: { kind: 'Name', value: 'units_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_units_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'is_vacant' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'rent_market' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'size' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'usage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bath' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'floor' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'property_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id_s' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UnitsUpdate, UnitsUpdateVariables>;
export const DeleteUnitsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteUnits' },
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
						name: { kind: 'Name', value: 'delete_units_by_pk' },
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
} as unknown as DocumentNode<DeleteUnits, DeleteUnitsVariables>;
export const UnitsByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UnitsById' },
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
						name: { kind: 'Name', value: 'units_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'is_vacant' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'rent_market' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'size' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'usage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bath' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'floor' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'property_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id_s' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UnitsById, UnitsByIdVariables>;
export const UnitsListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UnitsList' },
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
								name: { kind: 'Name', value: 'units_order_by' },
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
						name: { kind: 'Name', value: 'units' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'is_vacant' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'rent_market' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'size' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'type' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'unit_number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'usage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bed' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'bath' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'floor' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'property_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id_s' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UnitsList, UnitsListVariables>;
