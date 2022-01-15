// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { UnitDetails } from './[id]/_index.gql';
export type AddUnitVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.Units_Insert_Input>;
}>;

export type AddUnit = {
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
		  }
		| null
		| undefined;
};

export const AddUnitDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddUnit' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'unitDetails' },
								},
							],
						},
					},
				],
			},
		},
		...UnitDetails.definitions,
	],
} as unknown as DocumentNode<AddUnit, AddUnitVariables>;
export type AddUnitStore = OperationStore<AddUnit, AddUnitVariables>;
