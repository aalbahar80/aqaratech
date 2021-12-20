import type * as Types from '../../generated/graphql';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TenantsByIdLocalVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type TenantsByIdLocal = { __typename?: 'query_root', tenants_by_pk?: { __typename?: 'tenants', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined, dob?: any | null | undefined, civilid?: any | null | undefined, second_name?: string | null | undefined, third_name?: string | null | undefined } | null | undefined };


export const TenantsByIdLocalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TenantsByIdLocal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tenants_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"civilid"}},{"kind":"Field","name":{"kind":"Name","value":"second_name"}},{"kind":"Field","name":{"kind":"Name","value":"third_name"}}]}}]}}]} as unknown as DocumentNode<TenantsByIdLocal, TenantsByIdLocalVariables>;