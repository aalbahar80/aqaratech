import type { OperationStore } from '@urql/svelte';
import type { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver, StorageAdapter as GraphCacheStorageAdapter } from '@urql/exchange-graphcache';
import type { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  date: any;
  numeric: any;
  point: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "clients" */
export type Clients = {
  __typename?: 'clients';
  civilid?: Maybe<Scalars['bigint']>;
  email?: Maybe<Scalars['String']>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_active?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  phone?: Maybe<Scalars['String']>;
  /** An array relationship */
  properties: Array<Properties>;
  /** An aggregate relationship */
  properties_aggregate: Properties_Aggregate;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
};


/** columns and relationships of "clients" */
export type ClientsExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsPropertiesArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsProperties_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "clients" */
export type ClientsUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "clients" */
export type Clients_Aggregate = {
  __typename?: 'clients_aggregate';
  aggregate?: Maybe<Clients_Aggregate_Fields>;
  nodes: Array<Clients>;
};

/** aggregate fields of "clients" */
export type Clients_Aggregate_Fields = {
  __typename?: 'clients_aggregate_fields';
  avg?: Maybe<Clients_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Clients_Max_Fields>;
  min?: Maybe<Clients_Min_Fields>;
  stddev?: Maybe<Clients_Stddev_Fields>;
  stddev_pop?: Maybe<Clients_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Clients_Stddev_Samp_Fields>;
  sum?: Maybe<Clients_Sum_Fields>;
  var_pop?: Maybe<Clients_Var_Pop_Fields>;
  var_samp?: Maybe<Clients_Var_Samp_Fields>;
  variance?: Maybe<Clients_Variance_Fields>;
};


/** aggregate fields of "clients" */
export type Clients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Clients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Clients_Avg_Fields = {
  __typename?: 'clients_avg_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "clients". All fields are combined with a logical 'AND'. */
export type Clients_Bool_Exp = {
  _and?: InputMaybe<Array<Clients_Bool_Exp>>;
  _not?: InputMaybe<Clients_Bool_Exp>;
  _or?: InputMaybe<Array<Clients_Bool_Exp>>;
  civilid?: InputMaybe<Bigint_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  expenses?: InputMaybe<Expenses_Bool_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  properties?: InputMaybe<Properties_Bool_Exp>;
  second_name?: InputMaybe<String_Comparison_Exp>;
  third_name?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "clients" */
export enum Clients_Constraint {
  /** unique or primary key constraint */
  ClientsPkey = 'clients_pkey'
}

/** input type for incrementing numeric columns in table "clients" */
export type Clients_Inc_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "clients" */
export type Clients_Insert_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  email?: InputMaybe<Scalars['String']>;
  expenses?: InputMaybe<Expenses_Arr_Rel_Insert_Input>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  last_name?: InputMaybe<Scalars['String']>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Arr_Rel_Insert_Input>;
  phone?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Properties_Arr_Rel_Insert_Input>;
  second_name?: InputMaybe<Scalars['String']>;
  third_name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Clients_Max_Fields = {
  __typename?: 'clients_max_fields';
  civilid?: Maybe<Scalars['bigint']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Clients_Min_Fields = {
  __typename?: 'clients_min_fields';
  civilid?: Maybe<Scalars['bigint']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "clients" */
export type Clients_Mutation_Response = {
  __typename?: 'clients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Clients>;
};

/** input type for inserting object relation for remote table "clients" */
export type Clients_Obj_Rel_Insert_Input = {
  data: Clients_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Clients_On_Conflict>;
};

/** on conflict condition type for table "clients" */
export type Clients_On_Conflict = {
  constraint: Clients_Constraint;
  update_columns?: Array<Clients_Update_Column>;
  where?: InputMaybe<Clients_Bool_Exp>;
};

/** Ordering options when selecting data from "clients". */
export type Clients_Order_By = {
  civilid?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  expenses_aggregate?: InputMaybe<Expenses_Aggregate_Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  maintenance_orders_aggregate?: InputMaybe<Maintenance_Orders_Aggregate_Order_By>;
  phone?: InputMaybe<Order_By>;
  properties_aggregate?: InputMaybe<Properties_Aggregate_Order_By>;
  second_name?: InputMaybe<Order_By>;
  third_name?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: clients */
export type Clients_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "clients" */
export enum Clients_Select_Column {
  /** column name */
  Civilid = 'civilid',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  SecondName = 'second_name',
  /** column name */
  ThirdName = 'third_name'
}

/** input type for updating data in table "clients" */
export type Clients_Set_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  second_name?: InputMaybe<Scalars['String']>;
  third_name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Clients_Stddev_Fields = {
  __typename?: 'clients_stddev_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Clients_Stddev_Pop_Fields = {
  __typename?: 'clients_stddev_pop_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Clients_Stddev_Samp_Fields = {
  __typename?: 'clients_stddev_samp_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Clients_Sum_Fields = {
  __typename?: 'clients_sum_fields';
  civilid?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "clients" */
export enum Clients_Update_Column {
  /** column name */
  Civilid = 'civilid',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  SecondName = 'second_name',
  /** column name */
  ThirdName = 'third_name'
}

/** aggregate var_pop on columns */
export type Clients_Var_Pop_Fields = {
  __typename?: 'clients_var_pop_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Clients_Var_Samp_Fields = {
  __typename?: 'clients_var_samp_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Clients_Variance_Fields = {
  __typename?: 'clients_variance_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']>;
  _gt?: InputMaybe<Scalars['date']>;
  _gte?: InputMaybe<Scalars['date']>;
  _in?: InputMaybe<Array<Scalars['date']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['date']>;
  _lte?: InputMaybe<Scalars['date']>;
  _neq?: InputMaybe<Scalars['date']>;
  _nin?: InputMaybe<Array<Scalars['date']>>;
};

/** columns and relationships of "expenses" */
export type Expenses = {
  __typename?: 'expenses';
  amount?: Maybe<Scalars['Int']>;
  category?: Maybe<Expenses_Types_Enum>;
  /** An object relationship */
  client?: Maybe<Clients>;
  client_id?: Maybe<Scalars['Int']>;
  date_post?: Maybe<Scalars['date']>;
  /** An object relationship */
  expenses_type?: Maybe<Expenses_Types>;
  id: Scalars['Int'];
  /** An object relationship */
  maintenance_order?: Maybe<Maintenance_Orders>;
  maintenance_order_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  /** An object relationship */
  property?: Maybe<Properties>;
  property_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  unit?: Maybe<Units>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "expenses" */
export type Expenses_Aggregate = {
  __typename?: 'expenses_aggregate';
  aggregate?: Maybe<Expenses_Aggregate_Fields>;
  nodes: Array<Expenses>;
};

/** aggregate fields of "expenses" */
export type Expenses_Aggregate_Fields = {
  __typename?: 'expenses_aggregate_fields';
  avg?: Maybe<Expenses_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Expenses_Max_Fields>;
  min?: Maybe<Expenses_Min_Fields>;
  stddev?: Maybe<Expenses_Stddev_Fields>;
  stddev_pop?: Maybe<Expenses_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Expenses_Stddev_Samp_Fields>;
  sum?: Maybe<Expenses_Sum_Fields>;
  var_pop?: Maybe<Expenses_Var_Pop_Fields>;
  var_samp?: Maybe<Expenses_Var_Samp_Fields>;
  variance?: Maybe<Expenses_Variance_Fields>;
};


/** aggregate fields of "expenses" */
export type Expenses_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Expenses_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "expenses" */
export type Expenses_Aggregate_Order_By = {
  avg?: InputMaybe<Expenses_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Expenses_Max_Order_By>;
  min?: InputMaybe<Expenses_Min_Order_By>;
  stddev?: InputMaybe<Expenses_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Expenses_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Expenses_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Expenses_Sum_Order_By>;
  var_pop?: InputMaybe<Expenses_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Expenses_Var_Samp_Order_By>;
  variance?: InputMaybe<Expenses_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "expenses" */
export type Expenses_Arr_Rel_Insert_Input = {
  data: Array<Expenses_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Expenses_On_Conflict>;
};

/** aggregate avg on columns */
export type Expenses_Avg_Fields = {
  __typename?: 'expenses_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "expenses" */
export type Expenses_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "expenses". All fields are combined with a logical 'AND'. */
export type Expenses_Bool_Exp = {
  _and?: InputMaybe<Array<Expenses_Bool_Exp>>;
  _not?: InputMaybe<Expenses_Bool_Exp>;
  _or?: InputMaybe<Array<Expenses_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  category?: InputMaybe<Expenses_Types_Enum_Comparison_Exp>;
  client?: InputMaybe<Clients_Bool_Exp>;
  client_id?: InputMaybe<Int_Comparison_Exp>;
  date_post?: InputMaybe<Date_Comparison_Exp>;
  expenses_type?: InputMaybe<Expenses_Types_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  maintenance_order?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  maintenance_order_id?: InputMaybe<Int_Comparison_Exp>;
  memo?: InputMaybe<String_Comparison_Exp>;
  property?: InputMaybe<Properties_Bool_Exp>;
  property_id?: InputMaybe<Int_Comparison_Exp>;
  unit?: InputMaybe<Units_Bool_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "expenses" */
export enum Expenses_Constraint {
  /** unique or primary key constraint */
  ExpensesPkey = 'expenses_pkey'
}

/** input type for incrementing numeric columns in table "expenses" */
export type Expenses_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  client_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  maintenance_order_id?: InputMaybe<Scalars['Int']>;
  property_id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "expenses" */
export type Expenses_Insert_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Expenses_Types_Enum>;
  client?: InputMaybe<Clients_Obj_Rel_Insert_Input>;
  client_id?: InputMaybe<Scalars['Int']>;
  date_post?: InputMaybe<Scalars['date']>;
  expenses_type?: InputMaybe<Expenses_Types_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  maintenance_order?: InputMaybe<Maintenance_Orders_Obj_Rel_Insert_Input>;
  maintenance_order_id?: InputMaybe<Scalars['Int']>;
  memo?: InputMaybe<Scalars['String']>;
  property?: InputMaybe<Properties_Obj_Rel_Insert_Input>;
  property_id?: InputMaybe<Scalars['Int']>;
  unit?: InputMaybe<Units_Obj_Rel_Insert_Input>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Expenses_Max_Fields = {
  __typename?: 'expenses_max_fields';
  amount?: Maybe<Scalars['Int']>;
  client_id?: Maybe<Scalars['Int']>;
  date_post?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  maintenance_order_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  property_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "expenses" */
export type Expenses_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  date_post?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Expenses_Min_Fields = {
  __typename?: 'expenses_min_fields';
  amount?: Maybe<Scalars['Int']>;
  client_id?: Maybe<Scalars['Int']>;
  date_post?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  maintenance_order_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  property_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "expenses" */
export type Expenses_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  date_post?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "expenses" */
export type Expenses_Mutation_Response = {
  __typename?: 'expenses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Expenses>;
};

/** on conflict condition type for table "expenses" */
export type Expenses_On_Conflict = {
  constraint: Expenses_Constraint;
  update_columns?: Array<Expenses_Update_Column>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};

/** Ordering options when selecting data from "expenses". */
export type Expenses_Order_By = {
  amount?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  client?: InputMaybe<Clients_Order_By>;
  client_id?: InputMaybe<Order_By>;
  date_post?: InputMaybe<Order_By>;
  expenses_type?: InputMaybe<Expenses_Types_Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order?: InputMaybe<Maintenance_Orders_Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  property?: InputMaybe<Properties_Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Units_Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: expenses */
export type Expenses_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "expenses" */
export enum Expenses_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Category = 'category',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  DatePost = 'date_post',
  /** column name */
  Id = 'id',
  /** column name */
  MaintenanceOrderId = 'maintenance_order_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "expenses" */
export type Expenses_Set_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Expenses_Types_Enum>;
  client_id?: InputMaybe<Scalars['Int']>;
  date_post?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['Int']>;
  maintenance_order_id?: InputMaybe<Scalars['Int']>;
  memo?: InputMaybe<Scalars['String']>;
  property_id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Expenses_Stddev_Fields = {
  __typename?: 'expenses_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "expenses" */
export type Expenses_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Expenses_Stddev_Pop_Fields = {
  __typename?: 'expenses_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "expenses" */
export type Expenses_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Expenses_Stddev_Samp_Fields = {
  __typename?: 'expenses_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "expenses" */
export type Expenses_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Expenses_Sum_Fields = {
  __typename?: 'expenses_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  maintenance_order_id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "expenses" */
export type Expenses_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "expenses_types" */
export type Expenses_Types = {
  __typename?: 'expenses_types';
  description?: Maybe<Scalars['String']>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "expenses_types" */
export type Expenses_TypesExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "expenses_types" */
export type Expenses_TypesExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};

/** aggregated selection of "expenses_types" */
export type Expenses_Types_Aggregate = {
  __typename?: 'expenses_types_aggregate';
  aggregate?: Maybe<Expenses_Types_Aggregate_Fields>;
  nodes: Array<Expenses_Types>;
};

/** aggregate fields of "expenses_types" */
export type Expenses_Types_Aggregate_Fields = {
  __typename?: 'expenses_types_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Expenses_Types_Max_Fields>;
  min?: Maybe<Expenses_Types_Min_Fields>;
};


/** aggregate fields of "expenses_types" */
export type Expenses_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Expenses_Types_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "expenses_types". All fields are combined with a logical 'AND'. */
export type Expenses_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Expenses_Types_Bool_Exp>>;
  _not?: InputMaybe<Expenses_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Expenses_Types_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  expenses?: InputMaybe<Expenses_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "expenses_types" */
export enum Expenses_Types_Constraint {
  /** unique or primary key constraint */
  ExpensesTypesPkey = 'expenses_types_pkey'
}

export enum Expenses_Types_Enum {
  Amenities = 'AMENITIES',
  Caretaker = 'CARETAKER',
  Electricity = 'ELECTRICITY',
  Elevators = 'ELEVATORS',
  Hvac = 'HVAC',
  Insurance = 'INSURANCE',
  Internet = 'INTERNET',
  Landcaping = 'LANDCAPING',
  ManagementFees = 'MANAGEMENT_FEES',
  Plumbing = 'PLUMBING',
  Satellite = 'SATELLITE',
  Water = 'WATER'
}

/** Boolean expression to compare columns of type "expenses_types_enum". All fields are combined with logical 'AND'. */
export type Expenses_Types_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Expenses_Types_Enum>;
  _in?: InputMaybe<Array<Expenses_Types_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Expenses_Types_Enum>;
  _nin?: InputMaybe<Array<Expenses_Types_Enum>>;
};

/** input type for inserting data into table "expenses_types" */
export type Expenses_Types_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  expenses?: InputMaybe<Expenses_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Expenses_Types_Max_Fields = {
  __typename?: 'expenses_types_max_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Expenses_Types_Min_Fields = {
  __typename?: 'expenses_types_min_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "expenses_types" */
export type Expenses_Types_Mutation_Response = {
  __typename?: 'expenses_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Expenses_Types>;
};

/** input type for inserting object relation for remote table "expenses_types" */
export type Expenses_Types_Obj_Rel_Insert_Input = {
  data: Expenses_Types_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Expenses_Types_On_Conflict>;
};

/** on conflict condition type for table "expenses_types" */
export type Expenses_Types_On_Conflict = {
  constraint: Expenses_Types_Constraint;
  update_columns?: Array<Expenses_Types_Update_Column>;
  where?: InputMaybe<Expenses_Types_Bool_Exp>;
};

/** Ordering options when selecting data from "expenses_types". */
export type Expenses_Types_Order_By = {
  description?: InputMaybe<Order_By>;
  expenses_aggregate?: InputMaybe<Expenses_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: expenses_types */
export type Expenses_Types_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "expenses_types" */
export enum Expenses_Types_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "expenses_types" */
export type Expenses_Types_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "expenses_types" */
export enum Expenses_Types_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** update columns of table "expenses" */
export enum Expenses_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Category = 'category',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  DatePost = 'date_post',
  /** column name */
  Id = 'id',
  /** column name */
  MaintenanceOrderId = 'maintenance_order_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  UnitId = 'unit_id'
}

/** aggregate var_pop on columns */
export type Expenses_Var_Pop_Fields = {
  __typename?: 'expenses_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "expenses" */
export type Expenses_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Expenses_Var_Samp_Fields = {
  __typename?: 'expenses_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "expenses" */
export type Expenses_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Expenses_Variance_Fields = {
  __typename?: 'expenses_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  maintenance_order_id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "expenses" */
export type Expenses_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_order_id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "leases" */
export type Leases = {
  __typename?: 'leases';
  deposit?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  /** A computed field, executes function "is_expired" */
  is_expired?: Maybe<Scalars['Boolean']>;
  is_signed?: Maybe<Scalars['Boolean']>;
  license?: Maybe<Scalars['String']>;
  monthly_rent?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  /** An object relationship */
  tenant?: Maybe<Tenants>;
  tenant_id?: Maybe<Scalars['Int']>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** An object relationship */
  unit?: Maybe<Units>;
  unit_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "leases" */
export type LeasesTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "leases" */
export type LeasesTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "leases" */
export type Leases_Aggregate = {
  __typename?: 'leases_aggregate';
  aggregate?: Maybe<Leases_Aggregate_Fields>;
  nodes: Array<Leases>;
};

/** aggregate fields of "leases" */
export type Leases_Aggregate_Fields = {
  __typename?: 'leases_aggregate_fields';
  avg?: Maybe<Leases_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Leases_Max_Fields>;
  min?: Maybe<Leases_Min_Fields>;
  stddev?: Maybe<Leases_Stddev_Fields>;
  stddev_pop?: Maybe<Leases_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leases_Stddev_Samp_Fields>;
  sum?: Maybe<Leases_Sum_Fields>;
  var_pop?: Maybe<Leases_Var_Pop_Fields>;
  var_samp?: Maybe<Leases_Var_Samp_Fields>;
  variance?: Maybe<Leases_Variance_Fields>;
};


/** aggregate fields of "leases" */
export type Leases_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leases_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "leases" */
export type Leases_Aggregate_Order_By = {
  avg?: InputMaybe<Leases_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Leases_Max_Order_By>;
  min?: InputMaybe<Leases_Min_Order_By>;
  stddev?: InputMaybe<Leases_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Leases_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Leases_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Leases_Sum_Order_By>;
  var_pop?: InputMaybe<Leases_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Leases_Var_Samp_Order_By>;
  variance?: InputMaybe<Leases_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "leases" */
export type Leases_Arr_Rel_Insert_Input = {
  data: Array<Leases_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Leases_On_Conflict>;
};

/** aggregate avg on columns */
export type Leases_Avg_Fields = {
  __typename?: 'leases_avg_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "leases" */
export type Leases_Avg_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "leases". All fields are combined with a logical 'AND'. */
export type Leases_Bool_Exp = {
  _and?: InputMaybe<Array<Leases_Bool_Exp>>;
  _not?: InputMaybe<Leases_Bool_Exp>;
  _or?: InputMaybe<Array<Leases_Bool_Exp>>;
  deposit?: InputMaybe<Int_Comparison_Exp>;
  end_date?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_expired?: InputMaybe<Boolean_Comparison_Exp>;
  is_signed?: InputMaybe<Boolean_Comparison_Exp>;
  license?: InputMaybe<String_Comparison_Exp>;
  monthly_rent?: InputMaybe<Int_Comparison_Exp>;
  start_date?: InputMaybe<Date_Comparison_Exp>;
  tenant?: InputMaybe<Tenants_Bool_Exp>;
  tenant_id?: InputMaybe<Int_Comparison_Exp>;
  transactions?: InputMaybe<Transactions_Bool_Exp>;
  unit?: InputMaybe<Units_Bool_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "leases" */
export enum Leases_Constraint {
  /** unique or primary key constraint */
  LeasesPkey = 'leases_pkey'
}

/** input type for incrementing numeric columns in table "leases" */
export type Leases_Inc_Input = {
  deposit?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  monthly_rent?: InputMaybe<Scalars['Int']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "leases" */
export type Leases_Insert_Input = {
  deposit?: InputMaybe<Scalars['Int']>;
  end_date?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['Int']>;
  is_signed?: InputMaybe<Scalars['Boolean']>;
  license?: InputMaybe<Scalars['String']>;
  monthly_rent?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['date']>;
  tenant?: InputMaybe<Tenants_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  transactions?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  unit?: InputMaybe<Units_Obj_Rel_Insert_Input>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Leases_Max_Fields = {
  __typename?: 'leases_max_fields';
  deposit?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  license?: Maybe<Scalars['String']>;
  monthly_rent?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  tenant_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "leases" */
export type Leases_Max_Order_By = {
  deposit?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Leases_Min_Fields = {
  __typename?: 'leases_min_fields';
  deposit?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  license?: Maybe<Scalars['String']>;
  monthly_rent?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  tenant_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "leases" */
export type Leases_Min_Order_By = {
  deposit?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "leases" */
export type Leases_Mutation_Response = {
  __typename?: 'leases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Leases>;
};

/** input type for inserting object relation for remote table "leases" */
export type Leases_Obj_Rel_Insert_Input = {
  data: Leases_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Leases_On_Conflict>;
};

/** on conflict condition type for table "leases" */
export type Leases_On_Conflict = {
  constraint: Leases_Constraint;
  update_columns?: Array<Leases_Update_Column>;
  where?: InputMaybe<Leases_Bool_Exp>;
};

/** Ordering options when selecting data from "leases". */
export type Leases_Order_By = {
  deposit?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_expired?: InputMaybe<Order_By>;
  is_signed?: InputMaybe<Order_By>;
  license?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenants_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  unit?: InputMaybe<Units_Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: leases */
export type Leases_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "leases" */
export enum Leases_Select_Column {
  /** column name */
  Deposit = 'deposit',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsSigned = 'is_signed',
  /** column name */
  License = 'license',
  /** column name */
  MonthlyRent = 'monthly_rent',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  TenantId = 'tenant_id',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "leases" */
export type Leases_Set_Input = {
  deposit?: InputMaybe<Scalars['Int']>;
  end_date?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['Int']>;
  is_signed?: InputMaybe<Scalars['Boolean']>;
  license?: InputMaybe<Scalars['String']>;
  monthly_rent?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['date']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Leases_Stddev_Fields = {
  __typename?: 'leases_stddev_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "leases" */
export type Leases_Stddev_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Leases_Stddev_Pop_Fields = {
  __typename?: 'leases_stddev_pop_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "leases" */
export type Leases_Stddev_Pop_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Leases_Stddev_Samp_Fields = {
  __typename?: 'leases_stddev_samp_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "leases" */
export type Leases_Stddev_Samp_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Leases_Sum_Fields = {
  __typename?: 'leases_sum_fields';
  deposit?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  monthly_rent?: Maybe<Scalars['Int']>;
  tenant_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "leases" */
export type Leases_Sum_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** update columns of table "leases" */
export enum Leases_Update_Column {
  /** column name */
  Deposit = 'deposit',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsSigned = 'is_signed',
  /** column name */
  License = 'license',
  /** column name */
  MonthlyRent = 'monthly_rent',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  TenantId = 'tenant_id',
  /** column name */
  UnitId = 'unit_id'
}

/** aggregate var_pop on columns */
export type Leases_Var_Pop_Fields = {
  __typename?: 'leases_var_pop_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "leases" */
export type Leases_Var_Pop_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Leases_Var_Samp_Fields = {
  __typename?: 'leases_var_samp_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "leases" */
export type Leases_Var_Samp_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Leases_Variance_Fields = {
  __typename?: 'leases_variance_fields';
  deposit?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  monthly_rent?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "leases" */
export type Leases_Variance_Order_By = {
  deposit?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  monthly_rent?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "listings" */
export type Listings = {
  __typename?: 'listings';
  available_on?: Maybe<Scalars['date']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_active?: Maybe<Scalars['Boolean']>;
  lease_length?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  /** An object relationship */
  unit?: Maybe<Units>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "listings" */
export type Listings_Aggregate = {
  __typename?: 'listings_aggregate';
  aggregate?: Maybe<Listings_Aggregate_Fields>;
  nodes: Array<Listings>;
};

/** aggregate fields of "listings" */
export type Listings_Aggregate_Fields = {
  __typename?: 'listings_aggregate_fields';
  avg?: Maybe<Listings_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Listings_Max_Fields>;
  min?: Maybe<Listings_Min_Fields>;
  stddev?: Maybe<Listings_Stddev_Fields>;
  stddev_pop?: Maybe<Listings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Listings_Stddev_Samp_Fields>;
  sum?: Maybe<Listings_Sum_Fields>;
  var_pop?: Maybe<Listings_Var_Pop_Fields>;
  var_samp?: Maybe<Listings_Var_Samp_Fields>;
  variance?: Maybe<Listings_Variance_Fields>;
};


/** aggregate fields of "listings" */
export type Listings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Listings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "listings" */
export type Listings_Aggregate_Order_By = {
  avg?: InputMaybe<Listings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Listings_Max_Order_By>;
  min?: InputMaybe<Listings_Min_Order_By>;
  stddev?: InputMaybe<Listings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Listings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Listings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Listings_Sum_Order_By>;
  var_pop?: InputMaybe<Listings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Listings_Var_Samp_Order_By>;
  variance?: InputMaybe<Listings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "listings" */
export type Listings_Arr_Rel_Insert_Input = {
  data: Array<Listings_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Listings_On_Conflict>;
};

/** aggregate avg on columns */
export type Listings_Avg_Fields = {
  __typename?: 'listings_avg_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "listings" */
export type Listings_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "listings". All fields are combined with a logical 'AND'. */
export type Listings_Bool_Exp = {
  _and?: InputMaybe<Array<Listings_Bool_Exp>>;
  _not?: InputMaybe<Listings_Bool_Exp>;
  _or?: InputMaybe<Array<Listings_Bool_Exp>>;
  available_on?: InputMaybe<Date_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  lease_length?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  unit?: InputMaybe<Units_Bool_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "listings" */
export enum Listings_Constraint {
  /** unique or primary key constraint */
  ListingsPkey = 'listings_pkey'
}

/** input type for incrementing numeric columns in table "listings" */
export type Listings_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "listings" */
export type Listings_Insert_Input = {
  available_on?: InputMaybe<Scalars['date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  lease_length?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Units_Obj_Rel_Insert_Input>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Listings_Max_Fields = {
  __typename?: 'listings_max_fields';
  available_on?: Maybe<Scalars['date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lease_length?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "listings" */
export type Listings_Max_Order_By = {
  available_on?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_length?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Listings_Min_Fields = {
  __typename?: 'listings_min_fields';
  available_on?: Maybe<Scalars['date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lease_length?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "listings" */
export type Listings_Min_Order_By = {
  available_on?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_length?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "listings" */
export type Listings_Mutation_Response = {
  __typename?: 'listings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Listings>;
};

/** on conflict condition type for table "listings" */
export type Listings_On_Conflict = {
  constraint: Listings_Constraint;
  update_columns?: Array<Listings_Update_Column>;
  where?: InputMaybe<Listings_Bool_Exp>;
};

/** Ordering options when selecting data from "listings". */
export type Listings_Order_By = {
  available_on?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  lease_length?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit?: InputMaybe<Units_Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: listings */
export type Listings_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "listings" */
export enum Listings_Select_Column {
  /** column name */
  AvailableOn = 'available_on',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LeaseLength = 'lease_length',
  /** column name */
  Title = 'title',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "listings" */
export type Listings_Set_Input = {
  available_on?: InputMaybe<Scalars['date']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  lease_length?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Listings_Stddev_Fields = {
  __typename?: 'listings_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "listings" */
export type Listings_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Listings_Stddev_Pop_Fields = {
  __typename?: 'listings_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "listings" */
export type Listings_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Listings_Stddev_Samp_Fields = {
  __typename?: 'listings_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "listings" */
export type Listings_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Listings_Sum_Fields = {
  __typename?: 'listings_sum_fields';
  id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "listings" */
export type Listings_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** update columns of table "listings" */
export enum Listings_Update_Column {
  /** column name */
  AvailableOn = 'available_on',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  LeaseLength = 'lease_length',
  /** column name */
  Title = 'title',
  /** column name */
  UnitId = 'unit_id'
}

/** aggregate var_pop on columns */
export type Listings_Var_Pop_Fields = {
  __typename?: 'listings_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "listings" */
export type Listings_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Listings_Var_Samp_Fields = {
  __typename?: 'listings_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "listings" */
export type Listings_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Listings_Variance_Fields = {
  __typename?: 'listings_variance_fields';
  id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "listings" */
export type Listings_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "maintenance_orders" */
export type Maintenance_Orders = {
  __typename?: 'maintenance_orders';
  /** An object relationship */
  client?: Maybe<Clients>;
  client_id?: Maybe<Scalars['Int']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  id: Scalars['Int'];
  /** An object relationship */
  property?: Maybe<Properties>;
  property_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  /** An object relationship */
  tenant?: Maybe<Tenants>;
  tenant_id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  /** An object relationship */
  unit?: Maybe<Units>;
  unit_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "maintenance_orders" */
export type Maintenance_OrdersExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "maintenance_orders" */
export type Maintenance_OrdersExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};

/** aggregated selection of "maintenance_orders" */
export type Maintenance_Orders_Aggregate = {
  __typename?: 'maintenance_orders_aggregate';
  aggregate?: Maybe<Maintenance_Orders_Aggregate_Fields>;
  nodes: Array<Maintenance_Orders>;
};

/** aggregate fields of "maintenance_orders" */
export type Maintenance_Orders_Aggregate_Fields = {
  __typename?: 'maintenance_orders_aggregate_fields';
  avg?: Maybe<Maintenance_Orders_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Maintenance_Orders_Max_Fields>;
  min?: Maybe<Maintenance_Orders_Min_Fields>;
  stddev?: Maybe<Maintenance_Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Maintenance_Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Maintenance_Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Maintenance_Orders_Sum_Fields>;
  var_pop?: Maybe<Maintenance_Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Maintenance_Orders_Var_Samp_Fields>;
  variance?: Maybe<Maintenance_Orders_Variance_Fields>;
};


/** aggregate fields of "maintenance_orders" */
export type Maintenance_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "maintenance_orders" */
export type Maintenance_Orders_Aggregate_Order_By = {
  avg?: InputMaybe<Maintenance_Orders_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Maintenance_Orders_Max_Order_By>;
  min?: InputMaybe<Maintenance_Orders_Min_Order_By>;
  stddev?: InputMaybe<Maintenance_Orders_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Maintenance_Orders_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Maintenance_Orders_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Maintenance_Orders_Sum_Order_By>;
  var_pop?: InputMaybe<Maintenance_Orders_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Maintenance_Orders_Var_Samp_Order_By>;
  variance?: InputMaybe<Maintenance_Orders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "maintenance_orders" */
export type Maintenance_Orders_Arr_Rel_Insert_Input = {
  data: Array<Maintenance_Orders_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Maintenance_Orders_On_Conflict>;
};

/** aggregate avg on columns */
export type Maintenance_Orders_Avg_Fields = {
  __typename?: 'maintenance_orders_avg_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Avg_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "maintenance_orders". All fields are combined with a logical 'AND'. */
export type Maintenance_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Maintenance_Orders_Bool_Exp>>;
  _not?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Maintenance_Orders_Bool_Exp>>;
  client?: InputMaybe<Clients_Bool_Exp>;
  client_id?: InputMaybe<Int_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  expenses?: InputMaybe<Expenses_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  property?: InputMaybe<Properties_Bool_Exp>;
  property_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  tenant?: InputMaybe<Tenants_Bool_Exp>;
  tenant_id?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  unit?: InputMaybe<Units_Bool_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "maintenance_orders" */
export enum Maintenance_Orders_Constraint {
  /** unique or primary key constraint */
  MaintenanceOrdersPkey = 'maintenance_orders_pkey'
}

/** input type for incrementing numeric columns in table "maintenance_orders" */
export type Maintenance_Orders_Inc_Input = {
  client_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  property_id?: InputMaybe<Scalars['Int']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "maintenance_orders" */
export type Maintenance_Orders_Insert_Input = {
  client?: InputMaybe<Clients_Obj_Rel_Insert_Input>;
  client_id?: InputMaybe<Scalars['Int']>;
  completed_at?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  expenses?: InputMaybe<Expenses_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  property?: InputMaybe<Properties_Obj_Rel_Insert_Input>;
  property_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tenant?: InputMaybe<Tenants_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Units_Obj_Rel_Insert_Input>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Maintenance_Orders_Max_Fields = {
  __typename?: 'maintenance_orders_max_fields';
  client_id?: Maybe<Scalars['Int']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  tenant_id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Max_Order_By = {
  client_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Maintenance_Orders_Min_Fields = {
  __typename?: 'maintenance_orders_min_fields';
  client_id?: Maybe<Scalars['Int']>;
  completed_at?: Maybe<Scalars['timestamptz']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  tenant_id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Min_Order_By = {
  client_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "maintenance_orders" */
export type Maintenance_Orders_Mutation_Response = {
  __typename?: 'maintenance_orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Maintenance_Orders>;
};

/** input type for inserting object relation for remote table "maintenance_orders" */
export type Maintenance_Orders_Obj_Rel_Insert_Input = {
  data: Maintenance_Orders_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Maintenance_Orders_On_Conflict>;
};

/** on conflict condition type for table "maintenance_orders" */
export type Maintenance_Orders_On_Conflict = {
  constraint: Maintenance_Orders_Constraint;
  update_columns?: Array<Maintenance_Orders_Update_Column>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "maintenance_orders". */
export type Maintenance_Orders_Order_By = {
  client?: InputMaybe<Clients_Order_By>;
  client_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  expenses_aggregate?: InputMaybe<Expenses_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  property?: InputMaybe<Properties_Order_By>;
  property_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenants_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  unit?: InputMaybe<Units_Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: maintenance_orders */
export type Maintenance_Orders_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "maintenance_orders" */
export enum Maintenance_Orders_Select_Column {
  /** column name */
  ClientId = 'client_id',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  Status = 'status',
  /** column name */
  TenantId = 'tenant_id',
  /** column name */
  Title = 'title',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "maintenance_orders" */
export type Maintenance_Orders_Set_Input = {
  client_id?: InputMaybe<Scalars['Int']>;
  completed_at?: InputMaybe<Scalars['timestamptz']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  property_id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Maintenance_Orders_Stddev_Fields = {
  __typename?: 'maintenance_orders_stddev_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Stddev_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Maintenance_Orders_Stddev_Pop_Fields = {
  __typename?: 'maintenance_orders_stddev_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Stddev_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Maintenance_Orders_Stddev_Samp_Fields = {
  __typename?: 'maintenance_orders_stddev_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Stddev_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Maintenance_Orders_Sum_Fields = {
  __typename?: 'maintenance_orders_sum_fields';
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  tenant_id?: Maybe<Scalars['Int']>;
  unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Sum_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** update columns of table "maintenance_orders" */
export enum Maintenance_Orders_Update_Column {
  /** column name */
  ClientId = 'client_id',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  Status = 'status',
  /** column name */
  TenantId = 'tenant_id',
  /** column name */
  Title = 'title',
  /** column name */
  UnitId = 'unit_id'
}

/** aggregate var_pop on columns */
export type Maintenance_Orders_Var_Pop_Fields = {
  __typename?: 'maintenance_orders_var_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Var_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Maintenance_Orders_Var_Samp_Fields = {
  __typename?: 'maintenance_orders_var_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Var_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Maintenance_Orders_Variance_Fields = {
  __typename?: 'maintenance_orders_variance_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
  unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "maintenance_orders" */
export type Maintenance_Orders_Variance_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "clients" */
  delete_clients?: Maybe<Clients_Mutation_Response>;
  /** delete single row from the table: "clients" */
  delete_clients_by_pk?: Maybe<Clients>;
  /** delete data from the table: "expenses" */
  delete_expenses?: Maybe<Expenses_Mutation_Response>;
  /** delete single row from the table: "expenses" */
  delete_expenses_by_pk?: Maybe<Expenses>;
  /** delete data from the table: "expenses_types" */
  delete_expenses_types?: Maybe<Expenses_Types_Mutation_Response>;
  /** delete single row from the table: "expenses_types" */
  delete_expenses_types_by_pk?: Maybe<Expenses_Types>;
  /** delete data from the table: "leases" */
  delete_leases?: Maybe<Leases_Mutation_Response>;
  /** delete single row from the table: "leases" */
  delete_leases_by_pk?: Maybe<Leases>;
  /** delete data from the table: "listings" */
  delete_listings?: Maybe<Listings_Mutation_Response>;
  /** delete single row from the table: "listings" */
  delete_listings_by_pk?: Maybe<Listings>;
  /** delete data from the table: "maintenance_orders" */
  delete_maintenance_orders?: Maybe<Maintenance_Orders_Mutation_Response>;
  /** delete single row from the table: "maintenance_orders" */
  delete_maintenance_orders_by_pk?: Maybe<Maintenance_Orders>;
  /** delete data from the table: "properties" */
  delete_properties?: Maybe<Properties_Mutation_Response>;
  /** delete single row from the table: "properties" */
  delete_properties_by_pk?: Maybe<Properties>;
  /** delete data from the table: "tenants" */
  delete_tenants?: Maybe<Tenants_Mutation_Response>;
  /** delete single row from the table: "tenants" */
  delete_tenants_by_pk?: Maybe<Tenants>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "transactions" */
  delete_transactions_by_pk?: Maybe<Transactions>;
  /** delete data from the table: "units" */
  delete_units?: Maybe<Units_Mutation_Response>;
  /** delete single row from the table: "units" */
  delete_units_by_pk?: Maybe<Units>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "clients" */
  insert_clients?: Maybe<Clients_Mutation_Response>;
  /** insert a single row into the table: "clients" */
  insert_clients_one?: Maybe<Clients>;
  /** insert data into the table: "expenses" */
  insert_expenses?: Maybe<Expenses_Mutation_Response>;
  /** insert a single row into the table: "expenses" */
  insert_expenses_one?: Maybe<Expenses>;
  /** insert data into the table: "expenses_types" */
  insert_expenses_types?: Maybe<Expenses_Types_Mutation_Response>;
  /** insert a single row into the table: "expenses_types" */
  insert_expenses_types_one?: Maybe<Expenses_Types>;
  /** insert data into the table: "leases" */
  insert_leases?: Maybe<Leases_Mutation_Response>;
  /** insert a single row into the table: "leases" */
  insert_leases_one?: Maybe<Leases>;
  /** insert data into the table: "listings" */
  insert_listings?: Maybe<Listings_Mutation_Response>;
  /** insert a single row into the table: "listings" */
  insert_listings_one?: Maybe<Listings>;
  /** insert data into the table: "maintenance_orders" */
  insert_maintenance_orders?: Maybe<Maintenance_Orders_Mutation_Response>;
  /** insert a single row into the table: "maintenance_orders" */
  insert_maintenance_orders_one?: Maybe<Maintenance_Orders>;
  /** insert data into the table: "properties" */
  insert_properties?: Maybe<Properties_Mutation_Response>;
  /** insert a single row into the table: "properties" */
  insert_properties_one?: Maybe<Properties>;
  /** insert data into the table: "tenants" */
  insert_tenants?: Maybe<Tenants_Mutation_Response>;
  /** insert a single row into the table: "tenants" */
  insert_tenants_one?: Maybe<Tenants>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "transactions" */
  insert_transactions_one?: Maybe<Transactions>;
  /** insert data into the table: "units" */
  insert_units?: Maybe<Units_Mutation_Response>;
  /** insert a single row into the table: "units" */
  insert_units_one?: Maybe<Units>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "clients" */
  update_clients?: Maybe<Clients_Mutation_Response>;
  /** update single row of the table: "clients" */
  update_clients_by_pk?: Maybe<Clients>;
  /** update data of the table: "expenses" */
  update_expenses?: Maybe<Expenses_Mutation_Response>;
  /** update single row of the table: "expenses" */
  update_expenses_by_pk?: Maybe<Expenses>;
  /** update data of the table: "expenses_types" */
  update_expenses_types?: Maybe<Expenses_Types_Mutation_Response>;
  /** update single row of the table: "expenses_types" */
  update_expenses_types_by_pk?: Maybe<Expenses_Types>;
  /** update data of the table: "leases" */
  update_leases?: Maybe<Leases_Mutation_Response>;
  /** update single row of the table: "leases" */
  update_leases_by_pk?: Maybe<Leases>;
  /** update data of the table: "listings" */
  update_listings?: Maybe<Listings_Mutation_Response>;
  /** update single row of the table: "listings" */
  update_listings_by_pk?: Maybe<Listings>;
  /** update data of the table: "maintenance_orders" */
  update_maintenance_orders?: Maybe<Maintenance_Orders_Mutation_Response>;
  /** update single row of the table: "maintenance_orders" */
  update_maintenance_orders_by_pk?: Maybe<Maintenance_Orders>;
  /** update data of the table: "properties" */
  update_properties?: Maybe<Properties_Mutation_Response>;
  /** update single row of the table: "properties" */
  update_properties_by_pk?: Maybe<Properties>;
  /** update data of the table: "tenants" */
  update_tenants?: Maybe<Tenants_Mutation_Response>;
  /** update single row of the table: "tenants" */
  update_tenants_by_pk?: Maybe<Tenants>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "transactions" */
  update_transactions_by_pk?: Maybe<Transactions>;
  /** update data of the table: "units" */
  update_units?: Maybe<Units_Mutation_Response>;
  /** update single row of the table: "units" */
  update_units_by_pk?: Maybe<Units>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_ClientsArgs = {
  where: Clients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Clients_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ExpensesArgs = {
  where: Expenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Expenses_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Expenses_TypesArgs = {
  where: Expenses_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Expenses_Types_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_LeasesArgs = {
  where: Leases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Leases_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ListingsArgs = {
  where: Listings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Listings_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Maintenance_OrdersArgs = {
  where: Maintenance_Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Maintenance_Orders_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PropertiesArgs = {
  where: Properties_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Properties_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TenantsArgs = {
  where: Tenants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenants_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transactions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UnitsArgs = {
  where: Units_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Units_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_ClientsArgs = {
  objects: Array<Clients_Insert_Input>;
  on_conflict?: InputMaybe<Clients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Clients_OneArgs = {
  object: Clients_Insert_Input;
  on_conflict?: InputMaybe<Clients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExpensesArgs = {
  objects: Array<Expenses_Insert_Input>;
  on_conflict?: InputMaybe<Expenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Expenses_OneArgs = {
  object: Expenses_Insert_Input;
  on_conflict?: InputMaybe<Expenses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Expenses_TypesArgs = {
  objects: Array<Expenses_Types_Insert_Input>;
  on_conflict?: InputMaybe<Expenses_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Expenses_Types_OneArgs = {
  object: Expenses_Types_Insert_Input;
  on_conflict?: InputMaybe<Expenses_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LeasesArgs = {
  objects: Array<Leases_Insert_Input>;
  on_conflict?: InputMaybe<Leases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Leases_OneArgs = {
  object: Leases_Insert_Input;
  on_conflict?: InputMaybe<Leases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ListingsArgs = {
  objects: Array<Listings_Insert_Input>;
  on_conflict?: InputMaybe<Listings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Listings_OneArgs = {
  object: Listings_Insert_Input;
  on_conflict?: InputMaybe<Listings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Maintenance_OrdersArgs = {
  objects: Array<Maintenance_Orders_Insert_Input>;
  on_conflict?: InputMaybe<Maintenance_Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Maintenance_Orders_OneArgs = {
  object: Maintenance_Orders_Insert_Input;
  on_conflict?: InputMaybe<Maintenance_Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PropertiesArgs = {
  objects: Array<Properties_Insert_Input>;
  on_conflict?: InputMaybe<Properties_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Properties_OneArgs = {
  object: Properties_Insert_Input;
  on_conflict?: InputMaybe<Properties_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TenantsArgs = {
  objects: Array<Tenants_Insert_Input>;
  on_conflict?: InputMaybe<Tenants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenants_OneArgs = {
  object: Tenants_Insert_Input;
  on_conflict?: InputMaybe<Tenants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UnitsArgs = {
  objects: Array<Units_Insert_Input>;
  on_conflict?: InputMaybe<Units_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Units_OneArgs = {
  object: Units_Insert_Input;
  on_conflict?: InputMaybe<Units_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ClientsArgs = {
  _inc?: InputMaybe<Clients_Inc_Input>;
  _set?: InputMaybe<Clients_Set_Input>;
  where: Clients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Clients_By_PkArgs = {
  _inc?: InputMaybe<Clients_Inc_Input>;
  _set?: InputMaybe<Clients_Set_Input>;
  pk_columns: Clients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExpensesArgs = {
  _inc?: InputMaybe<Expenses_Inc_Input>;
  _set?: InputMaybe<Expenses_Set_Input>;
  where: Expenses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Expenses_By_PkArgs = {
  _inc?: InputMaybe<Expenses_Inc_Input>;
  _set?: InputMaybe<Expenses_Set_Input>;
  pk_columns: Expenses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Expenses_TypesArgs = {
  _set?: InputMaybe<Expenses_Types_Set_Input>;
  where: Expenses_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Expenses_Types_By_PkArgs = {
  _set?: InputMaybe<Expenses_Types_Set_Input>;
  pk_columns: Expenses_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LeasesArgs = {
  _inc?: InputMaybe<Leases_Inc_Input>;
  _set?: InputMaybe<Leases_Set_Input>;
  where: Leases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Leases_By_PkArgs = {
  _inc?: InputMaybe<Leases_Inc_Input>;
  _set?: InputMaybe<Leases_Set_Input>;
  pk_columns: Leases_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ListingsArgs = {
  _inc?: InputMaybe<Listings_Inc_Input>;
  _set?: InputMaybe<Listings_Set_Input>;
  where: Listings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Listings_By_PkArgs = {
  _inc?: InputMaybe<Listings_Inc_Input>;
  _set?: InputMaybe<Listings_Set_Input>;
  pk_columns: Listings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Maintenance_OrdersArgs = {
  _inc?: InputMaybe<Maintenance_Orders_Inc_Input>;
  _set?: InputMaybe<Maintenance_Orders_Set_Input>;
  where: Maintenance_Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Maintenance_Orders_By_PkArgs = {
  _inc?: InputMaybe<Maintenance_Orders_Inc_Input>;
  _set?: InputMaybe<Maintenance_Orders_Set_Input>;
  pk_columns: Maintenance_Orders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PropertiesArgs = {
  _inc?: InputMaybe<Properties_Inc_Input>;
  _set?: InputMaybe<Properties_Set_Input>;
  where: Properties_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Properties_By_PkArgs = {
  _inc?: InputMaybe<Properties_Inc_Input>;
  _set?: InputMaybe<Properties_Set_Input>;
  pk_columns: Properties_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TenantsArgs = {
  _inc?: InputMaybe<Tenants_Inc_Input>;
  _set?: InputMaybe<Tenants_Set_Input>;
  where: Tenants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenants_By_PkArgs = {
  _inc?: InputMaybe<Tenants_Inc_Input>;
  _set?: InputMaybe<Tenants_Set_Input>;
  pk_columns: Tenants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_By_PkArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UnitsArgs = {
  _inc?: InputMaybe<Units_Inc_Input>;
  _set?: InputMaybe<Units_Set_Input>;
  where: Units_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Units_By_PkArgs = {
  _inc?: InputMaybe<Units_Inc_Input>;
  _set?: InputMaybe<Units_Set_Input>;
  pk_columns: Units_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Boolean expression to compare columns of type "point". All fields are combined with logical 'AND'. */
export type Point_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['point']>;
  _gt?: InputMaybe<Scalars['point']>;
  _gte?: InputMaybe<Scalars['point']>;
  _in?: InputMaybe<Array<Scalars['point']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['point']>;
  _lte?: InputMaybe<Scalars['point']>;
  _neq?: InputMaybe<Scalars['point']>;
  _nin?: InputMaybe<Array<Scalars['point']>>;
};

/** columns and relationships of "properties" */
export type Properties = {
  __typename?: 'properties';
  area?: Maybe<Scalars['String']>;
  avenue?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  /** An object relationship */
  client?: Maybe<Clients>;
  client_id?: Maybe<Scalars['Int']>;
  coordinates?: Maybe<Scalars['point']>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  id: Scalars['Int'];
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  number?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  /** An array relationship */
  units: Array<Units>;
  /** An aggregate relationship */
  units_aggregate: Units_Aggregate;
};


/** columns and relationships of "properties" */
export type PropertiesExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "properties" */
export type PropertiesExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "properties" */
export type PropertiesMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "properties" */
export type PropertiesMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "properties" */
export type PropertiesUnitsArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


/** columns and relationships of "properties" */
export type PropertiesUnits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};

/** aggregated selection of "properties" */
export type Properties_Aggregate = {
  __typename?: 'properties_aggregate';
  aggregate?: Maybe<Properties_Aggregate_Fields>;
  nodes: Array<Properties>;
};

/** aggregate fields of "properties" */
export type Properties_Aggregate_Fields = {
  __typename?: 'properties_aggregate_fields';
  avg?: Maybe<Properties_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Properties_Max_Fields>;
  min?: Maybe<Properties_Min_Fields>;
  stddev?: Maybe<Properties_Stddev_Fields>;
  stddev_pop?: Maybe<Properties_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Properties_Stddev_Samp_Fields>;
  sum?: Maybe<Properties_Sum_Fields>;
  var_pop?: Maybe<Properties_Var_Pop_Fields>;
  var_samp?: Maybe<Properties_Var_Samp_Fields>;
  variance?: Maybe<Properties_Variance_Fields>;
};


/** aggregate fields of "properties" */
export type Properties_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Properties_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "properties" */
export type Properties_Aggregate_Order_By = {
  avg?: InputMaybe<Properties_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Properties_Max_Order_By>;
  min?: InputMaybe<Properties_Min_Order_By>;
  stddev?: InputMaybe<Properties_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Properties_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Properties_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Properties_Sum_Order_By>;
  var_pop?: InputMaybe<Properties_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Properties_Var_Samp_Order_By>;
  variance?: InputMaybe<Properties_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "properties" */
export type Properties_Arr_Rel_Insert_Input = {
  data: Array<Properties_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Properties_On_Conflict>;
};

/** aggregate avg on columns */
export type Properties_Avg_Fields = {
  __typename?: 'properties_avg_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "properties" */
export type Properties_Avg_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "properties". All fields are combined with a logical 'AND'. */
export type Properties_Bool_Exp = {
  _and?: InputMaybe<Array<Properties_Bool_Exp>>;
  _not?: InputMaybe<Properties_Bool_Exp>;
  _or?: InputMaybe<Array<Properties_Bool_Exp>>;
  area?: InputMaybe<String_Comparison_Exp>;
  avenue?: InputMaybe<String_Comparison_Exp>;
  block?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Clients_Bool_Exp>;
  client_id?: InputMaybe<Int_Comparison_Exp>;
  coordinates?: InputMaybe<Point_Comparison_Exp>;
  expenses?: InputMaybe<Expenses_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  number?: InputMaybe<String_Comparison_Exp>;
  street?: InputMaybe<String_Comparison_Exp>;
  units?: InputMaybe<Units_Bool_Exp>;
};

/** unique or primary key constraints on table "properties" */
export enum Properties_Constraint {
  /** unique or primary key constraint */
  PropertiesPkey = 'properties_pkey'
}

/** input type for incrementing numeric columns in table "properties" */
export type Properties_Inc_Input = {
  client_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "properties" */
export type Properties_Insert_Input = {
  area?: InputMaybe<Scalars['String']>;
  avenue?: InputMaybe<Scalars['String']>;
  block?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Clients_Obj_Rel_Insert_Input>;
  client_id?: InputMaybe<Scalars['Int']>;
  coordinates?: InputMaybe<Scalars['point']>;
  expenses?: InputMaybe<Expenses_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Arr_Rel_Insert_Input>;
  number?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Units_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Properties_Max_Fields = {
  __typename?: 'properties_max_fields';
  area?: Maybe<Scalars['String']>;
  avenue?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "properties" */
export type Properties_Max_Order_By = {
  area?: InputMaybe<Order_By>;
  avenue?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  street?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Properties_Min_Fields = {
  __typename?: 'properties_min_fields';
  area?: Maybe<Scalars['String']>;
  avenue?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "properties" */
export type Properties_Min_Order_By = {
  area?: InputMaybe<Order_By>;
  avenue?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  street?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "properties" */
export type Properties_Mutation_Response = {
  __typename?: 'properties_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Properties>;
};

/** input type for inserting object relation for remote table "properties" */
export type Properties_Obj_Rel_Insert_Input = {
  data: Properties_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Properties_On_Conflict>;
};

/** on conflict condition type for table "properties" */
export type Properties_On_Conflict = {
  constraint: Properties_Constraint;
  update_columns?: Array<Properties_Update_Column>;
  where?: InputMaybe<Properties_Bool_Exp>;
};

/** Ordering options when selecting data from "properties". */
export type Properties_Order_By = {
  area?: InputMaybe<Order_By>;
  avenue?: InputMaybe<Order_By>;
  block?: InputMaybe<Order_By>;
  client?: InputMaybe<Clients_Order_By>;
  client_id?: InputMaybe<Order_By>;
  coordinates?: InputMaybe<Order_By>;
  expenses_aggregate?: InputMaybe<Expenses_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  maintenance_orders_aggregate?: InputMaybe<Maintenance_Orders_Aggregate_Order_By>;
  number?: InputMaybe<Order_By>;
  street?: InputMaybe<Order_By>;
  units_aggregate?: InputMaybe<Units_Aggregate_Order_By>;
};

/** primary key columns input for table: properties */
export type Properties_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "properties" */
export enum Properties_Select_Column {
  /** column name */
  Area = 'area',
  /** column name */
  Avenue = 'avenue',
  /** column name */
  Block = 'block',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  Coordinates = 'coordinates',
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
  /** column name */
  Street = 'street'
}

/** input type for updating data in table "properties" */
export type Properties_Set_Input = {
  area?: InputMaybe<Scalars['String']>;
  avenue?: InputMaybe<Scalars['String']>;
  block?: InputMaybe<Scalars['String']>;
  client_id?: InputMaybe<Scalars['Int']>;
  coordinates?: InputMaybe<Scalars['point']>;
  id?: InputMaybe<Scalars['Int']>;
  number?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Properties_Stddev_Fields = {
  __typename?: 'properties_stddev_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "properties" */
export type Properties_Stddev_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Properties_Stddev_Pop_Fields = {
  __typename?: 'properties_stddev_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "properties" */
export type Properties_Stddev_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Properties_Stddev_Samp_Fields = {
  __typename?: 'properties_stddev_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "properties" */
export type Properties_Stddev_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Properties_Sum_Fields = {
  __typename?: 'properties_sum_fields';
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "properties" */
export type Properties_Sum_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "properties" */
export enum Properties_Update_Column {
  /** column name */
  Area = 'area',
  /** column name */
  Avenue = 'avenue',
  /** column name */
  Block = 'block',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  Coordinates = 'coordinates',
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
  /** column name */
  Street = 'street'
}

/** aggregate var_pop on columns */
export type Properties_Var_Pop_Fields = {
  __typename?: 'properties_var_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "properties" */
export type Properties_Var_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Properties_Var_Samp_Fields = {
  __typename?: 'properties_var_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "properties" */
export type Properties_Var_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Properties_Variance_Fields = {
  __typename?: 'properties_variance_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "properties" */
export type Properties_Variance_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "clients" */
  clients: Array<Clients>;
  /** fetch aggregated fields from the table: "clients" */
  clients_aggregate: Clients_Aggregate;
  /** fetch data from the table: "clients" using primary key columns */
  clients_by_pk?: Maybe<Clients>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  /** fetch data from the table: "expenses" using primary key columns */
  expenses_by_pk?: Maybe<Expenses>;
  /** fetch data from the table: "expenses_types" */
  expenses_types: Array<Expenses_Types>;
  /** fetch aggregated fields from the table: "expenses_types" */
  expenses_types_aggregate: Expenses_Types_Aggregate;
  /** fetch data from the table: "expenses_types" using primary key columns */
  expenses_types_by_pk?: Maybe<Expenses_Types>;
  /** An array relationship */
  leases: Array<Leases>;
  /** An aggregate relationship */
  leases_aggregate: Leases_Aggregate;
  /** fetch data from the table: "leases" using primary key columns */
  leases_by_pk?: Maybe<Leases>;
  /** An array relationship */
  listings: Array<Listings>;
  /** An aggregate relationship */
  listings_aggregate: Listings_Aggregate;
  /** fetch data from the table: "listings" using primary key columns */
  listings_by_pk?: Maybe<Listings>;
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  /** fetch data from the table: "maintenance_orders" using primary key columns */
  maintenance_orders_by_pk?: Maybe<Maintenance_Orders>;
  /** An array relationship */
  properties: Array<Properties>;
  /** An aggregate relationship */
  properties_aggregate: Properties_Aggregate;
  /** fetch data from the table: "properties" using primary key columns */
  properties_by_pk?: Maybe<Properties>;
  /** fetch data from the table: "tenants" */
  tenants: Array<Tenants>;
  /** fetch aggregated fields from the table: "tenants" */
  tenants_aggregate: Tenants_Aggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  tenants_by_pk?: Maybe<Tenants>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** An array relationship */
  units: Array<Units>;
  /** An aggregate relationship */
  units_aggregate: Units_Aggregate;
  /** fetch data from the table: "units" using primary key columns */
  units_by_pk?: Maybe<Units>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootClientsArgs = {
  distinct_on?: InputMaybe<Array<Clients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Clients_Order_By>>;
  where?: InputMaybe<Clients_Bool_Exp>;
};


export type Query_RootClients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Clients_Order_By>>;
  where?: InputMaybe<Clients_Bool_Exp>;
};


export type Query_RootClients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Query_RootExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Query_RootExpenses_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootExpenses_TypesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Types_Order_By>>;
  where?: InputMaybe<Expenses_Types_Bool_Exp>;
};


export type Query_RootExpenses_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Types_Order_By>>;
  where?: InputMaybe<Expenses_Types_Bool_Exp>;
};


export type Query_RootExpenses_Types_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootLeasesArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


export type Query_RootLeases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


export type Query_RootLeases_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootListingsArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


export type Query_RootListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


export type Query_RootListings_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


export type Query_RootMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


export type Query_RootMaintenance_Orders_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPropertiesArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


export type Query_RootProperties_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


export type Query_RootProperties_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTenantsArgs = {
  distinct_on?: InputMaybe<Array<Tenants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenants_Order_By>>;
  where?: InputMaybe<Tenants_Bool_Exp>;
};


export type Query_RootTenants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenants_Order_By>>;
  where?: InputMaybe<Tenants_Bool_Exp>;
};


export type Query_RootTenants_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUnitsArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Query_RootUnits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Query_RootUnits_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "clients" */
  clients: Array<Clients>;
  /** fetch aggregated fields from the table: "clients" */
  clients_aggregate: Clients_Aggregate;
  /** fetch data from the table: "clients" using primary key columns */
  clients_by_pk?: Maybe<Clients>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  /** fetch data from the table: "expenses" using primary key columns */
  expenses_by_pk?: Maybe<Expenses>;
  /** fetch data from the table: "expenses_types" */
  expenses_types: Array<Expenses_Types>;
  /** fetch aggregated fields from the table: "expenses_types" */
  expenses_types_aggregate: Expenses_Types_Aggregate;
  /** fetch data from the table: "expenses_types" using primary key columns */
  expenses_types_by_pk?: Maybe<Expenses_Types>;
  /** An array relationship */
  leases: Array<Leases>;
  /** An aggregate relationship */
  leases_aggregate: Leases_Aggregate;
  /** fetch data from the table: "leases" using primary key columns */
  leases_by_pk?: Maybe<Leases>;
  /** An array relationship */
  listings: Array<Listings>;
  /** An aggregate relationship */
  listings_aggregate: Listings_Aggregate;
  /** fetch data from the table: "listings" using primary key columns */
  listings_by_pk?: Maybe<Listings>;
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  /** fetch data from the table: "maintenance_orders" using primary key columns */
  maintenance_orders_by_pk?: Maybe<Maintenance_Orders>;
  /** An array relationship */
  properties: Array<Properties>;
  /** An aggregate relationship */
  properties_aggregate: Properties_Aggregate;
  /** fetch data from the table: "properties" using primary key columns */
  properties_by_pk?: Maybe<Properties>;
  /** fetch data from the table: "tenants" */
  tenants: Array<Tenants>;
  /** fetch aggregated fields from the table: "tenants" */
  tenants_aggregate: Tenants_Aggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  tenants_by_pk?: Maybe<Tenants>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** An array relationship */
  units: Array<Units>;
  /** An aggregate relationship */
  units_aggregate: Units_Aggregate;
  /** fetch data from the table: "units" using primary key columns */
  units_by_pk?: Maybe<Units>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootClientsArgs = {
  distinct_on?: InputMaybe<Array<Clients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Clients_Order_By>>;
  where?: InputMaybe<Clients_Bool_Exp>;
};


export type Subscription_RootClients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Clients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Clients_Order_By>>;
  where?: InputMaybe<Clients_Bool_Exp>;
};


export type Subscription_RootClients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Subscription_RootExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


export type Subscription_RootExpenses_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootExpenses_TypesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Types_Order_By>>;
  where?: InputMaybe<Expenses_Types_Bool_Exp>;
};


export type Subscription_RootExpenses_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Types_Order_By>>;
  where?: InputMaybe<Expenses_Types_Bool_Exp>;
};


export type Subscription_RootExpenses_Types_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootLeasesArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


export type Subscription_RootLeases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


export type Subscription_RootLeases_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootListingsArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


export type Subscription_RootListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


export type Subscription_RootListings_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


export type Subscription_RootMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


export type Subscription_RootMaintenance_Orders_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPropertiesArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


export type Subscription_RootProperties_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Properties_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By>>;
  where?: InputMaybe<Properties_Bool_Exp>;
};


export type Subscription_RootProperties_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTenantsArgs = {
  distinct_on?: InputMaybe<Array<Tenants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenants_Order_By>>;
  where?: InputMaybe<Tenants_Bool_Exp>;
};


export type Subscription_RootTenants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenants_Order_By>>;
  where?: InputMaybe<Tenants_Bool_Exp>;
};


export type Subscription_RootTenants_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUnitsArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Subscription_RootUnits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Units_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By>>;
  where?: InputMaybe<Units_Bool_Exp>;
};


export type Subscription_RootUnits_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "tenants" */
export type Tenants = {
  __typename?: 'tenants';
  civilid?: Maybe<Scalars['bigint']>;
  dob?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  last_name?: Maybe<Scalars['String']>;
  /** An array relationship */
  leases: Array<Leases>;
  /** An aggregate relationship */
  leases_aggregate: Leases_Aggregate;
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  phone?: Maybe<Scalars['String']>;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<Users>;
};


/** columns and relationships of "tenants" */
export type TenantsLeasesArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


/** columns and relationships of "tenants" */
export type TenantsLeases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


/** columns and relationships of "tenants" */
export type TenantsMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "tenants" */
export type TenantsMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};

/** aggregated selection of "tenants" */
export type Tenants_Aggregate = {
  __typename?: 'tenants_aggregate';
  aggregate?: Maybe<Tenants_Aggregate_Fields>;
  nodes: Array<Tenants>;
};

/** aggregate fields of "tenants" */
export type Tenants_Aggregate_Fields = {
  __typename?: 'tenants_aggregate_fields';
  avg?: Maybe<Tenants_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Tenants_Max_Fields>;
  min?: Maybe<Tenants_Min_Fields>;
  stddev?: Maybe<Tenants_Stddev_Fields>;
  stddev_pop?: Maybe<Tenants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tenants_Stddev_Samp_Fields>;
  sum?: Maybe<Tenants_Sum_Fields>;
  var_pop?: Maybe<Tenants_Var_Pop_Fields>;
  var_samp?: Maybe<Tenants_Var_Samp_Fields>;
  variance?: Maybe<Tenants_Variance_Fields>;
};


/** aggregate fields of "tenants" */
export type Tenants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Tenants_Avg_Fields = {
  __typename?: 'tenants_avg_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "tenants". All fields are combined with a logical 'AND'. */
export type Tenants_Bool_Exp = {
  _and?: InputMaybe<Array<Tenants_Bool_Exp>>;
  _not?: InputMaybe<Tenants_Bool_Exp>;
  _or?: InputMaybe<Array<Tenants_Bool_Exp>>;
  civilid?: InputMaybe<Bigint_Comparison_Exp>;
  dob?: InputMaybe<Date_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  leases?: InputMaybe<Leases_Bool_Exp>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  second_name?: InputMaybe<String_Comparison_Exp>;
  third_name?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "tenants" */
export enum Tenants_Constraint {
  /** unique or primary key constraint */
  TenantsPkey = 'tenants_pkey'
}

/** input type for incrementing numeric columns in table "tenants" */
export type Tenants_Inc_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "tenants" */
export type Tenants_Insert_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  dob?: InputMaybe<Scalars['date']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  last_name?: InputMaybe<Scalars['String']>;
  leases?: InputMaybe<Leases_Arr_Rel_Insert_Input>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Arr_Rel_Insert_Input>;
  phone?: InputMaybe<Scalars['String']>;
  second_name?: InputMaybe<Scalars['String']>;
  third_name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tenants_Max_Fields = {
  __typename?: 'tenants_max_fields';
  civilid?: Maybe<Scalars['bigint']>;
  dob?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Tenants_Min_Fields = {
  __typename?: 'tenants_min_fields';
  civilid?: Maybe<Scalars['bigint']>;
  dob?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  second_name?: Maybe<Scalars['String']>;
  third_name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "tenants" */
export type Tenants_Mutation_Response = {
  __typename?: 'tenants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenants>;
};

/** input type for inserting object relation for remote table "tenants" */
export type Tenants_Obj_Rel_Insert_Input = {
  data: Tenants_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Tenants_On_Conflict>;
};

/** on conflict condition type for table "tenants" */
export type Tenants_On_Conflict = {
  constraint: Tenants_Constraint;
  update_columns?: Array<Tenants_Update_Column>;
  where?: InputMaybe<Tenants_Bool_Exp>;
};

/** Ordering options when selecting data from "tenants". */
export type Tenants_Order_By = {
  civilid?: InputMaybe<Order_By>;
  dob?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  leases_aggregate?: InputMaybe<Leases_Aggregate_Order_By>;
  maintenance_orders_aggregate?: InputMaybe<Maintenance_Orders_Aggregate_Order_By>;
  phone?: InputMaybe<Order_By>;
  second_name?: InputMaybe<Order_By>;
  third_name?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: tenants */
export type Tenants_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "tenants" */
export enum Tenants_Select_Column {
  /** column name */
  Civilid = 'civilid',
  /** column name */
  Dob = 'dob',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  SecondName = 'second_name',
  /** column name */
  ThirdName = 'third_name'
}

/** input type for updating data in table "tenants" */
export type Tenants_Set_Input = {
  civilid?: InputMaybe<Scalars['bigint']>;
  dob?: InputMaybe<Scalars['date']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  second_name?: InputMaybe<Scalars['String']>;
  third_name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Tenants_Stddev_Fields = {
  __typename?: 'tenants_stddev_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Tenants_Stddev_Pop_Fields = {
  __typename?: 'tenants_stddev_pop_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Tenants_Stddev_Samp_Fields = {
  __typename?: 'tenants_stddev_samp_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Tenants_Sum_Fields = {
  __typename?: 'tenants_sum_fields';
  civilid?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "tenants" */
export enum Tenants_Update_Column {
  /** column name */
  Civilid = 'civilid',
  /** column name */
  Dob = 'dob',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Phone = 'phone',
  /** column name */
  SecondName = 'second_name',
  /** column name */
  ThirdName = 'third_name'
}

/** aggregate var_pop on columns */
export type Tenants_Var_Pop_Fields = {
  __typename?: 'tenants_var_pop_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Tenants_Var_Samp_Fields = {
  __typename?: 'tenants_var_samp_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Tenants_Variance_Fields = {
  __typename?: 'tenants_variance_fields';
  civilid?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "transactions" */
export type Transactions = {
  __typename?: 'transactions';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  due_date?: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  is_paid?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  lease?: Maybe<Leases>;
  lease_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  receipt_url?: Maybe<Scalars['String']>;
};

/** aggregated selection of "transactions" */
export type Transactions_Aggregate = {
  __typename?: 'transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

/** aggregate fields of "transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: InputMaybe<Transactions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transactions_Max_Order_By>;
  min?: InputMaybe<Transactions_Min_Order_By>;
  stddev?: InputMaybe<Transactions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transactions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transactions_Sum_Order_By>;
  var_pop?: InputMaybe<Transactions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transactions_Var_Samp_Order_By>;
  variance?: InputMaybe<Transactions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'transactions_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transactions" */
export type Transactions_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Transactions_Bool_Exp>>;
  _not?: InputMaybe<Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Transactions_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  due_date?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_paid?: InputMaybe<Boolean_Comparison_Exp>;
  lease?: InputMaybe<Leases_Bool_Exp>;
  lease_id?: InputMaybe<Int_Comparison_Exp>;
  memo?: InputMaybe<String_Comparison_Exp>;
  receipt_url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint */
  TransactionsPkey = 'transactions_pkey'
}

/** input type for incrementing numeric columns in table "transactions" */
export type Transactions_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  lease_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "transactions" */
export type Transactions_Insert_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  due_date?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['Int']>;
  is_paid?: InputMaybe<Scalars['Boolean']>;
  lease?: InputMaybe<Leases_Obj_Rel_Insert_Input>;
  lease_id?: InputMaybe<Scalars['Int']>;
  memo?: InputMaybe<Scalars['String']>;
  receipt_url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'transactions_max_fields';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  due_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  lease_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  receipt_url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "transactions" */
export type Transactions_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  due_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  receipt_url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'transactions_min_fields';
  amount?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  due_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  lease_id?: Maybe<Scalars['Int']>;
  memo?: Maybe<Scalars['String']>;
  receipt_url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "transactions" */
export type Transactions_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  due_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  receipt_url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** on conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "transactions". */
export type Transactions_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  due_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_paid?: InputMaybe<Order_By>;
  lease?: InputMaybe<Leases_Order_By>;
  lease_id?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  receipt_url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "transactions" */
export enum Transactions_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsPaid = 'is_paid',
  /** column name */
  LeaseId = 'lease_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  ReceiptUrl = 'receipt_url'
}

/** input type for updating data in table "transactions" */
export type Transactions_Set_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  due_date?: InputMaybe<Scalars['date']>;
  id?: InputMaybe<Scalars['Int']>;
  is_paid?: InputMaybe<Scalars['Boolean']>;
  lease_id?: InputMaybe<Scalars['Int']>;
  memo?: InputMaybe<Scalars['String']>;
  receipt_url?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'transactions_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "transactions" */
export type Transactions_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'transactions_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'transactions_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'transactions_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  lease_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "transactions" */
export type Transactions_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** update columns of table "transactions" */
export enum Transactions_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsPaid = 'is_paid',
  /** column name */
  LeaseId = 'lease_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  ReceiptUrl = 'receipt_url'
}

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'transactions_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "transactions" */
export type Transactions_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'transactions_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transactions" */
export type Transactions_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'transactions_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lease_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transactions" */
export type Transactions_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lease_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "units" */
export type Units = {
  __typename?: 'units';
  bath?: Maybe<Scalars['numeric']>;
  bed?: Maybe<Scalars['numeric']>;
  /** A computed field, executes function "client_id" */
  client_id_s?: Maybe<Scalars['Int']>;
  /** fetch data from the table: "expenses" */
  expenses: Array<Expenses>;
  /** An aggregate relationship */
  expenses_aggregate: Expenses_Aggregate;
  floor?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** A computed field, executes function "is_vacant" */
  is_vacant?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  leases: Array<Leases>;
  /** An aggregate relationship */
  leases_aggregate: Leases_Aggregate;
  /** An array relationship */
  listings: Array<Listings>;
  /** An aggregate relationship */
  listings_aggregate: Listings_Aggregate;
  /** An array relationship */
  maintenance_orders: Array<Maintenance_Orders>;
  /** An aggregate relationship */
  maintenance_orders_aggregate: Maintenance_Orders_Aggregate;
  /** An object relationship */
  property?: Maybe<Properties>;
  property_id?: Maybe<Scalars['Int']>;
  rent_market?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unit_number?: Maybe<Scalars['String']>;
  usage?: Maybe<Scalars['String']>;
};


/** columns and relationships of "units" */
export type UnitsExpensesArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsExpenses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Expenses_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Expenses_Order_By>>;
  where?: InputMaybe<Expenses_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsLeasesArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsLeases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By>>;
  where?: InputMaybe<Leases_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsListingsArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsListings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Listings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Listings_Order_By>>;
  where?: InputMaybe<Listings_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsMaintenance_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};


/** columns and relationships of "units" */
export type UnitsMaintenance_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Maintenance_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Maintenance_Orders_Order_By>>;
  where?: InputMaybe<Maintenance_Orders_Bool_Exp>;
};

/** aggregated selection of "units" */
export type Units_Aggregate = {
  __typename?: 'units_aggregate';
  aggregate?: Maybe<Units_Aggregate_Fields>;
  nodes: Array<Units>;
};

/** aggregate fields of "units" */
export type Units_Aggregate_Fields = {
  __typename?: 'units_aggregate_fields';
  avg?: Maybe<Units_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Units_Max_Fields>;
  min?: Maybe<Units_Min_Fields>;
  stddev?: Maybe<Units_Stddev_Fields>;
  stddev_pop?: Maybe<Units_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Units_Stddev_Samp_Fields>;
  sum?: Maybe<Units_Sum_Fields>;
  var_pop?: Maybe<Units_Var_Pop_Fields>;
  var_samp?: Maybe<Units_Var_Samp_Fields>;
  variance?: Maybe<Units_Variance_Fields>;
};


/** aggregate fields of "units" */
export type Units_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Units_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "units" */
export type Units_Aggregate_Order_By = {
  avg?: InputMaybe<Units_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Units_Max_Order_By>;
  min?: InputMaybe<Units_Min_Order_By>;
  stddev?: InputMaybe<Units_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Units_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Units_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Units_Sum_Order_By>;
  var_pop?: InputMaybe<Units_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Units_Var_Samp_Order_By>;
  variance?: InputMaybe<Units_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "units" */
export type Units_Arr_Rel_Insert_Input = {
  data: Array<Units_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Units_On_Conflict>;
};

/** aggregate avg on columns */
export type Units_Avg_Fields = {
  __typename?: 'units_avg_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "units" */
export type Units_Avg_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "units". All fields are combined with a logical 'AND'. */
export type Units_Bool_Exp = {
  _and?: InputMaybe<Array<Units_Bool_Exp>>;
  _not?: InputMaybe<Units_Bool_Exp>;
  _or?: InputMaybe<Array<Units_Bool_Exp>>;
  bath?: InputMaybe<Numeric_Comparison_Exp>;
  bed?: InputMaybe<Numeric_Comparison_Exp>;
  client_id_s?: InputMaybe<Int_Comparison_Exp>;
  expenses?: InputMaybe<Expenses_Bool_Exp>;
  floor?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_vacant?: InputMaybe<Boolean_Comparison_Exp>;
  leases?: InputMaybe<Leases_Bool_Exp>;
  listings?: InputMaybe<Listings_Bool_Exp>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Bool_Exp>;
  property?: InputMaybe<Properties_Bool_Exp>;
  property_id?: InputMaybe<Int_Comparison_Exp>;
  rent_market?: InputMaybe<Int_Comparison_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  unit_number?: InputMaybe<String_Comparison_Exp>;
  usage?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "units" */
export enum Units_Constraint {
  /** unique or primary key constraint */
  UnitsPkey = 'units_pkey'
}

/** input type for incrementing numeric columns in table "units" */
export type Units_Inc_Input = {
  bath?: InputMaybe<Scalars['numeric']>;
  bed?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['Int']>;
  property_id?: InputMaybe<Scalars['Int']>;
  rent_market?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "units" */
export type Units_Insert_Input = {
  bath?: InputMaybe<Scalars['numeric']>;
  bed?: InputMaybe<Scalars['numeric']>;
  expenses?: InputMaybe<Expenses_Arr_Rel_Insert_Input>;
  floor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  leases?: InputMaybe<Leases_Arr_Rel_Insert_Input>;
  listings?: InputMaybe<Listings_Arr_Rel_Insert_Input>;
  maintenance_orders?: InputMaybe<Maintenance_Orders_Arr_Rel_Insert_Input>;
  property?: InputMaybe<Properties_Obj_Rel_Insert_Input>;
  property_id?: InputMaybe<Scalars['Int']>;
  rent_market?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  unit_number?: InputMaybe<Scalars['String']>;
  usage?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Units_Max_Fields = {
  __typename?: 'units_max_fields';
  bath?: Maybe<Scalars['numeric']>;
  bed?: Maybe<Scalars['numeric']>;
  floor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  rent_market?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unit_number?: Maybe<Scalars['String']>;
  usage?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "units" */
export type Units_Max_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_number?: InputMaybe<Order_By>;
  usage?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Units_Min_Fields = {
  __typename?: 'units_min_fields';
  bath?: Maybe<Scalars['numeric']>;
  bed?: Maybe<Scalars['numeric']>;
  floor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  rent_market?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unit_number?: Maybe<Scalars['String']>;
  usage?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "units" */
export type Units_Min_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  floor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_number?: InputMaybe<Order_By>;
  usage?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "units" */
export type Units_Mutation_Response = {
  __typename?: 'units_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Units>;
};

/** input type for inserting object relation for remote table "units" */
export type Units_Obj_Rel_Insert_Input = {
  data: Units_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Units_On_Conflict>;
};

/** on conflict condition type for table "units" */
export type Units_On_Conflict = {
  constraint: Units_Constraint;
  update_columns?: Array<Units_Update_Column>;
  where?: InputMaybe<Units_Bool_Exp>;
};

/** Ordering options when selecting data from "units". */
export type Units_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  client_id_s?: InputMaybe<Order_By>;
  expenses_aggregate?: InputMaybe<Expenses_Aggregate_Order_By>;
  floor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_vacant?: InputMaybe<Order_By>;
  leases_aggregate?: InputMaybe<Leases_Aggregate_Order_By>;
  listings_aggregate?: InputMaybe<Listings_Aggregate_Order_By>;
  maintenance_orders_aggregate?: InputMaybe<Maintenance_Orders_Aggregate_Order_By>;
  property?: InputMaybe<Properties_Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_number?: InputMaybe<Order_By>;
  usage?: InputMaybe<Order_By>;
};

/** primary key columns input for table: units */
export type Units_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "units" */
export enum Units_Select_Column {
  /** column name */
  Bath = 'bath',
  /** column name */
  Bed = 'bed',
  /** column name */
  Floor = 'floor',
  /** column name */
  Id = 'id',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  RentMarket = 'rent_market',
  /** column name */
  Size = 'size',
  /** column name */
  Type = 'type',
  /** column name */
  UnitNumber = 'unit_number',
  /** column name */
  Usage = 'usage'
}

/** input type for updating data in table "units" */
export type Units_Set_Input = {
  bath?: InputMaybe<Scalars['numeric']>;
  bed?: InputMaybe<Scalars['numeric']>;
  floor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  property_id?: InputMaybe<Scalars['Int']>;
  rent_market?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  unit_number?: InputMaybe<Scalars['String']>;
  usage?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Units_Stddev_Fields = {
  __typename?: 'units_stddev_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "units" */
export type Units_Stddev_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Units_Stddev_Pop_Fields = {
  __typename?: 'units_stddev_pop_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "units" */
export type Units_Stddev_Pop_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Units_Stddev_Samp_Fields = {
  __typename?: 'units_stddev_samp_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "units" */
export type Units_Stddev_Samp_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Units_Sum_Fields = {
  __typename?: 'units_sum_fields';
  bath?: Maybe<Scalars['numeric']>;
  bed?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  property_id?: Maybe<Scalars['Int']>;
  rent_market?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "units" */
export type Units_Sum_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** update columns of table "units" */
export enum Units_Update_Column {
  /** column name */
  Bath = 'bath',
  /** column name */
  Bed = 'bed',
  /** column name */
  Floor = 'floor',
  /** column name */
  Id = 'id',
  /** column name */
  PropertyId = 'property_id',
  /** column name */
  RentMarket = 'rent_market',
  /** column name */
  Size = 'size',
  /** column name */
  Type = 'type',
  /** column name */
  UnitNumber = 'unit_number',
  /** column name */
  Usage = 'usage'
}

/** aggregate var_pop on columns */
export type Units_Var_Pop_Fields = {
  __typename?: 'units_var_pop_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "units" */
export type Units_Var_Pop_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Units_Var_Samp_Fields = {
  __typename?: 'units_var_samp_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "units" */
export type Units_Var_Samp_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Units_Variance_Fields = {
  __typename?: 'units_variance_fields';
  bath?: Maybe<Scalars['Float']>;
  bed?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  property_id?: Maybe<Scalars['Float']>;
  rent_market?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "units" */
export type Units_Variance_Order_By = {
  bath?: InputMaybe<Order_By>;
  bed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  property_id?: InputMaybe<Order_By>;
  rent_market?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An object relationship */
  client?: Maybe<Clients>;
  client_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  last_seen?: Maybe<Scalars['timestamptz']>;
  phone?: Maybe<Scalars['String']>;
  /** An object relationship */
  tenant?: Maybe<Tenants>;
  tenant_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
  stddev?: InputMaybe<Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  client?: InputMaybe<Clients_Bool_Exp>;
  client_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Date_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  last_seen?: InputMaybe<Timestamptz_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  tenant?: InputMaybe<Tenants_Bool_Exp>;
  tenant_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint */
  UsersTenantIdKey = 'users_tenant_id_key'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  client_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  client?: InputMaybe<Clients_Obj_Rel_Insert_Input>;
  client_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['date']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  last_seen?: InputMaybe<Scalars['timestamptz']>;
  phone?: InputMaybe<Scalars['String']>;
  tenant?: InputMaybe<Tenants_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  client_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  phone?: Maybe<Scalars['String']>;
  tenant_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  client_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  client_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['date']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  phone?: Maybe<Scalars['String']>;
  tenant_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  client_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  client?: InputMaybe<Clients_Order_By>;
  client_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenants_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  ClientId = 'client_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Phone = 'phone',
  /** column name */
  TenantId = 'tenant_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  client_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['date']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  last_seen?: InputMaybe<Scalars['timestamptz']>;
  phone?: InputMaybe<Scalars['String']>;
  tenant_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  client_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  tenant_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  ClientId = 'client_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Phone = 'phone',
  /** column name */
  TenantId = 'tenant_id'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  client_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  tenant_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  client_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClientMutation = { __typename?: 'mutation_root', delete_clients_by_pk?: { __typename?: 'clients', id: number } | null | undefined };

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePropertyMutation = { __typename?: 'mutation_root', delete_properties_by_pk?: { __typename?: 'properties', id: number } | null | undefined };

export type DeleteUnitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUnitMutation = { __typename?: 'mutation_root', delete_units_by_pk?: { __typename?: 'units', id: number } | null | undefined };

export type DeleteTenantMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTenantMutation = { __typename?: 'mutation_root', delete_tenants_by_pk?: { __typename?: 'tenants', id: number } | null | undefined };

export type InsertTenantMutationVariables = Exact<{
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
}>;


export type InsertTenantMutation = { __typename?: 'mutation_root', insert_tenants_one?: { __typename?: 'tenants', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined } | null | undefined };

export type UpdateTenantMutationVariables = Exact<{
  id: Scalars['Int'];
  _set?: InputMaybe<Tenants_Set_Input>;
}>;


export type UpdateTenantMutation = { __typename?: 'mutation_root', update_tenants_by_pk?: { __typename?: 'tenants', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, dob?: any | null | undefined, civilid?: any | null | undefined, phone?: string | null | undefined, second_name?: string | null | undefined, third_name?: string | null | undefined } | null | undefined };

export type ClientListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Clients_Order_By> | Clients_Order_By>;
}>;


export type ClientListQuery = { __typename?: 'query_root', clients: Array<{ __typename?: 'clients', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, is_active?: boolean | null | undefined, civilid?: any | null | undefined, email?: string | null | undefined, phone?: string | null | undefined }> };

export type LeaseByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LeaseByIdQuery = { __typename?: 'query_root', leases_by_pk?: { __typename?: 'leases', id: number, start_date?: any | null | undefined, end_date?: any | null | undefined, is_expired?: boolean | null | undefined, is_signed?: boolean | null | undefined, monthly_rent?: number | null | undefined, license?: string | null | undefined, deposit?: number | null | undefined, tenant_id?: number | null | undefined, unit_id?: number | null | undefined, unit?: { __typename?: 'units', id: number, client_id_s?: number | null | undefined, property_id?: number | null | undefined } | null | undefined } | null | undefined };

export type LeaseListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Leases_Order_By> | Leases_Order_By>;
}>;


export type LeaseListQuery = { __typename?: 'query_root', leases: Array<{ __typename?: 'leases', id: number, start_date?: any | null | undefined, end_date?: any | null | undefined, is_expired?: boolean | null | undefined, is_signed?: boolean | null | undefined, monthly_rent?: number | null | undefined, deposit?: number | null | undefined, license?: string | null | undefined, tenant_id?: number | null | undefined, unit_id?: number | null | undefined }> };

export type PropertyListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Properties_Order_By> | Properties_Order_By>;
}>;


export type PropertyListQuery = { __typename?: 'query_root', properties: Array<{ __typename?: 'properties', id: number, client_id?: number | null | undefined, area?: string | null | undefined, block?: string | null | undefined, street?: string | null | undefined, avenue?: string | null | undefined, number?: string | null | undefined, coordinates?: any | null | undefined }> };

export type TenantByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TenantByIdQuery = { __typename?: 'query_root', tenants_by_pk?: { __typename?: 'tenants', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined, dob?: any | null | undefined, civilid?: any | null | undefined, second_name?: string | null | undefined, third_name?: string | null | undefined, leases: Array<{ __typename?: 'leases', id: number, start_date?: any | null | undefined, end_date?: any | null | undefined, monthly_rent?: number | null | undefined, is_signed?: boolean | null | undefined, is_expired?: boolean | null | undefined, license?: string | null | undefined, unit?: { __typename?: 'units', id: number, property_id?: number | null | undefined, client_id_s?: number | null | undefined } | null | undefined, transactions: Array<{ __typename?: 'transactions', id: number, is_paid?: boolean | null | undefined, amount?: number | null | undefined, lease_id?: number | null | undefined, receipt_url?: string | null | undefined, created_at?: any | null | undefined, due_date?: any | null | undefined }> }> } | null | undefined };

export type TenantListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by: Array<Tenants_Order_By> | Tenants_Order_By;
}>;


export type TenantListQuery = { __typename?: 'query_root', tenants: Array<{ __typename?: 'tenants', id: number, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, phone?: string | null | undefined }> };

export type TrxByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TrxByIdQuery = { __typename?: 'query_root', transactions_by_pk?: { __typename?: 'transactions', id: number, amount?: number | null | undefined } | null | undefined };

export type Trx2ByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type Trx2ByIdQuery = { __typename?: 'query_root', transactions_by_pk?: { __typename?: 'transactions', id: number, is_paid?: boolean | null | undefined, memo?: string | null | undefined, created_at?: any | null | undefined } | null | undefined };

export type UnitListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Units_Order_By> | Units_Order_By>;
}>;


export type UnitListQuery = { __typename?: 'query_root', units: Array<{ __typename?: 'units', id: number, is_vacant?: boolean | null | undefined, rent_market?: number | null | undefined, size?: number | null | undefined, type?: string | null | undefined, unit_number?: string | null | undefined, usage?: string | null | undefined, bed?: any | null | undefined, bath?: any | null | undefined, floor?: string | null | undefined, property_id?: number | null | undefined, client_id_s?: number | null | undefined }> };

export type LeaseInsertMutationVariables = Exact<{
  object?: InputMaybe<Leases_Insert_Input>;
}>;


export type LeaseInsertMutation = { __typename?: 'mutation_root', insert_leases_one?: { __typename?: 'leases', id: number, deposit?: number | null | undefined, end_date?: any | null | undefined, is_expired?: boolean | null | undefined, is_signed?: boolean | null | undefined, license?: string | null | undefined, monthly_rent?: number | null | undefined, start_date?: any | null | undefined, tenant_id?: number | null | undefined, unit_id?: number | null | undefined } | null | undefined };

export type LeaseUpdateMutationVariables = Exact<{
  id: Scalars['Int'];
  _set?: InputMaybe<Leases_Set_Input>;
}>;


export type LeaseUpdateMutation = { __typename?: 'mutation_root', update_leases_by_pk?: { __typename?: 'leases', id: number, deposit?: number | null | undefined, end_date?: any | null | undefined, is_expired?: boolean | null | undefined, is_signed?: boolean | null | undefined, license?: string | null | undefined, monthly_rent?: number | null | undefined, start_date?: any | null | undefined, tenant_id?: number | null | undefined, unit_id?: number | null | undefined } | null | undefined };

export type DeleteLeaseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLeaseMutation = { __typename?: 'mutation_root', delete_leases_by_pk?: { __typename?: 'leases', id: number } | null | undefined };


export const DeleteClientDocument = gql`
    mutation DeleteClient($id: Int!) {
  delete_clients_by_pk(id: $id) {
    id
  }
}
    `;
export const DeletePropertyDocument = gql`
    mutation DeleteProperty($id: Int!) {
  delete_properties_by_pk(id: $id) {
    id
  }
}
    `;
export const DeleteUnitDocument = gql`
    mutation DeleteUnit($id: Int!) {
  delete_units_by_pk(id: $id) {
    id
  }
}
    `;
export const DeleteTenantDocument = gql`
    mutation DeleteTenant($id: Int!) {
  delete_tenants_by_pk(id: $id) {
    id
  }
}
    `;
export const InsertTenantDocument = gql`
    mutation InsertTenant($first_name: String, $last_name: String, $email: String, $phone: String) {
  insert_tenants_one(
    object: {first_name: $first_name, last_name: $last_name, email: $email, phone: $phone}
  ) {
    id
    first_name
    last_name
    email
    phone
  }
}
    `;
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($id: Int!, $_set: tenants_set_input) {
  update_tenants_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    first_name
    last_name
    email
    dob
    civilid
    phone
    second_name
    third_name
  }
}
    `;
export const ClientListDocument = gql`
    query ClientList($limit: Int, $offset: Int, $order_by: [clients_order_by!] = {}) @cached {
  clients(order_by: $order_by, limit: $limit, offset: $offset) {
    id
    first_name
    last_name
    is_active
    civilid
    email
    phone
  }
}
    `;
export const LeaseByIdDocument = gql`
    query LeaseById($id: Int!) {
  leases_by_pk(id: $id) {
    id
    start_date
    end_date
    is_expired
    is_signed
    monthly_rent
    license
    deposit
    tenant_id
    unit_id
    unit {
      id
      client_id_s
      property_id
    }
  }
}
    `;
export const LeaseListDocument = gql`
    query LeaseList($limit: Int, $offset: Int, $order_by: [leases_order_by!] = {}) @cached {
  leases(order_by: $order_by, limit: $limit, offset: $offset) {
    id
    start_date
    end_date
    is_expired
    is_signed
    monthly_rent
    deposit
    license
    tenant_id
    unit_id
  }
}
    `;
export const PropertyListDocument = gql`
    query PropertyList($limit: Int, $offset: Int, $order_by: [properties_order_by!] = {}) @cached {
  properties(order_by: $order_by, limit: $limit, offset: $offset) {
    id
    client_id
    area
    block
    street
    avenue
    number
    coordinates
  }
}
    `;
export const TenantByIdDocument = gql`
    query TenantById($id: Int!) {
  tenants_by_pk(id: $id) {
    id
    first_name
    last_name
    email
    phone
    dob
    civilid
    second_name
    third_name
    leases(order_by: {end_date: desc}) {
      id
      start_date
      end_date
      monthly_rent
      is_signed
      is_expired
      license
      unit {
        id
        property_id
        client_id_s
      }
      transactions(order_by: {due_date: desc}) {
        id
        is_paid
        amount
        lease_id
        receipt_url
        created_at
        due_date
      }
    }
  }
}
    `;
export const TenantListDocument = gql`
    query TenantList($limit: Int, $offset: Int, $order_by: [tenants_order_by!]!) @cached {
  tenants(limit: $limit, offset: $offset, order_by: $order_by) {
    id
    first_name
    last_name
    email
    phone
  }
}
    `;
export const TrxByIdDocument = gql`
    query TrxById($id: Int!) {
  transactions_by_pk(id: $id) {
    id
    amount
  }
}
    `;
export const Trx2ByIdDocument = gql`
    query Trx2ById($id: Int!) {
  transactions_by_pk(id: $id) {
    id
    is_paid
    memo
    created_at
  }
}
    `;
export const UnitListDocument = gql`
    query UnitList($limit: Int, $offset: Int, $order_by: [units_order_by!] = {}) @cached {
  units(order_by: $order_by, limit: $limit, offset: $offset) {
    id
    is_vacant
    rent_market
    size
    type
    unit_number
    usage
    bed
    bath
    floor
    property_id
    client_id_s
  }
}
    `;
export const LeaseInsertDocument = gql`
    mutation LeaseInsert($object: leases_insert_input = {}) {
  insert_leases_one(object: $object) {
    id
    deposit
    end_date
    is_expired
    is_signed
    license
    monthly_rent
    start_date
    tenant_id
    unit_id
  }
}
    `;
export const LeaseUpdateDocument = gql`
    mutation LeaseUpdate($id: Int!, $_set: leases_set_input) {
  update_leases_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    deposit
    end_date
    is_expired
    is_signed
    license
    monthly_rent
    start_date
    tenant_id
    unit_id
  }
}
    `;
export const DeleteLeaseDocument = gql`
    mutation DeleteLease($id: Int!) {
  delete_leases_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteClientMutationStore = OperationStore<DeleteClientMutation, DeleteClientMutationVariables>;
export type DeletePropertyMutationStore = OperationStore<DeletePropertyMutation, DeletePropertyMutationVariables>;
export type DeleteUnitMutationStore = OperationStore<DeleteUnitMutation, DeleteUnitMutationVariables>;
export type DeleteTenantMutationStore = OperationStore<DeleteTenantMutation, DeleteTenantMutationVariables>;
export type InsertTenantMutationStore = OperationStore<InsertTenantMutation, InsertTenantMutationVariables>;
export type UpdateTenantMutationStore = OperationStore<UpdateTenantMutation, UpdateTenantMutationVariables>;
export type ClientListQueryStore = OperationStore<ClientListQuery, ClientListQueryVariables>;
export type LeaseByIdQueryStore = OperationStore<LeaseByIdQuery, LeaseByIdQueryVariables>;
export type LeaseListQueryStore = OperationStore<LeaseListQuery, LeaseListQueryVariables>;
export type PropertyListQueryStore = OperationStore<PropertyListQuery, PropertyListQueryVariables>;
export type TenantByIdQueryStore = OperationStore<TenantByIdQuery, TenantByIdQueryVariables>;
export type TenantListQueryStore = OperationStore<TenantListQuery, TenantListQueryVariables>;
export type TrxByIdQueryStore = OperationStore<TrxByIdQuery, TrxByIdQueryVariables>;
export type Trx2ByIdQueryStore = OperationStore<Trx2ByIdQuery, Trx2ByIdQueryVariables>;
export type UnitListQueryStore = OperationStore<UnitListQuery, UnitListQueryVariables>;
export type LeaseInsertMutationStore = OperationStore<LeaseInsertMutation, LeaseInsertMutationVariables>;
export type LeaseUpdateMutationStore = OperationStore<LeaseUpdateMutation, LeaseUpdateMutationVariables>;
export type DeleteLeaseMutationStore = OperationStore<DeleteLeaseMutation, DeleteLeaseMutationVariables>;
export type WithTypename<T extends { __typename?: any }> = { [K in Exclude<keyof T, '__typename'>]?: T[K] } & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  clients?: (data: WithTypename<Clients>) => null | string,
  clients_aggregate?: (data: WithTypename<Clients_Aggregate>) => null | string,
  clients_aggregate_fields?: (data: WithTypename<Clients_Aggregate_Fields>) => null | string,
  clients_avg_fields?: (data: WithTypename<Clients_Avg_Fields>) => null | string,
  clients_max_fields?: (data: WithTypename<Clients_Max_Fields>) => null | string,
  clients_min_fields?: (data: WithTypename<Clients_Min_Fields>) => null | string,
  clients_mutation_response?: (data: WithTypename<Clients_Mutation_Response>) => null | string,
  clients_stddev_fields?: (data: WithTypename<Clients_Stddev_Fields>) => null | string,
  clients_stddev_pop_fields?: (data: WithTypename<Clients_Stddev_Pop_Fields>) => null | string,
  clients_stddev_samp_fields?: (data: WithTypename<Clients_Stddev_Samp_Fields>) => null | string,
  clients_sum_fields?: (data: WithTypename<Clients_Sum_Fields>) => null | string,
  clients_var_pop_fields?: (data: WithTypename<Clients_Var_Pop_Fields>) => null | string,
  clients_var_samp_fields?: (data: WithTypename<Clients_Var_Samp_Fields>) => null | string,
  clients_variance_fields?: (data: WithTypename<Clients_Variance_Fields>) => null | string,
  expenses?: (data: WithTypename<Expenses>) => null | string,
  expenses_aggregate?: (data: WithTypename<Expenses_Aggregate>) => null | string,
  expenses_aggregate_fields?: (data: WithTypename<Expenses_Aggregate_Fields>) => null | string,
  expenses_avg_fields?: (data: WithTypename<Expenses_Avg_Fields>) => null | string,
  expenses_max_fields?: (data: WithTypename<Expenses_Max_Fields>) => null | string,
  expenses_min_fields?: (data: WithTypename<Expenses_Min_Fields>) => null | string,
  expenses_mutation_response?: (data: WithTypename<Expenses_Mutation_Response>) => null | string,
  expenses_stddev_fields?: (data: WithTypename<Expenses_Stddev_Fields>) => null | string,
  expenses_stddev_pop_fields?: (data: WithTypename<Expenses_Stddev_Pop_Fields>) => null | string,
  expenses_stddev_samp_fields?: (data: WithTypename<Expenses_Stddev_Samp_Fields>) => null | string,
  expenses_sum_fields?: (data: WithTypename<Expenses_Sum_Fields>) => null | string,
  expenses_types?: (data: WithTypename<Expenses_Types>) => null | string,
  expenses_types_aggregate?: (data: WithTypename<Expenses_Types_Aggregate>) => null | string,
  expenses_types_aggregate_fields?: (data: WithTypename<Expenses_Types_Aggregate_Fields>) => null | string,
  expenses_types_max_fields?: (data: WithTypename<Expenses_Types_Max_Fields>) => null | string,
  expenses_types_min_fields?: (data: WithTypename<Expenses_Types_Min_Fields>) => null | string,
  expenses_types_mutation_response?: (data: WithTypename<Expenses_Types_Mutation_Response>) => null | string,
  expenses_var_pop_fields?: (data: WithTypename<Expenses_Var_Pop_Fields>) => null | string,
  expenses_var_samp_fields?: (data: WithTypename<Expenses_Var_Samp_Fields>) => null | string,
  expenses_variance_fields?: (data: WithTypename<Expenses_Variance_Fields>) => null | string,
  leases?: (data: WithTypename<Leases>) => null | string,
  leases_aggregate?: (data: WithTypename<Leases_Aggregate>) => null | string,
  leases_aggregate_fields?: (data: WithTypename<Leases_Aggregate_Fields>) => null | string,
  leases_avg_fields?: (data: WithTypename<Leases_Avg_Fields>) => null | string,
  leases_max_fields?: (data: WithTypename<Leases_Max_Fields>) => null | string,
  leases_min_fields?: (data: WithTypename<Leases_Min_Fields>) => null | string,
  leases_mutation_response?: (data: WithTypename<Leases_Mutation_Response>) => null | string,
  leases_stddev_fields?: (data: WithTypename<Leases_Stddev_Fields>) => null | string,
  leases_stddev_pop_fields?: (data: WithTypename<Leases_Stddev_Pop_Fields>) => null | string,
  leases_stddev_samp_fields?: (data: WithTypename<Leases_Stddev_Samp_Fields>) => null | string,
  leases_sum_fields?: (data: WithTypename<Leases_Sum_Fields>) => null | string,
  leases_var_pop_fields?: (data: WithTypename<Leases_Var_Pop_Fields>) => null | string,
  leases_var_samp_fields?: (data: WithTypename<Leases_Var_Samp_Fields>) => null | string,
  leases_variance_fields?: (data: WithTypename<Leases_Variance_Fields>) => null | string,
  listings?: (data: WithTypename<Listings>) => null | string,
  listings_aggregate?: (data: WithTypename<Listings_Aggregate>) => null | string,
  listings_aggregate_fields?: (data: WithTypename<Listings_Aggregate_Fields>) => null | string,
  listings_avg_fields?: (data: WithTypename<Listings_Avg_Fields>) => null | string,
  listings_max_fields?: (data: WithTypename<Listings_Max_Fields>) => null | string,
  listings_min_fields?: (data: WithTypename<Listings_Min_Fields>) => null | string,
  listings_mutation_response?: (data: WithTypename<Listings_Mutation_Response>) => null | string,
  listings_stddev_fields?: (data: WithTypename<Listings_Stddev_Fields>) => null | string,
  listings_stddev_pop_fields?: (data: WithTypename<Listings_Stddev_Pop_Fields>) => null | string,
  listings_stddev_samp_fields?: (data: WithTypename<Listings_Stddev_Samp_Fields>) => null | string,
  listings_sum_fields?: (data: WithTypename<Listings_Sum_Fields>) => null | string,
  listings_var_pop_fields?: (data: WithTypename<Listings_Var_Pop_Fields>) => null | string,
  listings_var_samp_fields?: (data: WithTypename<Listings_Var_Samp_Fields>) => null | string,
  listings_variance_fields?: (data: WithTypename<Listings_Variance_Fields>) => null | string,
  maintenance_orders?: (data: WithTypename<Maintenance_Orders>) => null | string,
  maintenance_orders_aggregate?: (data: WithTypename<Maintenance_Orders_Aggregate>) => null | string,
  maintenance_orders_aggregate_fields?: (data: WithTypename<Maintenance_Orders_Aggregate_Fields>) => null | string,
  maintenance_orders_avg_fields?: (data: WithTypename<Maintenance_Orders_Avg_Fields>) => null | string,
  maintenance_orders_max_fields?: (data: WithTypename<Maintenance_Orders_Max_Fields>) => null | string,
  maintenance_orders_min_fields?: (data: WithTypename<Maintenance_Orders_Min_Fields>) => null | string,
  maintenance_orders_mutation_response?: (data: WithTypename<Maintenance_Orders_Mutation_Response>) => null | string,
  maintenance_orders_stddev_fields?: (data: WithTypename<Maintenance_Orders_Stddev_Fields>) => null | string,
  maintenance_orders_stddev_pop_fields?: (data: WithTypename<Maintenance_Orders_Stddev_Pop_Fields>) => null | string,
  maintenance_orders_stddev_samp_fields?: (data: WithTypename<Maintenance_Orders_Stddev_Samp_Fields>) => null | string,
  maintenance_orders_sum_fields?: (data: WithTypename<Maintenance_Orders_Sum_Fields>) => null | string,
  maintenance_orders_var_pop_fields?: (data: WithTypename<Maintenance_Orders_Var_Pop_Fields>) => null | string,
  maintenance_orders_var_samp_fields?: (data: WithTypename<Maintenance_Orders_Var_Samp_Fields>) => null | string,
  maintenance_orders_variance_fields?: (data: WithTypename<Maintenance_Orders_Variance_Fields>) => null | string,
  properties?: (data: WithTypename<Properties>) => null | string,
  properties_aggregate?: (data: WithTypename<Properties_Aggregate>) => null | string,
  properties_aggregate_fields?: (data: WithTypename<Properties_Aggregate_Fields>) => null | string,
  properties_avg_fields?: (data: WithTypename<Properties_Avg_Fields>) => null | string,
  properties_max_fields?: (data: WithTypename<Properties_Max_Fields>) => null | string,
  properties_min_fields?: (data: WithTypename<Properties_Min_Fields>) => null | string,
  properties_mutation_response?: (data: WithTypename<Properties_Mutation_Response>) => null | string,
  properties_stddev_fields?: (data: WithTypename<Properties_Stddev_Fields>) => null | string,
  properties_stddev_pop_fields?: (data: WithTypename<Properties_Stddev_Pop_Fields>) => null | string,
  properties_stddev_samp_fields?: (data: WithTypename<Properties_Stddev_Samp_Fields>) => null | string,
  properties_sum_fields?: (data: WithTypename<Properties_Sum_Fields>) => null | string,
  properties_var_pop_fields?: (data: WithTypename<Properties_Var_Pop_Fields>) => null | string,
  properties_var_samp_fields?: (data: WithTypename<Properties_Var_Samp_Fields>) => null | string,
  properties_variance_fields?: (data: WithTypename<Properties_Variance_Fields>) => null | string,
  tenants?: (data: WithTypename<Tenants>) => null | string,
  tenants_aggregate?: (data: WithTypename<Tenants_Aggregate>) => null | string,
  tenants_aggregate_fields?: (data: WithTypename<Tenants_Aggregate_Fields>) => null | string,
  tenants_avg_fields?: (data: WithTypename<Tenants_Avg_Fields>) => null | string,
  tenants_max_fields?: (data: WithTypename<Tenants_Max_Fields>) => null | string,
  tenants_min_fields?: (data: WithTypename<Tenants_Min_Fields>) => null | string,
  tenants_mutation_response?: (data: WithTypename<Tenants_Mutation_Response>) => null | string,
  tenants_stddev_fields?: (data: WithTypename<Tenants_Stddev_Fields>) => null | string,
  tenants_stddev_pop_fields?: (data: WithTypename<Tenants_Stddev_Pop_Fields>) => null | string,
  tenants_stddev_samp_fields?: (data: WithTypename<Tenants_Stddev_Samp_Fields>) => null | string,
  tenants_sum_fields?: (data: WithTypename<Tenants_Sum_Fields>) => null | string,
  tenants_var_pop_fields?: (data: WithTypename<Tenants_Var_Pop_Fields>) => null | string,
  tenants_var_samp_fields?: (data: WithTypename<Tenants_Var_Samp_Fields>) => null | string,
  tenants_variance_fields?: (data: WithTypename<Tenants_Variance_Fields>) => null | string,
  transactions?: (data: WithTypename<Transactions>) => null | string,
  transactions_aggregate?: (data: WithTypename<Transactions_Aggregate>) => null | string,
  transactions_aggregate_fields?: (data: WithTypename<Transactions_Aggregate_Fields>) => null | string,
  transactions_avg_fields?: (data: WithTypename<Transactions_Avg_Fields>) => null | string,
  transactions_max_fields?: (data: WithTypename<Transactions_Max_Fields>) => null | string,
  transactions_min_fields?: (data: WithTypename<Transactions_Min_Fields>) => null | string,
  transactions_mutation_response?: (data: WithTypename<Transactions_Mutation_Response>) => null | string,
  transactions_stddev_fields?: (data: WithTypename<Transactions_Stddev_Fields>) => null | string,
  transactions_stddev_pop_fields?: (data: WithTypename<Transactions_Stddev_Pop_Fields>) => null | string,
  transactions_stddev_samp_fields?: (data: WithTypename<Transactions_Stddev_Samp_Fields>) => null | string,
  transactions_sum_fields?: (data: WithTypename<Transactions_Sum_Fields>) => null | string,
  transactions_var_pop_fields?: (data: WithTypename<Transactions_Var_Pop_Fields>) => null | string,
  transactions_var_samp_fields?: (data: WithTypename<Transactions_Var_Samp_Fields>) => null | string,
  transactions_variance_fields?: (data: WithTypename<Transactions_Variance_Fields>) => null | string,
  units?: (data: WithTypename<Units>) => null | string,
  units_aggregate?: (data: WithTypename<Units_Aggregate>) => null | string,
  units_aggregate_fields?: (data: WithTypename<Units_Aggregate_Fields>) => null | string,
  units_avg_fields?: (data: WithTypename<Units_Avg_Fields>) => null | string,
  units_max_fields?: (data: WithTypename<Units_Max_Fields>) => null | string,
  units_min_fields?: (data: WithTypename<Units_Min_Fields>) => null | string,
  units_mutation_response?: (data: WithTypename<Units_Mutation_Response>) => null | string,
  units_stddev_fields?: (data: WithTypename<Units_Stddev_Fields>) => null | string,
  units_stddev_pop_fields?: (data: WithTypename<Units_Stddev_Pop_Fields>) => null | string,
  units_stddev_samp_fields?: (data: WithTypename<Units_Stddev_Samp_Fields>) => null | string,
  units_sum_fields?: (data: WithTypename<Units_Sum_Fields>) => null | string,
  units_var_pop_fields?: (data: WithTypename<Units_Var_Pop_Fields>) => null | string,
  units_var_samp_fields?: (data: WithTypename<Units_Var_Samp_Fields>) => null | string,
  units_variance_fields?: (data: WithTypename<Units_Variance_Fields>) => null | string,
  users?: (data: WithTypename<Users>) => null | string,
  users_aggregate?: (data: WithTypename<Users_Aggregate>) => null | string,
  users_aggregate_fields?: (data: WithTypename<Users_Aggregate_Fields>) => null | string,
  users_avg_fields?: (data: WithTypename<Users_Avg_Fields>) => null | string,
  users_max_fields?: (data: WithTypename<Users_Max_Fields>) => null | string,
  users_min_fields?: (data: WithTypename<Users_Min_Fields>) => null | string,
  users_mutation_response?: (data: WithTypename<Users_Mutation_Response>) => null | string,
  users_stddev_fields?: (data: WithTypename<Users_Stddev_Fields>) => null | string,
  users_stddev_pop_fields?: (data: WithTypename<Users_Stddev_Pop_Fields>) => null | string,
  users_stddev_samp_fields?: (data: WithTypename<Users_Stddev_Samp_Fields>) => null | string,
  users_sum_fields?: (data: WithTypename<Users_Sum_Fields>) => null | string,
  users_var_pop_fields?: (data: WithTypename<Users_Var_Pop_Fields>) => null | string,
  users_var_samp_fields?: (data: WithTypename<Users_Var_Samp_Fields>) => null | string,
  users_variance_fields?: (data: WithTypename<Users_Variance_Fields>) => null | string
}

export type GraphCacheResolvers = {
  query_root?: {
    clients?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootClientsArgs, Array<WithTypename<Clients> | string>>,
    clients_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootClients_AggregateArgs, WithTypename<Clients_Aggregate> | string>,
    clients_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootClients_By_PkArgs, WithTypename<Clients> | string>,
    expenses?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    expenses_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpenses_By_PkArgs, WithTypename<Expenses> | string>,
    expenses_types?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpenses_TypesArgs, Array<WithTypename<Expenses_Types> | string>>,
    expenses_types_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpenses_Types_AggregateArgs, WithTypename<Expenses_Types_Aggregate> | string>,
    expenses_types_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootExpenses_Types_By_PkArgs, WithTypename<Expenses_Types> | string>,
    leases?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootLeasesArgs, Array<WithTypename<Leases> | string>>,
    leases_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootLeases_AggregateArgs, WithTypename<Leases_Aggregate> | string>,
    leases_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootLeases_By_PkArgs, WithTypename<Leases> | string>,
    listings?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootListingsArgs, Array<WithTypename<Listings> | string>>,
    listings_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootListings_AggregateArgs, WithTypename<Listings_Aggregate> | string>,
    listings_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootListings_By_PkArgs, WithTypename<Listings> | string>,
    maintenance_orders?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootMaintenance_OrdersArgs, Array<WithTypename<Maintenance_Orders> | string>>,
    maintenance_orders_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootMaintenance_Orders_AggregateArgs, WithTypename<Maintenance_Orders_Aggregate> | string>,
    maintenance_orders_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootMaintenance_Orders_By_PkArgs, WithTypename<Maintenance_Orders> | string>,
    properties?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootPropertiesArgs, Array<WithTypename<Properties> | string>>,
    properties_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootProperties_AggregateArgs, WithTypename<Properties_Aggregate> | string>,
    properties_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootProperties_By_PkArgs, WithTypename<Properties> | string>,
    tenants?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTenantsArgs, Array<WithTypename<Tenants> | string>>,
    tenants_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTenants_AggregateArgs, WithTypename<Tenants_Aggregate> | string>,
    tenants_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTenants_By_PkArgs, WithTypename<Tenants> | string>,
    transactions?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTransactionsArgs, Array<WithTypename<Transactions> | string>>,
    transactions_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTransactions_AggregateArgs, WithTypename<Transactions_Aggregate> | string>,
    transactions_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootTransactions_By_PkArgs, WithTypename<Transactions> | string>,
    units?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUnitsArgs, Array<WithTypename<Units> | string>>,
    units_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUnits_AggregateArgs, WithTypename<Units_Aggregate> | string>,
    units_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUnits_By_PkArgs, WithTypename<Units> | string>,
    users?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUsersArgs, Array<WithTypename<Users> | string>>,
    users_aggregate?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUsers_AggregateArgs, WithTypename<Users_Aggregate> | string>,
    users_by_pk?: GraphCacheResolver<WithTypename<Query_Root>, Query_RootUsers_By_PkArgs, WithTypename<Users> | string>
  },
  clients?: {
    civilid?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['bigint'] | string>,
    email?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    expenses?: GraphCacheResolver<WithTypename<Clients>, ClientsExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Clients>, ClientsExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    first_name?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['Int'] | string>,
    is_active?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['Boolean'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    maintenance_orders?: GraphCacheResolver<WithTypename<Clients>, ClientsMaintenance_OrdersArgs, Array<WithTypename<Maintenance_Orders> | string>>,
    maintenance_orders_aggregate?: GraphCacheResolver<WithTypename<Clients>, ClientsMaintenance_Orders_AggregateArgs, WithTypename<Maintenance_Orders_Aggregate> | string>,
    phone?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    properties?: GraphCacheResolver<WithTypename<Clients>, ClientsPropertiesArgs, Array<WithTypename<Properties> | string>>,
    properties_aggregate?: GraphCacheResolver<WithTypename<Clients>, ClientsProperties_AggregateArgs, WithTypename<Properties_Aggregate> | string>,
    second_name?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Clients>, Record<string, never>, Scalars['String'] | string>,
    users?: GraphCacheResolver<WithTypename<Clients>, ClientsUsersArgs, Array<WithTypename<Users> | string>>,
    users_aggregate?: GraphCacheResolver<WithTypename<Clients>, ClientsUsers_AggregateArgs, WithTypename<Users_Aggregate> | string>
  },
  clients_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Clients_Aggregate>, Record<string, never>, WithTypename<Clients_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Clients_Aggregate>, Record<string, never>, Array<WithTypename<Clients> | string>>
  },
  clients_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Clients_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Clients_Aggregate_Fields>, Record<string, never>, WithTypename<Clients_Variance_Fields> | string>
  },
  clients_avg_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_max_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    email?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    first_name?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    second_name?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Clients_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  clients_min_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    email?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    first_name?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    second_name?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Clients_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  clients_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Clients_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Clients_Mutation_Response>, Record<string, never>, Array<WithTypename<Clients> | string>>
  },
  clients_stddev_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_stddev_pop_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_stddev_samp_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_sum_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Sum_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  clients_var_pop_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_var_samp_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  clients_variance_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Clients_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Clients_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses?: {
    amount?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>,
    category?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Expenses_Types_Enum | string>,
    client?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, WithTypename<Clients> | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>,
    date_post?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['date'] | string>,
    expenses_type?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, WithTypename<Expenses_Types> | string>,
    id?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>,
    maintenance_order?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, WithTypename<Maintenance_Orders> | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['String'] | string>,
    property?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, WithTypename<Properties> | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>,
    unit?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, WithTypename<Units> | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses>, Record<string, never>, Scalars['Int'] | string>
  },
  expenses_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Expenses_Aggregate>, Record<string, never>, WithTypename<Expenses_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Expenses_Aggregate>, Record<string, never>, Array<WithTypename<Expenses> | string>>
  },
  expenses_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Expenses_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Expenses_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Variance_Fields> | string>
  },
  expenses_avg_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_max_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    date_post?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Max_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  expenses_min_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    date_post?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Min_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  expenses_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Expenses_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Expenses_Mutation_Response>, Record<string, never>, Array<WithTypename<Expenses> | string>>
  },
  expenses_stddev_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_stddev_pop_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_stddev_samp_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_sum_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  expenses_types?: {
    description?: GraphCacheResolver<WithTypename<Expenses_Types>, Record<string, never>, Scalars['String'] | string>,
    expenses?: GraphCacheResolver<WithTypename<Expenses_Types>, Expenses_TypesExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Expenses_Types>, Expenses_TypesExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    value?: GraphCacheResolver<WithTypename<Expenses_Types>, Record<string, never>, Scalars['String'] | string>
  },
  expenses_types_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Expenses_Types_Aggregate>, Record<string, never>, WithTypename<Expenses_Types_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Expenses_Types_Aggregate>, Record<string, never>, Array<WithTypename<Expenses_Types> | string>>
  },
  expenses_types_aggregate_fields?: {
    count?: GraphCacheResolver<WithTypename<Expenses_Types_Aggregate_Fields>, Expenses_Types_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Expenses_Types_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Types_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Expenses_Types_Aggregate_Fields>, Record<string, never>, WithTypename<Expenses_Types_Min_Fields> | string>
  },
  expenses_types_max_fields?: {
    description?: GraphCacheResolver<WithTypename<Expenses_Types_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    value?: GraphCacheResolver<WithTypename<Expenses_Types_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  expenses_types_min_fields?: {
    description?: GraphCacheResolver<WithTypename<Expenses_Types_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    value?: GraphCacheResolver<WithTypename<Expenses_Types_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  expenses_types_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Expenses_Types_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Expenses_Types_Mutation_Response>, Record<string, never>, Array<WithTypename<Expenses_Types> | string>>
  },
  expenses_var_pop_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_var_samp_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  expenses_variance_fields?: {
    amount?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    maintenance_order_id?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Expenses_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases?: {
    deposit?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Int'] | string>,
    end_date?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Int'] | string>,
    is_expired?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Boolean'] | string>,
    is_signed?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Boolean'] | string>,
    license?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['String'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Int'] | string>,
    start_date?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['date'] | string>,
    tenant?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, WithTypename<Tenants> | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Int'] | string>,
    transactions?: GraphCacheResolver<WithTypename<Leases>, LeasesTransactionsArgs, Array<WithTypename<Transactions> | string>>,
    transactions_aggregate?: GraphCacheResolver<WithTypename<Leases>, LeasesTransactions_AggregateArgs, WithTypename<Transactions_Aggregate> | string>,
    unit?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, WithTypename<Units> | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases>, Record<string, never>, Scalars['Int'] | string>
  },
  leases_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Leases_Aggregate>, Record<string, never>, WithTypename<Leases_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Leases_Aggregate>, Record<string, never>, Array<WithTypename<Leases> | string>>
  },
  leases_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Leases_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Leases_Aggregate_Fields>, Record<string, never>, WithTypename<Leases_Variance_Fields> | string>
  },
  leases_avg_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_max_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    end_date?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    license?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    start_date?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Max_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  leases_min_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    end_date?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    license?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    start_date?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Min_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  leases_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Leases_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Leases_Mutation_Response>, Record<string, never>, Array<WithTypename<Leases> | string>>
  },
  leases_stddev_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_stddev_pop_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_stddev_samp_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_sum_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  leases_var_pop_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_var_samp_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  leases_variance_fields?: {
    deposit?: GraphCacheResolver<WithTypename<Leases_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Leases_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    monthly_rent?: GraphCacheResolver<WithTypename<Leases_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Leases_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Leases_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings?: {
    available_on?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['date'] | string>,
    description?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['Int'] | string>,
    is_active?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['Boolean'] | string>,
    lease_length?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['String'] | string>,
    unit?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, WithTypename<Units> | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings>, Record<string, never>, Scalars['Int'] | string>
  },
  listings_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Listings_Aggregate>, Record<string, never>, WithTypename<Listings_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Listings_Aggregate>, Record<string, never>, Array<WithTypename<Listings> | string>>
  },
  listings_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Listings_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Listings_Aggregate_Fields>, Record<string, never>, WithTypename<Listings_Variance_Fields> | string>
  },
  listings_avg_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_max_fields?: {
    available_on?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    description?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    lease_length?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Max_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  listings_min_fields?: {
    available_on?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    description?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    lease_length?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Min_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  listings_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Listings_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Listings_Mutation_Response>, Record<string, never>, Array<WithTypename<Listings> | string>>
  },
  listings_stddev_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_stddev_pop_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_stddev_samp_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_sum_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  listings_var_pop_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_var_samp_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  listings_variance_fields?: {
    id?: GraphCacheResolver<WithTypename<Listings_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Listings_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders?: {
    client?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, WithTypename<Clients> | string>,
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['Int'] | string>,
    completed_at?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['timestamptz'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['timestamptz'] | string>,
    description?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['String'] | string>,
    expenses?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Maintenance_OrdersExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Maintenance_OrdersExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['Int'] | string>,
    property?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, WithTypename<Properties> | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['Int'] | string>,
    status?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['String'] | string>,
    tenant?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, WithTypename<Tenants> | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['Int'] | string>,
    title?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['String'] | string>,
    unit?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, WithTypename<Units> | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders>, Record<string, never>, Scalars['Int'] | string>
  },
  maintenance_orders_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate>, Record<string, never>, WithTypename<Maintenance_Orders_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate>, Record<string, never>, Array<WithTypename<Maintenance_Orders> | string>>
  },
  maintenance_orders_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Maintenance_Orders_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Maintenance_Orders_Aggregate_Fields>, Record<string, never>, WithTypename<Maintenance_Orders_Variance_Fields> | string>
  },
  maintenance_orders_avg_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_max_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    completed_at?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    description?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    status?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    title?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Max_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  maintenance_orders_min_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    completed_at?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    description?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    status?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    title?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Min_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  maintenance_orders_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Maintenance_Orders_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Maintenance_Orders_Mutation_Response>, Record<string, never>, Array<WithTypename<Maintenance_Orders> | string>>
  },
  maintenance_orders_stddev_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_stddev_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_stddev_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_sum_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  maintenance_orders_var_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_var_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  maintenance_orders_variance_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    unit_id?: GraphCacheResolver<WithTypename<Maintenance_Orders_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties?: {
    area?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['String'] | string>,
    avenue?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['String'] | string>,
    block?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['String'] | string>,
    client?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, WithTypename<Clients> | string>,
    client_id?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['Int'] | string>,
    coordinates?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['point'] | string>,
    expenses?: GraphCacheResolver<WithTypename<Properties>, PropertiesExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Properties>, PropertiesExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    id?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['Int'] | string>,
    maintenance_orders?: GraphCacheResolver<WithTypename<Properties>, PropertiesMaintenance_OrdersArgs, Array<WithTypename<Maintenance_Orders> | string>>,
    maintenance_orders_aggregate?: GraphCacheResolver<WithTypename<Properties>, PropertiesMaintenance_Orders_AggregateArgs, WithTypename<Maintenance_Orders_Aggregate> | string>,
    number?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['String'] | string>,
    street?: GraphCacheResolver<WithTypename<Properties>, Record<string, never>, Scalars['String'] | string>,
    units?: GraphCacheResolver<WithTypename<Properties>, PropertiesUnitsArgs, Array<WithTypename<Units> | string>>,
    units_aggregate?: GraphCacheResolver<WithTypename<Properties>, PropertiesUnits_AggregateArgs, WithTypename<Units_Aggregate> | string>
  },
  properties_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Properties_Aggregate>, Record<string, never>, WithTypename<Properties_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Properties_Aggregate>, Record<string, never>, Array<WithTypename<Properties> | string>>
  },
  properties_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Properties_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Properties_Aggregate_Fields>, Record<string, never>, WithTypename<Properties_Variance_Fields> | string>
  },
  properties_avg_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_max_fields?: {
    area?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    avenue?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    block?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    number?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    street?: GraphCacheResolver<WithTypename<Properties_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  properties_min_fields?: {
    area?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    avenue?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    block?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    client_id?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    number?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    street?: GraphCacheResolver<WithTypename<Properties_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  properties_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Properties_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Properties_Mutation_Response>, Record<string, never>, Array<WithTypename<Properties> | string>>
  },
  properties_stddev_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_stddev_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_stddev_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_sum_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  properties_var_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_var_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  properties_variance_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Properties_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Properties_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['bigint'] | string>,
    dob?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    first_name?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['Int'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    leases?: GraphCacheResolver<WithTypename<Tenants>, TenantsLeasesArgs, Array<WithTypename<Leases> | string>>,
    leases_aggregate?: GraphCacheResolver<WithTypename<Tenants>, TenantsLeases_AggregateArgs, WithTypename<Leases_Aggregate> | string>,
    maintenance_orders?: GraphCacheResolver<WithTypename<Tenants>, TenantsMaintenance_OrdersArgs, Array<WithTypename<Maintenance_Orders> | string>>,
    maintenance_orders_aggregate?: GraphCacheResolver<WithTypename<Tenants>, TenantsMaintenance_Orders_AggregateArgs, WithTypename<Maintenance_Orders_Aggregate> | string>,
    phone?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    second_name?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<Tenants>, Record<string, never>, WithTypename<Users> | string>
  },
  tenants_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Tenants_Aggregate>, Record<string, never>, WithTypename<Tenants_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Tenants_Aggregate>, Record<string, never>, Array<WithTypename<Tenants> | string>>
  },
  tenants_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Tenants_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Tenants_Aggregate_Fields>, Record<string, never>, WithTypename<Tenants_Variance_Fields> | string>
  },
  tenants_avg_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_max_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    dob?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    first_name?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    second_name?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Tenants_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  tenants_min_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    dob?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    first_name?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_name?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    second_name?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    third_name?: GraphCacheResolver<WithTypename<Tenants_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  tenants_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Tenants_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Tenants_Mutation_Response>, Record<string, never>, Array<WithTypename<Tenants> | string>>
  },
  tenants_stddev_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_stddev_pop_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_stddev_samp_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_sum_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Sum_Fields>, Record<string, never>, Scalars['bigint'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  tenants_var_pop_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_var_samp_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  tenants_variance_fields?: {
    civilid?: GraphCacheResolver<WithTypename<Tenants_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Tenants_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions?: {
    amount?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['timestamptz'] | string>,
    due_date?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['Int'] | string>,
    is_paid?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['Boolean'] | string>,
    lease?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, WithTypename<Leases> | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['String'] | string>,
    receipt_url?: GraphCacheResolver<WithTypename<Transactions>, Record<string, never>, Scalars['String'] | string>
  },
  transactions_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Transactions_Aggregate>, Record<string, never>, WithTypename<Transactions_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Transactions_Aggregate>, Record<string, never>, Array<WithTypename<Transactions> | string>>
  },
  transactions_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Transactions_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Transactions_Aggregate_Fields>, Record<string, never>, WithTypename<Transactions_Variance_Fields> | string>
  },
  transactions_avg_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_max_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    due_date?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    receipt_url?: GraphCacheResolver<WithTypename<Transactions_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  transactions_min_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    due_date?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    memo?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    receipt_url?: GraphCacheResolver<WithTypename<Transactions_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  transactions_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Transactions_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Transactions_Mutation_Response>, Record<string, never>, Array<WithTypename<Transactions> | string>>
  },
  transactions_stddev_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_stddev_pop_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_stddev_samp_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_sum_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  transactions_var_pop_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_var_samp_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  transactions_variance_fields?: {
    amount?: GraphCacheResolver<WithTypename<Transactions_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Transactions_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    lease_id?: GraphCacheResolver<WithTypename<Transactions_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units?: {
    bath?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['numeric'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['numeric'] | string>,
    client_id_s?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Int'] | string>,
    expenses?: GraphCacheResolver<WithTypename<Units>, UnitsExpensesArgs, Array<WithTypename<Expenses> | string>>,
    expenses_aggregate?: GraphCacheResolver<WithTypename<Units>, UnitsExpenses_AggregateArgs, WithTypename<Expenses_Aggregate> | string>,
    floor?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Int'] | string>,
    is_vacant?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Boolean'] | string>,
    leases?: GraphCacheResolver<WithTypename<Units>, UnitsLeasesArgs, Array<WithTypename<Leases> | string>>,
    leases_aggregate?: GraphCacheResolver<WithTypename<Units>, UnitsLeases_AggregateArgs, WithTypename<Leases_Aggregate> | string>,
    listings?: GraphCacheResolver<WithTypename<Units>, UnitsListingsArgs, Array<WithTypename<Listings> | string>>,
    listings_aggregate?: GraphCacheResolver<WithTypename<Units>, UnitsListings_AggregateArgs, WithTypename<Listings_Aggregate> | string>,
    maintenance_orders?: GraphCacheResolver<WithTypename<Units>, UnitsMaintenance_OrdersArgs, Array<WithTypename<Maintenance_Orders> | string>>,
    maintenance_orders_aggregate?: GraphCacheResolver<WithTypename<Units>, UnitsMaintenance_Orders_AggregateArgs, WithTypename<Maintenance_Orders_Aggregate> | string>,
    property?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, WithTypename<Properties> | string>,
    property_id?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Int'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Int'] | string>,
    size?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['Int'] | string>,
    type?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['String'] | string>,
    unit_number?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['String'] | string>,
    usage?: GraphCacheResolver<WithTypename<Units>, Record<string, never>, Scalars['String'] | string>
  },
  units_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Units_Aggregate>, Record<string, never>, WithTypename<Units_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Units_Aggregate>, Record<string, never>, Array<WithTypename<Units> | string>>
  },
  units_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Units_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Units_Aggregate_Fields>, Record<string, never>, WithTypename<Units_Variance_Fields> | string>
  },
  units_avg_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_max_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    floor?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    type?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_number?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    usage?: GraphCacheResolver<WithTypename<Units_Max_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  units_min_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    floor?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    type?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    unit_number?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    usage?: GraphCacheResolver<WithTypename<Units_Min_Fields>, Record<string, never>, Scalars['String'] | string>
  },
  units_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Units_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Units_Mutation_Response>, Record<string, never>, Array<WithTypename<Units> | string>>
  },
  units_stddev_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_stddev_pop_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_stddev_samp_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_sum_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['numeric'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  units_var_pop_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_var_samp_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  units_variance_fields?: {
    bath?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    bed?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    property_id?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    rent_market?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    size?: GraphCacheResolver<WithTypename<Units_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users?: {
    client?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, WithTypename<Clients> | string>,
    client_id?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['Int'] | string>,
    last_seen?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['timestamptz'] | string>,
    phone?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['String'] | string>,
    tenant?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, WithTypename<Tenants> | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users>, Record<string, never>, Scalars['Int'] | string>
  },
  users_aggregate?: {
    aggregate?: GraphCacheResolver<WithTypename<Users_Aggregate>, Record<string, never>, WithTypename<Users_Aggregate_Fields> | string>,
    nodes?: GraphCacheResolver<WithTypename<Users_Aggregate>, Record<string, never>, Array<WithTypename<Users> | string>>
  },
  users_aggregate_fields?: {
    avg?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Avg_Fields> | string>,
    count?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Users_Aggregate_FieldsCountArgs, Scalars['Int'] | string>,
    max?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Max_Fields> | string>,
    min?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Min_Fields> | string>,
    stddev?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Stddev_Fields> | string>,
    stddev_pop?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Stddev_Pop_Fields> | string>,
    stddev_samp?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Stddev_Samp_Fields> | string>,
    sum?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Sum_Fields> | string>,
    var_pop?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Var_Pop_Fields> | string>,
    var_samp?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Var_Samp_Fields> | string>,
    variance?: GraphCacheResolver<WithTypename<Users_Aggregate_Fields>, Record<string, never>, WithTypename<Users_Variance_Fields> | string>
  },
  users_avg_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Avg_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_max_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_seen?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    phone?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['String'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Max_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  users_min_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    created_at?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['date'] | string>,
    email?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['Int'] | string>,
    last_seen?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['timestamptz'] | string>,
    phone?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['String'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Min_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  users_mutation_response?: {
    affected_rows?: GraphCacheResolver<WithTypename<Users_Mutation_Response>, Record<string, never>, Scalars['Int'] | string>,
    returning?: GraphCacheResolver<WithTypename<Users_Mutation_Response>, Record<string, never>, Array<WithTypename<Users> | string>>
  },
  users_stddev_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Stddev_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_stddev_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Stddev_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_stddev_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Stddev_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_sum_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Sum_Fields>, Record<string, never>, Scalars['Int'] | string>
  },
  users_var_pop_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Var_Pop_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_var_samp_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Var_Samp_Fields>, Record<string, never>, Scalars['Float'] | string>
  },
  users_variance_fields?: {
    client_id?: GraphCacheResolver<WithTypename<Users_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    id?: GraphCacheResolver<WithTypename<Users_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>,
    tenant_id?: GraphCacheResolver<WithTypename<Users_Variance_Fields>, Record<string, never>, Scalars['Float'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  delete_clients?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_ClientsArgs, Maybe<WithTypename<Clients_Mutation_Response>>>,
  delete_clients_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Clients_By_PkArgs, Maybe<WithTypename<Clients>>>,
  delete_expenses?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_ExpensesArgs, Maybe<WithTypename<Expenses_Mutation_Response>>>,
  delete_expenses_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Expenses_By_PkArgs, Maybe<WithTypename<Expenses>>>,
  delete_expenses_types?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Expenses_TypesArgs, Maybe<WithTypename<Expenses_Types_Mutation_Response>>>,
  delete_expenses_types_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Expenses_Types_By_PkArgs, Maybe<WithTypename<Expenses_Types>>>,
  delete_leases?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_LeasesArgs, Maybe<WithTypename<Leases_Mutation_Response>>>,
  delete_leases_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Leases_By_PkArgs, Maybe<WithTypename<Leases>>>,
  delete_listings?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_ListingsArgs, Maybe<WithTypename<Listings_Mutation_Response>>>,
  delete_listings_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Listings_By_PkArgs, Maybe<WithTypename<Listings>>>,
  delete_maintenance_orders?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Maintenance_OrdersArgs, Maybe<WithTypename<Maintenance_Orders_Mutation_Response>>>,
  delete_maintenance_orders_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Maintenance_Orders_By_PkArgs, Maybe<WithTypename<Maintenance_Orders>>>,
  delete_properties?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_PropertiesArgs, Maybe<WithTypename<Properties_Mutation_Response>>>,
  delete_properties_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Properties_By_PkArgs, Maybe<WithTypename<Properties>>>,
  delete_tenants?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_TenantsArgs, Maybe<WithTypename<Tenants_Mutation_Response>>>,
  delete_tenants_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Tenants_By_PkArgs, Maybe<WithTypename<Tenants>>>,
  delete_transactions?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_TransactionsArgs, Maybe<WithTypename<Transactions_Mutation_Response>>>,
  delete_transactions_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Transactions_By_PkArgs, Maybe<WithTypename<Transactions>>>,
  delete_units?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_UnitsArgs, Maybe<WithTypename<Units_Mutation_Response>>>,
  delete_units_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Units_By_PkArgs, Maybe<WithTypename<Units>>>,
  delete_users?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_UsersArgs, Maybe<WithTypename<Users_Mutation_Response>>>,
  delete_users_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootDelete_Users_By_PkArgs, Maybe<WithTypename<Users>>>,
  insert_clients?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_ClientsArgs, Maybe<WithTypename<Clients_Mutation_Response>>>,
  insert_clients_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Clients_OneArgs, Maybe<WithTypename<Clients>>>,
  insert_expenses?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_ExpensesArgs, Maybe<WithTypename<Expenses_Mutation_Response>>>,
  insert_expenses_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Expenses_OneArgs, Maybe<WithTypename<Expenses>>>,
  insert_expenses_types?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Expenses_TypesArgs, Maybe<WithTypename<Expenses_Types_Mutation_Response>>>,
  insert_expenses_types_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Expenses_Types_OneArgs, Maybe<WithTypename<Expenses_Types>>>,
  insert_leases?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_LeasesArgs, Maybe<WithTypename<Leases_Mutation_Response>>>,
  insert_leases_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Leases_OneArgs, Maybe<WithTypename<Leases>>>,
  insert_listings?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_ListingsArgs, Maybe<WithTypename<Listings_Mutation_Response>>>,
  insert_listings_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Listings_OneArgs, Maybe<WithTypename<Listings>>>,
  insert_maintenance_orders?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Maintenance_OrdersArgs, Maybe<WithTypename<Maintenance_Orders_Mutation_Response>>>,
  insert_maintenance_orders_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Maintenance_Orders_OneArgs, Maybe<WithTypename<Maintenance_Orders>>>,
  insert_properties?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_PropertiesArgs, Maybe<WithTypename<Properties_Mutation_Response>>>,
  insert_properties_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Properties_OneArgs, Maybe<WithTypename<Properties>>>,
  insert_tenants?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_TenantsArgs, Maybe<WithTypename<Tenants_Mutation_Response>>>,
  insert_tenants_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Tenants_OneArgs, Maybe<WithTypename<Tenants>>>,
  insert_transactions?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_TransactionsArgs, Maybe<WithTypename<Transactions_Mutation_Response>>>,
  insert_transactions_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Transactions_OneArgs, Maybe<WithTypename<Transactions>>>,
  insert_units?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_UnitsArgs, Maybe<WithTypename<Units_Mutation_Response>>>,
  insert_units_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Units_OneArgs, Maybe<WithTypename<Units>>>,
  insert_users?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_UsersArgs, Maybe<WithTypename<Users_Mutation_Response>>>,
  insert_users_one?: GraphCacheOptimisticMutationResolver<Mutation_RootInsert_Users_OneArgs, Maybe<WithTypename<Users>>>,
  update_clients?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_ClientsArgs, Maybe<WithTypename<Clients_Mutation_Response>>>,
  update_clients_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Clients_By_PkArgs, Maybe<WithTypename<Clients>>>,
  update_expenses?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_ExpensesArgs, Maybe<WithTypename<Expenses_Mutation_Response>>>,
  update_expenses_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Expenses_By_PkArgs, Maybe<WithTypename<Expenses>>>,
  update_expenses_types?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Expenses_TypesArgs, Maybe<WithTypename<Expenses_Types_Mutation_Response>>>,
  update_expenses_types_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Expenses_Types_By_PkArgs, Maybe<WithTypename<Expenses_Types>>>,
  update_leases?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_LeasesArgs, Maybe<WithTypename<Leases_Mutation_Response>>>,
  update_leases_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Leases_By_PkArgs, Maybe<WithTypename<Leases>>>,
  update_listings?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_ListingsArgs, Maybe<WithTypename<Listings_Mutation_Response>>>,
  update_listings_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Listings_By_PkArgs, Maybe<WithTypename<Listings>>>,
  update_maintenance_orders?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Maintenance_OrdersArgs, Maybe<WithTypename<Maintenance_Orders_Mutation_Response>>>,
  update_maintenance_orders_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Maintenance_Orders_By_PkArgs, Maybe<WithTypename<Maintenance_Orders>>>,
  update_properties?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_PropertiesArgs, Maybe<WithTypename<Properties_Mutation_Response>>>,
  update_properties_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Properties_By_PkArgs, Maybe<WithTypename<Properties>>>,
  update_tenants?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_TenantsArgs, Maybe<WithTypename<Tenants_Mutation_Response>>>,
  update_tenants_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Tenants_By_PkArgs, Maybe<WithTypename<Tenants>>>,
  update_transactions?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_TransactionsArgs, Maybe<WithTypename<Transactions_Mutation_Response>>>,
  update_transactions_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Transactions_By_PkArgs, Maybe<WithTypename<Transactions>>>,
  update_units?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_UnitsArgs, Maybe<WithTypename<Units_Mutation_Response>>>,
  update_units_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Units_By_PkArgs, Maybe<WithTypename<Units>>>,
  update_users?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_UsersArgs, Maybe<WithTypename<Users_Mutation_Response>>>,
  update_users_by_pk?: GraphCacheOptimisticMutationResolver<Mutation_RootUpdate_Users_By_PkArgs, Maybe<WithTypename<Users>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    delete_clients?: GraphCacheUpdateResolver<{ delete_clients: Maybe<WithTypename<Clients_Mutation_Response>> }, Mutation_RootDelete_ClientsArgs>,
    delete_clients_by_pk?: GraphCacheUpdateResolver<{ delete_clients_by_pk: Maybe<WithTypename<Clients>> }, Mutation_RootDelete_Clients_By_PkArgs>,
    delete_expenses?: GraphCacheUpdateResolver<{ delete_expenses: Maybe<WithTypename<Expenses_Mutation_Response>> }, Mutation_RootDelete_ExpensesArgs>,
    delete_expenses_by_pk?: GraphCacheUpdateResolver<{ delete_expenses_by_pk: Maybe<WithTypename<Expenses>> }, Mutation_RootDelete_Expenses_By_PkArgs>,
    delete_expenses_types?: GraphCacheUpdateResolver<{ delete_expenses_types: Maybe<WithTypename<Expenses_Types_Mutation_Response>> }, Mutation_RootDelete_Expenses_TypesArgs>,
    delete_expenses_types_by_pk?: GraphCacheUpdateResolver<{ delete_expenses_types_by_pk: Maybe<WithTypename<Expenses_Types>> }, Mutation_RootDelete_Expenses_Types_By_PkArgs>,
    delete_leases?: GraphCacheUpdateResolver<{ delete_leases: Maybe<WithTypename<Leases_Mutation_Response>> }, Mutation_RootDelete_LeasesArgs>,
    delete_leases_by_pk?: GraphCacheUpdateResolver<{ delete_leases_by_pk: Maybe<WithTypename<Leases>> }, Mutation_RootDelete_Leases_By_PkArgs>,
    delete_listings?: GraphCacheUpdateResolver<{ delete_listings: Maybe<WithTypename<Listings_Mutation_Response>> }, Mutation_RootDelete_ListingsArgs>,
    delete_listings_by_pk?: GraphCacheUpdateResolver<{ delete_listings_by_pk: Maybe<WithTypename<Listings>> }, Mutation_RootDelete_Listings_By_PkArgs>,
    delete_maintenance_orders?: GraphCacheUpdateResolver<{ delete_maintenance_orders: Maybe<WithTypename<Maintenance_Orders_Mutation_Response>> }, Mutation_RootDelete_Maintenance_OrdersArgs>,
    delete_maintenance_orders_by_pk?: GraphCacheUpdateResolver<{ delete_maintenance_orders_by_pk: Maybe<WithTypename<Maintenance_Orders>> }, Mutation_RootDelete_Maintenance_Orders_By_PkArgs>,
    delete_properties?: GraphCacheUpdateResolver<{ delete_properties: Maybe<WithTypename<Properties_Mutation_Response>> }, Mutation_RootDelete_PropertiesArgs>,
    delete_properties_by_pk?: GraphCacheUpdateResolver<{ delete_properties_by_pk: Maybe<WithTypename<Properties>> }, Mutation_RootDelete_Properties_By_PkArgs>,
    delete_tenants?: GraphCacheUpdateResolver<{ delete_tenants: Maybe<WithTypename<Tenants_Mutation_Response>> }, Mutation_RootDelete_TenantsArgs>,
    delete_tenants_by_pk?: GraphCacheUpdateResolver<{ delete_tenants_by_pk: Maybe<WithTypename<Tenants>> }, Mutation_RootDelete_Tenants_By_PkArgs>,
    delete_transactions?: GraphCacheUpdateResolver<{ delete_transactions: Maybe<WithTypename<Transactions_Mutation_Response>> }, Mutation_RootDelete_TransactionsArgs>,
    delete_transactions_by_pk?: GraphCacheUpdateResolver<{ delete_transactions_by_pk: Maybe<WithTypename<Transactions>> }, Mutation_RootDelete_Transactions_By_PkArgs>,
    delete_units?: GraphCacheUpdateResolver<{ delete_units: Maybe<WithTypename<Units_Mutation_Response>> }, Mutation_RootDelete_UnitsArgs>,
    delete_units_by_pk?: GraphCacheUpdateResolver<{ delete_units_by_pk: Maybe<WithTypename<Units>> }, Mutation_RootDelete_Units_By_PkArgs>,
    delete_users?: GraphCacheUpdateResolver<{ delete_users: Maybe<WithTypename<Users_Mutation_Response>> }, Mutation_RootDelete_UsersArgs>,
    delete_users_by_pk?: GraphCacheUpdateResolver<{ delete_users_by_pk: Maybe<WithTypename<Users>> }, Mutation_RootDelete_Users_By_PkArgs>,
    insert_clients?: GraphCacheUpdateResolver<{ insert_clients: Maybe<WithTypename<Clients_Mutation_Response>> }, Mutation_RootInsert_ClientsArgs>,
    insert_clients_one?: GraphCacheUpdateResolver<{ insert_clients_one: Maybe<WithTypename<Clients>> }, Mutation_RootInsert_Clients_OneArgs>,
    insert_expenses?: GraphCacheUpdateResolver<{ insert_expenses: Maybe<WithTypename<Expenses_Mutation_Response>> }, Mutation_RootInsert_ExpensesArgs>,
    insert_expenses_one?: GraphCacheUpdateResolver<{ insert_expenses_one: Maybe<WithTypename<Expenses>> }, Mutation_RootInsert_Expenses_OneArgs>,
    insert_expenses_types?: GraphCacheUpdateResolver<{ insert_expenses_types: Maybe<WithTypename<Expenses_Types_Mutation_Response>> }, Mutation_RootInsert_Expenses_TypesArgs>,
    insert_expenses_types_one?: GraphCacheUpdateResolver<{ insert_expenses_types_one: Maybe<WithTypename<Expenses_Types>> }, Mutation_RootInsert_Expenses_Types_OneArgs>,
    insert_leases?: GraphCacheUpdateResolver<{ insert_leases: Maybe<WithTypename<Leases_Mutation_Response>> }, Mutation_RootInsert_LeasesArgs>,
    insert_leases_one?: GraphCacheUpdateResolver<{ insert_leases_one: Maybe<WithTypename<Leases>> }, Mutation_RootInsert_Leases_OneArgs>,
    insert_listings?: GraphCacheUpdateResolver<{ insert_listings: Maybe<WithTypename<Listings_Mutation_Response>> }, Mutation_RootInsert_ListingsArgs>,
    insert_listings_one?: GraphCacheUpdateResolver<{ insert_listings_one: Maybe<WithTypename<Listings>> }, Mutation_RootInsert_Listings_OneArgs>,
    insert_maintenance_orders?: GraphCacheUpdateResolver<{ insert_maintenance_orders: Maybe<WithTypename<Maintenance_Orders_Mutation_Response>> }, Mutation_RootInsert_Maintenance_OrdersArgs>,
    insert_maintenance_orders_one?: GraphCacheUpdateResolver<{ insert_maintenance_orders_one: Maybe<WithTypename<Maintenance_Orders>> }, Mutation_RootInsert_Maintenance_Orders_OneArgs>,
    insert_properties?: GraphCacheUpdateResolver<{ insert_properties: Maybe<WithTypename<Properties_Mutation_Response>> }, Mutation_RootInsert_PropertiesArgs>,
    insert_properties_one?: GraphCacheUpdateResolver<{ insert_properties_one: Maybe<WithTypename<Properties>> }, Mutation_RootInsert_Properties_OneArgs>,
    insert_tenants?: GraphCacheUpdateResolver<{ insert_tenants: Maybe<WithTypename<Tenants_Mutation_Response>> }, Mutation_RootInsert_TenantsArgs>,
    insert_tenants_one?: GraphCacheUpdateResolver<{ insert_tenants_one: Maybe<WithTypename<Tenants>> }, Mutation_RootInsert_Tenants_OneArgs>,
    insert_transactions?: GraphCacheUpdateResolver<{ insert_transactions: Maybe<WithTypename<Transactions_Mutation_Response>> }, Mutation_RootInsert_TransactionsArgs>,
    insert_transactions_one?: GraphCacheUpdateResolver<{ insert_transactions_one: Maybe<WithTypename<Transactions>> }, Mutation_RootInsert_Transactions_OneArgs>,
    insert_units?: GraphCacheUpdateResolver<{ insert_units: Maybe<WithTypename<Units_Mutation_Response>> }, Mutation_RootInsert_UnitsArgs>,
    insert_units_one?: GraphCacheUpdateResolver<{ insert_units_one: Maybe<WithTypename<Units>> }, Mutation_RootInsert_Units_OneArgs>,
    insert_users?: GraphCacheUpdateResolver<{ insert_users: Maybe<WithTypename<Users_Mutation_Response>> }, Mutation_RootInsert_UsersArgs>,
    insert_users_one?: GraphCacheUpdateResolver<{ insert_users_one: Maybe<WithTypename<Users>> }, Mutation_RootInsert_Users_OneArgs>,
    update_clients?: GraphCacheUpdateResolver<{ update_clients: Maybe<WithTypename<Clients_Mutation_Response>> }, Mutation_RootUpdate_ClientsArgs>,
    update_clients_by_pk?: GraphCacheUpdateResolver<{ update_clients_by_pk: Maybe<WithTypename<Clients>> }, Mutation_RootUpdate_Clients_By_PkArgs>,
    update_expenses?: GraphCacheUpdateResolver<{ update_expenses: Maybe<WithTypename<Expenses_Mutation_Response>> }, Mutation_RootUpdate_ExpensesArgs>,
    update_expenses_by_pk?: GraphCacheUpdateResolver<{ update_expenses_by_pk: Maybe<WithTypename<Expenses>> }, Mutation_RootUpdate_Expenses_By_PkArgs>,
    update_expenses_types?: GraphCacheUpdateResolver<{ update_expenses_types: Maybe<WithTypename<Expenses_Types_Mutation_Response>> }, Mutation_RootUpdate_Expenses_TypesArgs>,
    update_expenses_types_by_pk?: GraphCacheUpdateResolver<{ update_expenses_types_by_pk: Maybe<WithTypename<Expenses_Types>> }, Mutation_RootUpdate_Expenses_Types_By_PkArgs>,
    update_leases?: GraphCacheUpdateResolver<{ update_leases: Maybe<WithTypename<Leases_Mutation_Response>> }, Mutation_RootUpdate_LeasesArgs>,
    update_leases_by_pk?: GraphCacheUpdateResolver<{ update_leases_by_pk: Maybe<WithTypename<Leases>> }, Mutation_RootUpdate_Leases_By_PkArgs>,
    update_listings?: GraphCacheUpdateResolver<{ update_listings: Maybe<WithTypename<Listings_Mutation_Response>> }, Mutation_RootUpdate_ListingsArgs>,
    update_listings_by_pk?: GraphCacheUpdateResolver<{ update_listings_by_pk: Maybe<WithTypename<Listings>> }, Mutation_RootUpdate_Listings_By_PkArgs>,
    update_maintenance_orders?: GraphCacheUpdateResolver<{ update_maintenance_orders: Maybe<WithTypename<Maintenance_Orders_Mutation_Response>> }, Mutation_RootUpdate_Maintenance_OrdersArgs>,
    update_maintenance_orders_by_pk?: GraphCacheUpdateResolver<{ update_maintenance_orders_by_pk: Maybe<WithTypename<Maintenance_Orders>> }, Mutation_RootUpdate_Maintenance_Orders_By_PkArgs>,
    update_properties?: GraphCacheUpdateResolver<{ update_properties: Maybe<WithTypename<Properties_Mutation_Response>> }, Mutation_RootUpdate_PropertiesArgs>,
    update_properties_by_pk?: GraphCacheUpdateResolver<{ update_properties_by_pk: Maybe<WithTypename<Properties>> }, Mutation_RootUpdate_Properties_By_PkArgs>,
    update_tenants?: GraphCacheUpdateResolver<{ update_tenants: Maybe<WithTypename<Tenants_Mutation_Response>> }, Mutation_RootUpdate_TenantsArgs>,
    update_tenants_by_pk?: GraphCacheUpdateResolver<{ update_tenants_by_pk: Maybe<WithTypename<Tenants>> }, Mutation_RootUpdate_Tenants_By_PkArgs>,
    update_transactions?: GraphCacheUpdateResolver<{ update_transactions: Maybe<WithTypename<Transactions_Mutation_Response>> }, Mutation_RootUpdate_TransactionsArgs>,
    update_transactions_by_pk?: GraphCacheUpdateResolver<{ update_transactions_by_pk: Maybe<WithTypename<Transactions>> }, Mutation_RootUpdate_Transactions_By_PkArgs>,
    update_units?: GraphCacheUpdateResolver<{ update_units: Maybe<WithTypename<Units_Mutation_Response>> }, Mutation_RootUpdate_UnitsArgs>,
    update_units_by_pk?: GraphCacheUpdateResolver<{ update_units_by_pk: Maybe<WithTypename<Units>> }, Mutation_RootUpdate_Units_By_PkArgs>,
    update_users?: GraphCacheUpdateResolver<{ update_users: Maybe<WithTypename<Users_Mutation_Response>> }, Mutation_RootUpdate_UsersArgs>,
    update_users_by_pk?: GraphCacheUpdateResolver<{ update_users_by_pk: Maybe<WithTypename<Users>> }, Mutation_RootUpdate_Users_By_PkArgs>
  },
  Subscription?: {
    clients?: GraphCacheUpdateResolver<{ clients: Array<WithTypename<Clients>> }, Subscription_RootClientsArgs>,
    clients_aggregate?: GraphCacheUpdateResolver<{ clients_aggregate: WithTypename<Clients_Aggregate> }, Subscription_RootClients_AggregateArgs>,
    clients_by_pk?: GraphCacheUpdateResolver<{ clients_by_pk: Maybe<WithTypename<Clients>> }, Subscription_RootClients_By_PkArgs>,
    expenses?: GraphCacheUpdateResolver<{ expenses: Array<WithTypename<Expenses>> }, Subscription_RootExpensesArgs>,
    expenses_aggregate?: GraphCacheUpdateResolver<{ expenses_aggregate: WithTypename<Expenses_Aggregate> }, Subscription_RootExpenses_AggregateArgs>,
    expenses_by_pk?: GraphCacheUpdateResolver<{ expenses_by_pk: Maybe<WithTypename<Expenses>> }, Subscription_RootExpenses_By_PkArgs>,
    expenses_types?: GraphCacheUpdateResolver<{ expenses_types: Array<WithTypename<Expenses_Types>> }, Subscription_RootExpenses_TypesArgs>,
    expenses_types_aggregate?: GraphCacheUpdateResolver<{ expenses_types_aggregate: WithTypename<Expenses_Types_Aggregate> }, Subscription_RootExpenses_Types_AggregateArgs>,
    expenses_types_by_pk?: GraphCacheUpdateResolver<{ expenses_types_by_pk: Maybe<WithTypename<Expenses_Types>> }, Subscription_RootExpenses_Types_By_PkArgs>,
    leases?: GraphCacheUpdateResolver<{ leases: Array<WithTypename<Leases>> }, Subscription_RootLeasesArgs>,
    leases_aggregate?: GraphCacheUpdateResolver<{ leases_aggregate: WithTypename<Leases_Aggregate> }, Subscription_RootLeases_AggregateArgs>,
    leases_by_pk?: GraphCacheUpdateResolver<{ leases_by_pk: Maybe<WithTypename<Leases>> }, Subscription_RootLeases_By_PkArgs>,
    listings?: GraphCacheUpdateResolver<{ listings: Array<WithTypename<Listings>> }, Subscription_RootListingsArgs>,
    listings_aggregate?: GraphCacheUpdateResolver<{ listings_aggregate: WithTypename<Listings_Aggregate> }, Subscription_RootListings_AggregateArgs>,
    listings_by_pk?: GraphCacheUpdateResolver<{ listings_by_pk: Maybe<WithTypename<Listings>> }, Subscription_RootListings_By_PkArgs>,
    maintenance_orders?: GraphCacheUpdateResolver<{ maintenance_orders: Array<WithTypename<Maintenance_Orders>> }, Subscription_RootMaintenance_OrdersArgs>,
    maintenance_orders_aggregate?: GraphCacheUpdateResolver<{ maintenance_orders_aggregate: WithTypename<Maintenance_Orders_Aggregate> }, Subscription_RootMaintenance_Orders_AggregateArgs>,
    maintenance_orders_by_pk?: GraphCacheUpdateResolver<{ maintenance_orders_by_pk: Maybe<WithTypename<Maintenance_Orders>> }, Subscription_RootMaintenance_Orders_By_PkArgs>,
    properties?: GraphCacheUpdateResolver<{ properties: Array<WithTypename<Properties>> }, Subscription_RootPropertiesArgs>,
    properties_aggregate?: GraphCacheUpdateResolver<{ properties_aggregate: WithTypename<Properties_Aggregate> }, Subscription_RootProperties_AggregateArgs>,
    properties_by_pk?: GraphCacheUpdateResolver<{ properties_by_pk: Maybe<WithTypename<Properties>> }, Subscription_RootProperties_By_PkArgs>,
    tenants?: GraphCacheUpdateResolver<{ tenants: Array<WithTypename<Tenants>> }, Subscription_RootTenantsArgs>,
    tenants_aggregate?: GraphCacheUpdateResolver<{ tenants_aggregate: WithTypename<Tenants_Aggregate> }, Subscription_RootTenants_AggregateArgs>,
    tenants_by_pk?: GraphCacheUpdateResolver<{ tenants_by_pk: Maybe<WithTypename<Tenants>> }, Subscription_RootTenants_By_PkArgs>,
    transactions?: GraphCacheUpdateResolver<{ transactions: Array<WithTypename<Transactions>> }, Subscription_RootTransactionsArgs>,
    transactions_aggregate?: GraphCacheUpdateResolver<{ transactions_aggregate: WithTypename<Transactions_Aggregate> }, Subscription_RootTransactions_AggregateArgs>,
    transactions_by_pk?: GraphCacheUpdateResolver<{ transactions_by_pk: Maybe<WithTypename<Transactions>> }, Subscription_RootTransactions_By_PkArgs>,
    units?: GraphCacheUpdateResolver<{ units: Array<WithTypename<Units>> }, Subscription_RootUnitsArgs>,
    units_aggregate?: GraphCacheUpdateResolver<{ units_aggregate: WithTypename<Units_Aggregate> }, Subscription_RootUnits_AggregateArgs>,
    units_by_pk?: GraphCacheUpdateResolver<{ units_by_pk: Maybe<WithTypename<Units>> }, Subscription_RootUnits_By_PkArgs>,
    users?: GraphCacheUpdateResolver<{ users: Array<WithTypename<Users>> }, Subscription_RootUsersArgs>,
    users_aggregate?: GraphCacheUpdateResolver<{ users_aggregate: WithTypename<Users_Aggregate> }, Subscription_RootUsers_AggregateArgs>,
    users_by_pk?: GraphCacheUpdateResolver<{ users_by_pk: Maybe<WithTypename<Users>> }, Subscription_RootUsers_By_PkArgs>
  },
};

export type GraphCacheConfig = {
  schema?: IntrospectionData,
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
  storage?: GraphCacheStorageAdapter
};