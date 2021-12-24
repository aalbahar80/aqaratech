/* eslint-disable */
import type { OperationStore } from '@urql/svelte';
import type {
	Resolver as GraphCacheResolver,
	UpdateResolver as GraphCacheUpdateResolver,
	OptimisticMutationResolver as GraphCacheOptimisticMutationResolver,
	StorageAdapter as GraphCacheStorageAdapter,
} from '@urql/exchange-graphcache';
import type { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
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
export type Boolean_comparison_exp = {
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
export type Int_comparison_exp = {
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
export type String_comparison_exp = {
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
export type bigint_comparison_exp = {
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
export type clients = {
	__typename?: 'clients';
	civilid?: Maybe<Scalars['bigint']>;
	email?: Maybe<Scalars['String']>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	first_name?: Maybe<Scalars['String']>;
	id: Scalars['Int'];
	is_active?: Maybe<Scalars['Boolean']>;
	last_name?: Maybe<Scalars['String']>;
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	phone?: Maybe<Scalars['String']>;
	/** An array relationship */
	properties: Array<properties>;
	/** An aggregate relationship */
	properties_aggregate: properties_aggregate;
	second_name?: Maybe<Scalars['String']>;
	third_name?: Maybe<Scalars['String']>;
	/** An array relationship */
	users: Array<users>;
	/** An aggregate relationship */
	users_aggregate: users_aggregate;
};

/** columns and relationships of "clients" */
export type clientsexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientspropertiesArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsproperties_aggregateArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsusersArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

/** columns and relationships of "clients" */
export type clientsusers_aggregateArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

/** aggregated selection of "clients" */
export type clients_aggregate = {
	__typename?: 'clients_aggregate';
	aggregate?: Maybe<clients_aggregate_fields>;
	nodes: Array<clients>;
};

/** aggregate fields of "clients" */
export type clients_aggregate_fields = {
	__typename?: 'clients_aggregate_fields';
	avg?: Maybe<clients_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<clients_max_fields>;
	min?: Maybe<clients_min_fields>;
	stddev?: Maybe<clients_stddev_fields>;
	stddev_pop?: Maybe<clients_stddev_pop_fields>;
	stddev_samp?: Maybe<clients_stddev_samp_fields>;
	sum?: Maybe<clients_sum_fields>;
	var_pop?: Maybe<clients_var_pop_fields>;
	var_samp?: Maybe<clients_var_samp_fields>;
	variance?: Maybe<clients_variance_fields>;
};

/** aggregate fields of "clients" */
export type clients_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<clients_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type clients_avg_fields = {
	__typename?: 'clients_avg_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "clients". All fields are combined with a logical 'AND'. */
export type clients_bool_exp = {
	_and?: InputMaybe<Array<clients_bool_exp>>;
	_not?: InputMaybe<clients_bool_exp>;
	_or?: InputMaybe<Array<clients_bool_exp>>;
	civilid?: InputMaybe<bigint_comparison_exp>;
	email?: InputMaybe<String_comparison_exp>;
	expenses?: InputMaybe<expenses_bool_exp>;
	first_name?: InputMaybe<String_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	is_active?: InputMaybe<Boolean_comparison_exp>;
	last_name?: InputMaybe<String_comparison_exp>;
	maintenance_orders?: InputMaybe<maintenance_orders_bool_exp>;
	phone?: InputMaybe<String_comparison_exp>;
	properties?: InputMaybe<properties_bool_exp>;
	second_name?: InputMaybe<String_comparison_exp>;
	third_name?: InputMaybe<String_comparison_exp>;
	users?: InputMaybe<users_bool_exp>;
};

/** unique or primary key constraints on table "clients" */
export enum clients_constraint {
	/** unique or primary key constraint */
	clients_pkey = 'clients_pkey',
}

/** input type for incrementing numeric columns in table "clients" */
export type clients_inc_input = {
	civilid?: InputMaybe<Scalars['bigint']>;
	id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "clients" */
export type clients_insert_input = {
	civilid?: InputMaybe<Scalars['bigint']>;
	email?: InputMaybe<Scalars['String']>;
	expenses?: InputMaybe<expenses_arr_rel_insert_input>;
	first_name?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	is_active?: InputMaybe<Scalars['Boolean']>;
	last_name?: InputMaybe<Scalars['String']>;
	maintenance_orders?: InputMaybe<maintenance_orders_arr_rel_insert_input>;
	phone?: InputMaybe<Scalars['String']>;
	properties?: InputMaybe<properties_arr_rel_insert_input>;
	second_name?: InputMaybe<Scalars['String']>;
	third_name?: InputMaybe<Scalars['String']>;
	users?: InputMaybe<users_arr_rel_insert_input>;
};

/** aggregate max on columns */
export type clients_max_fields = {
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
export type clients_min_fields = {
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
export type clients_mutation_response = {
	__typename?: 'clients_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<clients>;
};

/** input type for inserting object relation for remote table "clients" */
export type clients_obj_rel_insert_input = {
	data: clients_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<clients_on_conflict>;
};

/** on conflict condition type for table "clients" */
export type clients_on_conflict = {
	constraint: clients_constraint;
	update_columns?: Array<clients_update_column>;
	where?: InputMaybe<clients_bool_exp>;
};

/** Ordering options when selecting data from "clients". */
export type clients_order_by = {
	civilid?: InputMaybe<order_by>;
	email?: InputMaybe<order_by>;
	expenses_aggregate?: InputMaybe<expenses_aggregate_order_by>;
	first_name?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	is_active?: InputMaybe<order_by>;
	last_name?: InputMaybe<order_by>;
	maintenance_orders_aggregate?: InputMaybe<maintenance_orders_aggregate_order_by>;
	phone?: InputMaybe<order_by>;
	properties_aggregate?: InputMaybe<properties_aggregate_order_by>;
	second_name?: InputMaybe<order_by>;
	third_name?: InputMaybe<order_by>;
	users_aggregate?: InputMaybe<users_aggregate_order_by>;
};

/** primary key columns input for table: clients */
export type clients_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "clients" */
export enum clients_select_column {
	/** column name */
	civilid = 'civilid',
	/** column name */
	email = 'email',
	/** column name */
	first_name = 'first_name',
	/** column name */
	id = 'id',
	/** column name */
	is_active = 'is_active',
	/** column name */
	last_name = 'last_name',
	/** column name */
	phone = 'phone',
	/** column name */
	second_name = 'second_name',
	/** column name */
	third_name = 'third_name',
}

/** input type for updating data in table "clients" */
export type clients_set_input = {
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
export type clients_stddev_fields = {
	__typename?: 'clients_stddev_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type clients_stddev_pop_fields = {
	__typename?: 'clients_stddev_pop_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type clients_stddev_samp_fields = {
	__typename?: 'clients_stddev_samp_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type clients_sum_fields = {
	__typename?: 'clients_sum_fields';
	civilid?: Maybe<Scalars['bigint']>;
	id?: Maybe<Scalars['Int']>;
};

/** update columns of table "clients" */
export enum clients_update_column {
	/** column name */
	civilid = 'civilid',
	/** column name */
	email = 'email',
	/** column name */
	first_name = 'first_name',
	/** column name */
	id = 'id',
	/** column name */
	is_active = 'is_active',
	/** column name */
	last_name = 'last_name',
	/** column name */
	phone = 'phone',
	/** column name */
	second_name = 'second_name',
	/** column name */
	third_name = 'third_name',
}

/** aggregate var_pop on columns */
export type clients_var_pop_fields = {
	__typename?: 'clients_var_pop_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type clients_var_samp_fields = {
	__typename?: 'clients_var_samp_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type clients_variance_fields = {
	__typename?: 'clients_variance_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type date_comparison_exp = {
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
export type expenses = {
	__typename?: 'expenses';
	amount?: Maybe<Scalars['Int']>;
	category?: Maybe<expenses_types_enum>;
	/** An object relationship */
	client?: Maybe<clients>;
	client_id?: Maybe<Scalars['Int']>;
	date_post?: Maybe<Scalars['date']>;
	/** An object relationship */
	expenses_type?: Maybe<expenses_types>;
	id: Scalars['Int'];
	/** An object relationship */
	maintenance_order?: Maybe<maintenance_orders>;
	maintenance_order_id?: Maybe<Scalars['Int']>;
	memo?: Maybe<Scalars['String']>;
	/** An object relationship */
	property?: Maybe<properties>;
	property_id?: Maybe<Scalars['Int']>;
	/** An object relationship */
	unit?: Maybe<units>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "expenses" */
export type expenses_aggregate = {
	__typename?: 'expenses_aggregate';
	aggregate?: Maybe<expenses_aggregate_fields>;
	nodes: Array<expenses>;
};

/** aggregate fields of "expenses" */
export type expenses_aggregate_fields = {
	__typename?: 'expenses_aggregate_fields';
	avg?: Maybe<expenses_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<expenses_max_fields>;
	min?: Maybe<expenses_min_fields>;
	stddev?: Maybe<expenses_stddev_fields>;
	stddev_pop?: Maybe<expenses_stddev_pop_fields>;
	stddev_samp?: Maybe<expenses_stddev_samp_fields>;
	sum?: Maybe<expenses_sum_fields>;
	var_pop?: Maybe<expenses_var_pop_fields>;
	var_samp?: Maybe<expenses_var_samp_fields>;
	variance?: Maybe<expenses_variance_fields>;
};

/** aggregate fields of "expenses" */
export type expenses_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<expenses_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "expenses" */
export type expenses_aggregate_order_by = {
	avg?: InputMaybe<expenses_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<expenses_max_order_by>;
	min?: InputMaybe<expenses_min_order_by>;
	stddev?: InputMaybe<expenses_stddev_order_by>;
	stddev_pop?: InputMaybe<expenses_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<expenses_stddev_samp_order_by>;
	sum?: InputMaybe<expenses_sum_order_by>;
	var_pop?: InputMaybe<expenses_var_pop_order_by>;
	var_samp?: InputMaybe<expenses_var_samp_order_by>;
	variance?: InputMaybe<expenses_variance_order_by>;
};

/** input type for inserting array relation for remote table "expenses" */
export type expenses_arr_rel_insert_input = {
	data: Array<expenses_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<expenses_on_conflict>;
};

/** aggregate avg on columns */
export type expenses_avg_fields = {
	__typename?: 'expenses_avg_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "expenses" */
export type expenses_avg_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "expenses". All fields are combined with a logical 'AND'. */
export type expenses_bool_exp = {
	_and?: InputMaybe<Array<expenses_bool_exp>>;
	_not?: InputMaybe<expenses_bool_exp>;
	_or?: InputMaybe<Array<expenses_bool_exp>>;
	amount?: InputMaybe<Int_comparison_exp>;
	category?: InputMaybe<expenses_types_enum_comparison_exp>;
	client?: InputMaybe<clients_bool_exp>;
	client_id?: InputMaybe<Int_comparison_exp>;
	date_post?: InputMaybe<date_comparison_exp>;
	expenses_type?: InputMaybe<expenses_types_bool_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	maintenance_order?: InputMaybe<maintenance_orders_bool_exp>;
	maintenance_order_id?: InputMaybe<Int_comparison_exp>;
	memo?: InputMaybe<String_comparison_exp>;
	property?: InputMaybe<properties_bool_exp>;
	property_id?: InputMaybe<Int_comparison_exp>;
	unit?: InputMaybe<units_bool_exp>;
	unit_id?: InputMaybe<Int_comparison_exp>;
};

/** unique or primary key constraints on table "expenses" */
export enum expenses_constraint {
	/** unique or primary key constraint */
	expenses_pkey = 'expenses_pkey',
}

/** input type for incrementing numeric columns in table "expenses" */
export type expenses_inc_input = {
	amount?: InputMaybe<Scalars['Int']>;
	client_id?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
	maintenance_order_id?: InputMaybe<Scalars['Int']>;
	property_id?: InputMaybe<Scalars['Int']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "expenses" */
export type expenses_insert_input = {
	amount?: InputMaybe<Scalars['Int']>;
	category?: InputMaybe<expenses_types_enum>;
	client?: InputMaybe<clients_obj_rel_insert_input>;
	client_id?: InputMaybe<Scalars['Int']>;
	date_post?: InputMaybe<Scalars['date']>;
	expenses_type?: InputMaybe<expenses_types_obj_rel_insert_input>;
	id?: InputMaybe<Scalars['Int']>;
	maintenance_order?: InputMaybe<maintenance_orders_obj_rel_insert_input>;
	maintenance_order_id?: InputMaybe<Scalars['Int']>;
	memo?: InputMaybe<Scalars['String']>;
	property?: InputMaybe<properties_obj_rel_insert_input>;
	property_id?: InputMaybe<Scalars['Int']>;
	unit?: InputMaybe<units_obj_rel_insert_input>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type expenses_max_fields = {
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
export type expenses_max_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	date_post?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type expenses_min_fields = {
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
export type expenses_min_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	date_post?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** response of any mutation on the table "expenses" */
export type expenses_mutation_response = {
	__typename?: 'expenses_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<expenses>;
};

/** on conflict condition type for table "expenses" */
export type expenses_on_conflict = {
	constraint: expenses_constraint;
	update_columns?: Array<expenses_update_column>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** Ordering options when selecting data from "expenses". */
export type expenses_order_by = {
	amount?: InputMaybe<order_by>;
	category?: InputMaybe<order_by>;
	client?: InputMaybe<clients_order_by>;
	client_id?: InputMaybe<order_by>;
	date_post?: InputMaybe<order_by>;
	expenses_type?: InputMaybe<expenses_types_order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order?: InputMaybe<maintenance_orders_order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	property?: InputMaybe<properties_order_by>;
	property_id?: InputMaybe<order_by>;
	unit?: InputMaybe<units_order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** primary key columns input for table: expenses */
export type expenses_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "expenses" */
export enum expenses_select_column {
	/** column name */
	amount = 'amount',
	/** column name */
	category = 'category',
	/** column name */
	client_id = 'client_id',
	/** column name */
	date_post = 'date_post',
	/** column name */
	id = 'id',
	/** column name */
	maintenance_order_id = 'maintenance_order_id',
	/** column name */
	memo = 'memo',
	/** column name */
	property_id = 'property_id',
	/** column name */
	unit_id = 'unit_id',
}

/** input type for updating data in table "expenses" */
export type expenses_set_input = {
	amount?: InputMaybe<Scalars['Int']>;
	category?: InputMaybe<expenses_types_enum>;
	client_id?: InputMaybe<Scalars['Int']>;
	date_post?: InputMaybe<Scalars['date']>;
	id?: InputMaybe<Scalars['Int']>;
	maintenance_order_id?: InputMaybe<Scalars['Int']>;
	memo?: InputMaybe<Scalars['String']>;
	property_id?: InputMaybe<Scalars['Int']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type expenses_stddev_fields = {
	__typename?: 'expenses_stddev_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "expenses" */
export type expenses_stddev_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type expenses_stddev_pop_fields = {
	__typename?: 'expenses_stddev_pop_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "expenses" */
export type expenses_stddev_pop_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type expenses_stddev_samp_fields = {
	__typename?: 'expenses_stddev_samp_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "expenses" */
export type expenses_stddev_samp_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type expenses_sum_fields = {
	__typename?: 'expenses_sum_fields';
	amount?: Maybe<Scalars['Int']>;
	client_id?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	maintenance_order_id?: Maybe<Scalars['Int']>;
	property_id?: Maybe<Scalars['Int']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "expenses" */
export type expenses_sum_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** columns and relationships of "expenses_types" */
export type expenses_types = {
	__typename?: 'expenses_types';
	description?: Maybe<Scalars['String']>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	value: Scalars['String'];
};

/** columns and relationships of "expenses_types" */
export type expenses_typesexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "expenses_types" */
export type expenses_typesexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** aggregated selection of "expenses_types" */
export type expenses_types_aggregate = {
	__typename?: 'expenses_types_aggregate';
	aggregate?: Maybe<expenses_types_aggregate_fields>;
	nodes: Array<expenses_types>;
};

/** aggregate fields of "expenses_types" */
export type expenses_types_aggregate_fields = {
	__typename?: 'expenses_types_aggregate_fields';
	count: Scalars['Int'];
	max?: Maybe<expenses_types_max_fields>;
	min?: Maybe<expenses_types_min_fields>;
};

/** aggregate fields of "expenses_types" */
export type expenses_types_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<expenses_types_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "expenses_types". All fields are combined with a logical 'AND'. */
export type expenses_types_bool_exp = {
	_and?: InputMaybe<Array<expenses_types_bool_exp>>;
	_not?: InputMaybe<expenses_types_bool_exp>;
	_or?: InputMaybe<Array<expenses_types_bool_exp>>;
	description?: InputMaybe<String_comparison_exp>;
	expenses?: InputMaybe<expenses_bool_exp>;
	value?: InputMaybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "expenses_types" */
export enum expenses_types_constraint {
	/** unique or primary key constraint */
	expenses_types_pkey = 'expenses_types_pkey',
}

export enum expenses_types_enum {
	AMENITIES = 'AMENITIES',
	CARETAKER = 'CARETAKER',
	ELECTRICITY = 'ELECTRICITY',
	ELEVATORS = 'ELEVATORS',
	HVAC = 'HVAC',
	INSURANCE = 'INSURANCE',
	INTERNET = 'INTERNET',
	LANDCAPING = 'LANDCAPING',
	MANAGEMENT_FEES = 'MANAGEMENT_FEES',
	PLUMBING = 'PLUMBING',
	SATELLITE = 'SATELLITE',
	WATER = 'WATER',
}

/** Boolean expression to compare columns of type "expenses_types_enum". All fields are combined with logical 'AND'. */
export type expenses_types_enum_comparison_exp = {
	_eq?: InputMaybe<expenses_types_enum>;
	_in?: InputMaybe<Array<expenses_types_enum>>;
	_is_null?: InputMaybe<Scalars['Boolean']>;
	_neq?: InputMaybe<expenses_types_enum>;
	_nin?: InputMaybe<Array<expenses_types_enum>>;
};

/** input type for inserting data into table "expenses_types" */
export type expenses_types_insert_input = {
	description?: InputMaybe<Scalars['String']>;
	expenses?: InputMaybe<expenses_arr_rel_insert_input>;
	value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type expenses_types_max_fields = {
	__typename?: 'expenses_types_max_fields';
	description?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type expenses_types_min_fields = {
	__typename?: 'expenses_types_min_fields';
	description?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "expenses_types" */
export type expenses_types_mutation_response = {
	__typename?: 'expenses_types_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<expenses_types>;
};

/** input type for inserting object relation for remote table "expenses_types" */
export type expenses_types_obj_rel_insert_input = {
	data: expenses_types_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<expenses_types_on_conflict>;
};

/** on conflict condition type for table "expenses_types" */
export type expenses_types_on_conflict = {
	constraint: expenses_types_constraint;
	update_columns?: Array<expenses_types_update_column>;
	where?: InputMaybe<expenses_types_bool_exp>;
};

/** Ordering options when selecting data from "expenses_types". */
export type expenses_types_order_by = {
	description?: InputMaybe<order_by>;
	expenses_aggregate?: InputMaybe<expenses_aggregate_order_by>;
	value?: InputMaybe<order_by>;
};

/** primary key columns input for table: expenses_types */
export type expenses_types_pk_columns_input = {
	value: Scalars['String'];
};

/** select columns of table "expenses_types" */
export enum expenses_types_select_column {
	/** column name */
	description = 'description',
	/** column name */
	value = 'value',
}

/** input type for updating data in table "expenses_types" */
export type expenses_types_set_input = {
	description?: InputMaybe<Scalars['String']>;
	value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "expenses_types" */
export enum expenses_types_update_column {
	/** column name */
	description = 'description',
	/** column name */
	value = 'value',
}

/** update columns of table "expenses" */
export enum expenses_update_column {
	/** column name */
	amount = 'amount',
	/** column name */
	category = 'category',
	/** column name */
	client_id = 'client_id',
	/** column name */
	date_post = 'date_post',
	/** column name */
	id = 'id',
	/** column name */
	maintenance_order_id = 'maintenance_order_id',
	/** column name */
	memo = 'memo',
	/** column name */
	property_id = 'property_id',
	/** column name */
	unit_id = 'unit_id',
}

/** aggregate var_pop on columns */
export type expenses_var_pop_fields = {
	__typename?: 'expenses_var_pop_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "expenses" */
export type expenses_var_pop_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type expenses_var_samp_fields = {
	__typename?: 'expenses_var_samp_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "expenses" */
export type expenses_var_samp_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type expenses_variance_fields = {
	__typename?: 'expenses_variance_fields';
	amount?: Maybe<Scalars['Float']>;
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	maintenance_order_id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "expenses" */
export type expenses_variance_order_by = {
	amount?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	maintenance_order_id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** columns and relationships of "leases" */
export type leases = {
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
	tenant?: Maybe<tenants>;
	tenant_id?: Maybe<Scalars['Int']>;
	/** An array relationship */
	transactions: Array<transactions>;
	/** An aggregate relationship */
	transactions_aggregate: transactions_aggregate;
	/** An object relationship */
	unit?: Maybe<units>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "leases" */
export type leasestransactionsArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

/** columns and relationships of "leases" */
export type leasestransactions_aggregateArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

/** aggregated selection of "leases" */
export type leases_aggregate = {
	__typename?: 'leases_aggregate';
	aggregate?: Maybe<leases_aggregate_fields>;
	nodes: Array<leases>;
};

/** aggregate fields of "leases" */
export type leases_aggregate_fields = {
	__typename?: 'leases_aggregate_fields';
	avg?: Maybe<leases_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<leases_max_fields>;
	min?: Maybe<leases_min_fields>;
	stddev?: Maybe<leases_stddev_fields>;
	stddev_pop?: Maybe<leases_stddev_pop_fields>;
	stddev_samp?: Maybe<leases_stddev_samp_fields>;
	sum?: Maybe<leases_sum_fields>;
	var_pop?: Maybe<leases_var_pop_fields>;
	var_samp?: Maybe<leases_var_samp_fields>;
	variance?: Maybe<leases_variance_fields>;
};

/** aggregate fields of "leases" */
export type leases_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<leases_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "leases" */
export type leases_aggregate_order_by = {
	avg?: InputMaybe<leases_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<leases_max_order_by>;
	min?: InputMaybe<leases_min_order_by>;
	stddev?: InputMaybe<leases_stddev_order_by>;
	stddev_pop?: InputMaybe<leases_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<leases_stddev_samp_order_by>;
	sum?: InputMaybe<leases_sum_order_by>;
	var_pop?: InputMaybe<leases_var_pop_order_by>;
	var_samp?: InputMaybe<leases_var_samp_order_by>;
	variance?: InputMaybe<leases_variance_order_by>;
};

/** input type for inserting array relation for remote table "leases" */
export type leases_arr_rel_insert_input = {
	data: Array<leases_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<leases_on_conflict>;
};

/** aggregate avg on columns */
export type leases_avg_fields = {
	__typename?: 'leases_avg_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "leases" */
export type leases_avg_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "leases". All fields are combined with a logical 'AND'. */
export type leases_bool_exp = {
	_and?: InputMaybe<Array<leases_bool_exp>>;
	_not?: InputMaybe<leases_bool_exp>;
	_or?: InputMaybe<Array<leases_bool_exp>>;
	deposit?: InputMaybe<Int_comparison_exp>;
	end_date?: InputMaybe<date_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	is_expired?: InputMaybe<Boolean_comparison_exp>;
	is_signed?: InputMaybe<Boolean_comparison_exp>;
	license?: InputMaybe<String_comparison_exp>;
	monthly_rent?: InputMaybe<Int_comparison_exp>;
	start_date?: InputMaybe<date_comparison_exp>;
	tenant?: InputMaybe<tenants_bool_exp>;
	tenant_id?: InputMaybe<Int_comparison_exp>;
	transactions?: InputMaybe<transactions_bool_exp>;
	unit?: InputMaybe<units_bool_exp>;
	unit_id?: InputMaybe<Int_comparison_exp>;
};

/** unique or primary key constraints on table "leases" */
export enum leases_constraint {
	/** unique or primary key constraint */
	leases_pkey = 'leases_pkey',
}

/** input type for incrementing numeric columns in table "leases" */
export type leases_inc_input = {
	deposit?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
	monthly_rent?: InputMaybe<Scalars['Int']>;
	tenant_id?: InputMaybe<Scalars['Int']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "leases" */
export type leases_insert_input = {
	deposit?: InputMaybe<Scalars['Int']>;
	end_date?: InputMaybe<Scalars['date']>;
	id?: InputMaybe<Scalars['Int']>;
	is_signed?: InputMaybe<Scalars['Boolean']>;
	license?: InputMaybe<Scalars['String']>;
	monthly_rent?: InputMaybe<Scalars['Int']>;
	start_date?: InputMaybe<Scalars['date']>;
	tenant?: InputMaybe<tenants_obj_rel_insert_input>;
	tenant_id?: InputMaybe<Scalars['Int']>;
	transactions?: InputMaybe<transactions_arr_rel_insert_input>;
	unit?: InputMaybe<units_obj_rel_insert_input>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type leases_max_fields = {
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
export type leases_max_order_by = {
	deposit?: InputMaybe<order_by>;
	end_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	license?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	start_date?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type leases_min_fields = {
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
export type leases_min_order_by = {
	deposit?: InputMaybe<order_by>;
	end_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	license?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	start_date?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** response of any mutation on the table "leases" */
export type leases_mutation_response = {
	__typename?: 'leases_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<leases>;
};

/** input type for inserting object relation for remote table "leases" */
export type leases_obj_rel_insert_input = {
	data: leases_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<leases_on_conflict>;
};

/** on conflict condition type for table "leases" */
export type leases_on_conflict = {
	constraint: leases_constraint;
	update_columns?: Array<leases_update_column>;
	where?: InputMaybe<leases_bool_exp>;
};

/** Ordering options when selecting data from "leases". */
export type leases_order_by = {
	deposit?: InputMaybe<order_by>;
	end_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	is_expired?: InputMaybe<order_by>;
	is_signed?: InputMaybe<order_by>;
	license?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	start_date?: InputMaybe<order_by>;
	tenant?: InputMaybe<tenants_order_by>;
	tenant_id?: InputMaybe<order_by>;
	transactions_aggregate?: InputMaybe<transactions_aggregate_order_by>;
	unit?: InputMaybe<units_order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** primary key columns input for table: leases */
export type leases_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "leases" */
export enum leases_select_column {
	/** column name */
	deposit = 'deposit',
	/** column name */
	end_date = 'end_date',
	/** column name */
	id = 'id',
	/** column name */
	is_signed = 'is_signed',
	/** column name */
	license = 'license',
	/** column name */
	monthly_rent = 'monthly_rent',
	/** column name */
	start_date = 'start_date',
	/** column name */
	tenant_id = 'tenant_id',
	/** column name */
	unit_id = 'unit_id',
}

/** input type for updating data in table "leases" */
export type leases_set_input = {
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
export type leases_stddev_fields = {
	__typename?: 'leases_stddev_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "leases" */
export type leases_stddev_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type leases_stddev_pop_fields = {
	__typename?: 'leases_stddev_pop_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "leases" */
export type leases_stddev_pop_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type leases_stddev_samp_fields = {
	__typename?: 'leases_stddev_samp_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "leases" */
export type leases_stddev_samp_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type leases_sum_fields = {
	__typename?: 'leases_sum_fields';
	deposit?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	monthly_rent?: Maybe<Scalars['Int']>;
	tenant_id?: Maybe<Scalars['Int']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "leases" */
export type leases_sum_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** update columns of table "leases" */
export enum leases_update_column {
	/** column name */
	deposit = 'deposit',
	/** column name */
	end_date = 'end_date',
	/** column name */
	id = 'id',
	/** column name */
	is_signed = 'is_signed',
	/** column name */
	license = 'license',
	/** column name */
	monthly_rent = 'monthly_rent',
	/** column name */
	start_date = 'start_date',
	/** column name */
	tenant_id = 'tenant_id',
	/** column name */
	unit_id = 'unit_id',
}

/** aggregate var_pop on columns */
export type leases_var_pop_fields = {
	__typename?: 'leases_var_pop_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "leases" */
export type leases_var_pop_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type leases_var_samp_fields = {
	__typename?: 'leases_var_samp_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "leases" */
export type leases_var_samp_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type leases_variance_fields = {
	__typename?: 'leases_variance_fields';
	deposit?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	monthly_rent?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "leases" */
export type leases_variance_order_by = {
	deposit?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	monthly_rent?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** columns and relationships of "listings" */
export type listings = {
	__typename?: 'listings';
	available_on?: Maybe<Scalars['date']>;
	description?: Maybe<Scalars['String']>;
	id: Scalars['Int'];
	is_active?: Maybe<Scalars['Boolean']>;
	lease_length?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	/** An object relationship */
	unit?: Maybe<units>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "listings" */
export type listings_aggregate = {
	__typename?: 'listings_aggregate';
	aggregate?: Maybe<listings_aggregate_fields>;
	nodes: Array<listings>;
};

/** aggregate fields of "listings" */
export type listings_aggregate_fields = {
	__typename?: 'listings_aggregate_fields';
	avg?: Maybe<listings_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<listings_max_fields>;
	min?: Maybe<listings_min_fields>;
	stddev?: Maybe<listings_stddev_fields>;
	stddev_pop?: Maybe<listings_stddev_pop_fields>;
	stddev_samp?: Maybe<listings_stddev_samp_fields>;
	sum?: Maybe<listings_sum_fields>;
	var_pop?: Maybe<listings_var_pop_fields>;
	var_samp?: Maybe<listings_var_samp_fields>;
	variance?: Maybe<listings_variance_fields>;
};

/** aggregate fields of "listings" */
export type listings_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<listings_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "listings" */
export type listings_aggregate_order_by = {
	avg?: InputMaybe<listings_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<listings_max_order_by>;
	min?: InputMaybe<listings_min_order_by>;
	stddev?: InputMaybe<listings_stddev_order_by>;
	stddev_pop?: InputMaybe<listings_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<listings_stddev_samp_order_by>;
	sum?: InputMaybe<listings_sum_order_by>;
	var_pop?: InputMaybe<listings_var_pop_order_by>;
	var_samp?: InputMaybe<listings_var_samp_order_by>;
	variance?: InputMaybe<listings_variance_order_by>;
};

/** input type for inserting array relation for remote table "listings" */
export type listings_arr_rel_insert_input = {
	data: Array<listings_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<listings_on_conflict>;
};

/** aggregate avg on columns */
export type listings_avg_fields = {
	__typename?: 'listings_avg_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "listings" */
export type listings_avg_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "listings". All fields are combined with a logical 'AND'. */
export type listings_bool_exp = {
	_and?: InputMaybe<Array<listings_bool_exp>>;
	_not?: InputMaybe<listings_bool_exp>;
	_or?: InputMaybe<Array<listings_bool_exp>>;
	available_on?: InputMaybe<date_comparison_exp>;
	description?: InputMaybe<String_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	is_active?: InputMaybe<Boolean_comparison_exp>;
	lease_length?: InputMaybe<String_comparison_exp>;
	title?: InputMaybe<String_comparison_exp>;
	unit?: InputMaybe<units_bool_exp>;
	unit_id?: InputMaybe<Int_comparison_exp>;
};

/** unique or primary key constraints on table "listings" */
export enum listings_constraint {
	/** unique or primary key constraint */
	listings_pkey = 'listings_pkey',
}

/** input type for incrementing numeric columns in table "listings" */
export type listings_inc_input = {
	id?: InputMaybe<Scalars['Int']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "listings" */
export type listings_insert_input = {
	available_on?: InputMaybe<Scalars['date']>;
	description?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	is_active?: InputMaybe<Scalars['Boolean']>;
	lease_length?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
	unit?: InputMaybe<units_obj_rel_insert_input>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type listings_max_fields = {
	__typename?: 'listings_max_fields';
	available_on?: Maybe<Scalars['date']>;
	description?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['Int']>;
	lease_length?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "listings" */
export type listings_max_order_by = {
	available_on?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_length?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type listings_min_fields = {
	__typename?: 'listings_min_fields';
	available_on?: Maybe<Scalars['date']>;
	description?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['Int']>;
	lease_length?: Maybe<Scalars['String']>;
	title?: Maybe<Scalars['String']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "listings" */
export type listings_min_order_by = {
	available_on?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_length?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** response of any mutation on the table "listings" */
export type listings_mutation_response = {
	__typename?: 'listings_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<listings>;
};

/** on conflict condition type for table "listings" */
export type listings_on_conflict = {
	constraint: listings_constraint;
	update_columns?: Array<listings_update_column>;
	where?: InputMaybe<listings_bool_exp>;
};

/** Ordering options when selecting data from "listings". */
export type listings_order_by = {
	available_on?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	is_active?: InputMaybe<order_by>;
	lease_length?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit?: InputMaybe<units_order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** primary key columns input for table: listings */
export type listings_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "listings" */
export enum listings_select_column {
	/** column name */
	available_on = 'available_on',
	/** column name */
	description = 'description',
	/** column name */
	id = 'id',
	/** column name */
	is_active = 'is_active',
	/** column name */
	lease_length = 'lease_length',
	/** column name */
	title = 'title',
	/** column name */
	unit_id = 'unit_id',
}

/** input type for updating data in table "listings" */
export type listings_set_input = {
	available_on?: InputMaybe<Scalars['date']>;
	description?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	is_active?: InputMaybe<Scalars['Boolean']>;
	lease_length?: InputMaybe<Scalars['String']>;
	title?: InputMaybe<Scalars['String']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type listings_stddev_fields = {
	__typename?: 'listings_stddev_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "listings" */
export type listings_stddev_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type listings_stddev_pop_fields = {
	__typename?: 'listings_stddev_pop_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "listings" */
export type listings_stddev_pop_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type listings_stddev_samp_fields = {
	__typename?: 'listings_stddev_samp_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "listings" */
export type listings_stddev_samp_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type listings_sum_fields = {
	__typename?: 'listings_sum_fields';
	id?: Maybe<Scalars['Int']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "listings" */
export type listings_sum_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** update columns of table "listings" */
export enum listings_update_column {
	/** column name */
	available_on = 'available_on',
	/** column name */
	description = 'description',
	/** column name */
	id = 'id',
	/** column name */
	is_active = 'is_active',
	/** column name */
	lease_length = 'lease_length',
	/** column name */
	title = 'title',
	/** column name */
	unit_id = 'unit_id',
}

/** aggregate var_pop on columns */
export type listings_var_pop_fields = {
	__typename?: 'listings_var_pop_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "listings" */
export type listings_var_pop_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type listings_var_samp_fields = {
	__typename?: 'listings_var_samp_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "listings" */
export type listings_var_samp_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type listings_variance_fields = {
	__typename?: 'listings_variance_fields';
	id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "listings" */
export type listings_variance_order_by = {
	id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** columns and relationships of "maintenance_orders" */
export type maintenance_orders = {
	__typename?: 'maintenance_orders';
	/** An object relationship */
	client?: Maybe<clients>;
	client_id?: Maybe<Scalars['Int']>;
	completed_at?: Maybe<Scalars['timestamptz']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	description?: Maybe<Scalars['String']>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	id: Scalars['Int'];
	/** An object relationship */
	property?: Maybe<properties>;
	property_id?: Maybe<Scalars['Int']>;
	status?: Maybe<Scalars['String']>;
	/** An object relationship */
	tenant?: Maybe<tenants>;
	tenant_id?: Maybe<Scalars['Int']>;
	title?: Maybe<Scalars['String']>;
	/** An object relationship */
	unit?: Maybe<units>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "maintenance_orders" */
export type maintenance_ordersexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "maintenance_orders" */
export type maintenance_ordersexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** aggregated selection of "maintenance_orders" */
export type maintenance_orders_aggregate = {
	__typename?: 'maintenance_orders_aggregate';
	aggregate?: Maybe<maintenance_orders_aggregate_fields>;
	nodes: Array<maintenance_orders>;
};

/** aggregate fields of "maintenance_orders" */
export type maintenance_orders_aggregate_fields = {
	__typename?: 'maintenance_orders_aggregate_fields';
	avg?: Maybe<maintenance_orders_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<maintenance_orders_max_fields>;
	min?: Maybe<maintenance_orders_min_fields>;
	stddev?: Maybe<maintenance_orders_stddev_fields>;
	stddev_pop?: Maybe<maintenance_orders_stddev_pop_fields>;
	stddev_samp?: Maybe<maintenance_orders_stddev_samp_fields>;
	sum?: Maybe<maintenance_orders_sum_fields>;
	var_pop?: Maybe<maintenance_orders_var_pop_fields>;
	var_samp?: Maybe<maintenance_orders_var_samp_fields>;
	variance?: Maybe<maintenance_orders_variance_fields>;
};

/** aggregate fields of "maintenance_orders" */
export type maintenance_orders_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<maintenance_orders_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "maintenance_orders" */
export type maintenance_orders_aggregate_order_by = {
	avg?: InputMaybe<maintenance_orders_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<maintenance_orders_max_order_by>;
	min?: InputMaybe<maintenance_orders_min_order_by>;
	stddev?: InputMaybe<maintenance_orders_stddev_order_by>;
	stddev_pop?: InputMaybe<maintenance_orders_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<maintenance_orders_stddev_samp_order_by>;
	sum?: InputMaybe<maintenance_orders_sum_order_by>;
	var_pop?: InputMaybe<maintenance_orders_var_pop_order_by>;
	var_samp?: InputMaybe<maintenance_orders_var_samp_order_by>;
	variance?: InputMaybe<maintenance_orders_variance_order_by>;
};

/** input type for inserting array relation for remote table "maintenance_orders" */
export type maintenance_orders_arr_rel_insert_input = {
	data: Array<maintenance_orders_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<maintenance_orders_on_conflict>;
};

/** aggregate avg on columns */
export type maintenance_orders_avg_fields = {
	__typename?: 'maintenance_orders_avg_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "maintenance_orders" */
export type maintenance_orders_avg_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "maintenance_orders". All fields are combined with a logical 'AND'. */
export type maintenance_orders_bool_exp = {
	_and?: InputMaybe<Array<maintenance_orders_bool_exp>>;
	_not?: InputMaybe<maintenance_orders_bool_exp>;
	_or?: InputMaybe<Array<maintenance_orders_bool_exp>>;
	client?: InputMaybe<clients_bool_exp>;
	client_id?: InputMaybe<Int_comparison_exp>;
	completed_at?: InputMaybe<timestamptz_comparison_exp>;
	created_at?: InputMaybe<timestamptz_comparison_exp>;
	description?: InputMaybe<String_comparison_exp>;
	expenses?: InputMaybe<expenses_bool_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	property?: InputMaybe<properties_bool_exp>;
	property_id?: InputMaybe<Int_comparison_exp>;
	status?: InputMaybe<String_comparison_exp>;
	tenant?: InputMaybe<tenants_bool_exp>;
	tenant_id?: InputMaybe<Int_comparison_exp>;
	title?: InputMaybe<String_comparison_exp>;
	unit?: InputMaybe<units_bool_exp>;
	unit_id?: InputMaybe<Int_comparison_exp>;
};

/** unique or primary key constraints on table "maintenance_orders" */
export enum maintenance_orders_constraint {
	/** unique or primary key constraint */
	maintenance_orders_pkey = 'maintenance_orders_pkey',
}

/** input type for incrementing numeric columns in table "maintenance_orders" */
export type maintenance_orders_inc_input = {
	client_id?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
	property_id?: InputMaybe<Scalars['Int']>;
	tenant_id?: InputMaybe<Scalars['Int']>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "maintenance_orders" */
export type maintenance_orders_insert_input = {
	client?: InputMaybe<clients_obj_rel_insert_input>;
	client_id?: InputMaybe<Scalars['Int']>;
	completed_at?: InputMaybe<Scalars['timestamptz']>;
	created_at?: InputMaybe<Scalars['timestamptz']>;
	description?: InputMaybe<Scalars['String']>;
	expenses?: InputMaybe<expenses_arr_rel_insert_input>;
	id?: InputMaybe<Scalars['Int']>;
	property?: InputMaybe<properties_obj_rel_insert_input>;
	property_id?: InputMaybe<Scalars['Int']>;
	status?: InputMaybe<Scalars['String']>;
	tenant?: InputMaybe<tenants_obj_rel_insert_input>;
	tenant_id?: InputMaybe<Scalars['Int']>;
	title?: InputMaybe<Scalars['String']>;
	unit?: InputMaybe<units_obj_rel_insert_input>;
	unit_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type maintenance_orders_max_fields = {
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
export type maintenance_orders_max_order_by = {
	client_id?: InputMaybe<order_by>;
	completed_at?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	status?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type maintenance_orders_min_fields = {
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
export type maintenance_orders_min_order_by = {
	client_id?: InputMaybe<order_by>;
	completed_at?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	status?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** response of any mutation on the table "maintenance_orders" */
export type maintenance_orders_mutation_response = {
	__typename?: 'maintenance_orders_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<maintenance_orders>;
};

/** input type for inserting object relation for remote table "maintenance_orders" */
export type maintenance_orders_obj_rel_insert_input = {
	data: maintenance_orders_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<maintenance_orders_on_conflict>;
};

/** on conflict condition type for table "maintenance_orders" */
export type maintenance_orders_on_conflict = {
	constraint: maintenance_orders_constraint;
	update_columns?: Array<maintenance_orders_update_column>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** Ordering options when selecting data from "maintenance_orders". */
export type maintenance_orders_order_by = {
	client?: InputMaybe<clients_order_by>;
	client_id?: InputMaybe<order_by>;
	completed_at?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	description?: InputMaybe<order_by>;
	expenses_aggregate?: InputMaybe<expenses_aggregate_order_by>;
	id?: InputMaybe<order_by>;
	property?: InputMaybe<properties_order_by>;
	property_id?: InputMaybe<order_by>;
	status?: InputMaybe<order_by>;
	tenant?: InputMaybe<tenants_order_by>;
	tenant_id?: InputMaybe<order_by>;
	title?: InputMaybe<order_by>;
	unit?: InputMaybe<units_order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** primary key columns input for table: maintenance_orders */
export type maintenance_orders_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "maintenance_orders" */
export enum maintenance_orders_select_column {
	/** column name */
	client_id = 'client_id',
	/** column name */
	completed_at = 'completed_at',
	/** column name */
	created_at = 'created_at',
	/** column name */
	description = 'description',
	/** column name */
	id = 'id',
	/** column name */
	property_id = 'property_id',
	/** column name */
	status = 'status',
	/** column name */
	tenant_id = 'tenant_id',
	/** column name */
	title = 'title',
	/** column name */
	unit_id = 'unit_id',
}

/** input type for updating data in table "maintenance_orders" */
export type maintenance_orders_set_input = {
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
export type maintenance_orders_stddev_fields = {
	__typename?: 'maintenance_orders_stddev_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "maintenance_orders" */
export type maintenance_orders_stddev_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type maintenance_orders_stddev_pop_fields = {
	__typename?: 'maintenance_orders_stddev_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "maintenance_orders" */
export type maintenance_orders_stddev_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type maintenance_orders_stddev_samp_fields = {
	__typename?: 'maintenance_orders_stddev_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "maintenance_orders" */
export type maintenance_orders_stddev_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type maintenance_orders_sum_fields = {
	__typename?: 'maintenance_orders_sum_fields';
	client_id?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	property_id?: Maybe<Scalars['Int']>;
	tenant_id?: Maybe<Scalars['Int']>;
	unit_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "maintenance_orders" */
export type maintenance_orders_sum_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** update columns of table "maintenance_orders" */
export enum maintenance_orders_update_column {
	/** column name */
	client_id = 'client_id',
	/** column name */
	completed_at = 'completed_at',
	/** column name */
	created_at = 'created_at',
	/** column name */
	description = 'description',
	/** column name */
	id = 'id',
	/** column name */
	property_id = 'property_id',
	/** column name */
	status = 'status',
	/** column name */
	tenant_id = 'tenant_id',
	/** column name */
	title = 'title',
	/** column name */
	unit_id = 'unit_id',
}

/** aggregate var_pop on columns */
export type maintenance_orders_var_pop_fields = {
	__typename?: 'maintenance_orders_var_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "maintenance_orders" */
export type maintenance_orders_var_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type maintenance_orders_var_samp_fields = {
	__typename?: 'maintenance_orders_var_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "maintenance_orders" */
export type maintenance_orders_var_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type maintenance_orders_variance_fields = {
	__typename?: 'maintenance_orders_variance_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
	unit_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "maintenance_orders" */
export type maintenance_orders_variance_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
	unit_id?: InputMaybe<order_by>;
};

/** mutation root */
export type mutation_root = {
	__typename?: 'mutation_root';
	/** delete data from the table: "clients" */
	delete_clients?: Maybe<clients_mutation_response>;
	/** delete single row from the table: "clients" */
	delete_clients_by_pk?: Maybe<clients>;
	/** delete data from the table: "expenses" */
	delete_expenses?: Maybe<expenses_mutation_response>;
	/** delete single row from the table: "expenses" */
	delete_expenses_by_pk?: Maybe<expenses>;
	/** delete data from the table: "expenses_types" */
	delete_expenses_types?: Maybe<expenses_types_mutation_response>;
	/** delete single row from the table: "expenses_types" */
	delete_expenses_types_by_pk?: Maybe<expenses_types>;
	/** delete data from the table: "leases" */
	delete_leases?: Maybe<leases_mutation_response>;
	/** delete single row from the table: "leases" */
	delete_leases_by_pk?: Maybe<leases>;
	/** delete data from the table: "listings" */
	delete_listings?: Maybe<listings_mutation_response>;
	/** delete single row from the table: "listings" */
	delete_listings_by_pk?: Maybe<listings>;
	/** delete data from the table: "maintenance_orders" */
	delete_maintenance_orders?: Maybe<maintenance_orders_mutation_response>;
	/** delete single row from the table: "maintenance_orders" */
	delete_maintenance_orders_by_pk?: Maybe<maintenance_orders>;
	/** delete data from the table: "properties" */
	delete_properties?: Maybe<properties_mutation_response>;
	/** delete single row from the table: "properties" */
	delete_properties_by_pk?: Maybe<properties>;
	/** delete data from the table: "tenants" */
	delete_tenants?: Maybe<tenants_mutation_response>;
	/** delete single row from the table: "tenants" */
	delete_tenants_by_pk?: Maybe<tenants>;
	/** delete data from the table: "transactions" */
	delete_transactions?: Maybe<transactions_mutation_response>;
	/** delete single row from the table: "transactions" */
	delete_transactions_by_pk?: Maybe<transactions>;
	/** delete data from the table: "units" */
	delete_units?: Maybe<units_mutation_response>;
	/** delete single row from the table: "units" */
	delete_units_by_pk?: Maybe<units>;
	/** delete data from the table: "users" */
	delete_users?: Maybe<users_mutation_response>;
	/** delete single row from the table: "users" */
	delete_users_by_pk?: Maybe<users>;
	/** insert data into the table: "clients" */
	insert_clients?: Maybe<clients_mutation_response>;
	/** insert a single row into the table: "clients" */
	insert_clients_one?: Maybe<clients>;
	/** insert data into the table: "expenses" */
	insert_expenses?: Maybe<expenses_mutation_response>;
	/** insert a single row into the table: "expenses" */
	insert_expenses_one?: Maybe<expenses>;
	/** insert data into the table: "expenses_types" */
	insert_expenses_types?: Maybe<expenses_types_mutation_response>;
	/** insert a single row into the table: "expenses_types" */
	insert_expenses_types_one?: Maybe<expenses_types>;
	/** insert data into the table: "leases" */
	insert_leases?: Maybe<leases_mutation_response>;
	/** insert a single row into the table: "leases" */
	insert_leases_one?: Maybe<leases>;
	/** insert data into the table: "listings" */
	insert_listings?: Maybe<listings_mutation_response>;
	/** insert a single row into the table: "listings" */
	insert_listings_one?: Maybe<listings>;
	/** insert data into the table: "maintenance_orders" */
	insert_maintenance_orders?: Maybe<maintenance_orders_mutation_response>;
	/** insert a single row into the table: "maintenance_orders" */
	insert_maintenance_orders_one?: Maybe<maintenance_orders>;
	/** insert data into the table: "properties" */
	insert_properties?: Maybe<properties_mutation_response>;
	/** insert a single row into the table: "properties" */
	insert_properties_one?: Maybe<properties>;
	/** insert data into the table: "tenants" */
	insert_tenants?: Maybe<tenants_mutation_response>;
	/** insert a single row into the table: "tenants" */
	insert_tenants_one?: Maybe<tenants>;
	/** insert data into the table: "transactions" */
	insert_transactions?: Maybe<transactions_mutation_response>;
	/** insert a single row into the table: "transactions" */
	insert_transactions_one?: Maybe<transactions>;
	/** insert data into the table: "units" */
	insert_units?: Maybe<units_mutation_response>;
	/** insert a single row into the table: "units" */
	insert_units_one?: Maybe<units>;
	/** insert data into the table: "users" */
	insert_users?: Maybe<users_mutation_response>;
	/** insert a single row into the table: "users" */
	insert_users_one?: Maybe<users>;
	/** update data of the table: "clients" */
	update_clients?: Maybe<clients_mutation_response>;
	/** update single row of the table: "clients" */
	update_clients_by_pk?: Maybe<clients>;
	/** update data of the table: "expenses" */
	update_expenses?: Maybe<expenses_mutation_response>;
	/** update single row of the table: "expenses" */
	update_expenses_by_pk?: Maybe<expenses>;
	/** update data of the table: "expenses_types" */
	update_expenses_types?: Maybe<expenses_types_mutation_response>;
	/** update single row of the table: "expenses_types" */
	update_expenses_types_by_pk?: Maybe<expenses_types>;
	/** update data of the table: "leases" */
	update_leases?: Maybe<leases_mutation_response>;
	/** update single row of the table: "leases" */
	update_leases_by_pk?: Maybe<leases>;
	/** update data of the table: "listings" */
	update_listings?: Maybe<listings_mutation_response>;
	/** update single row of the table: "listings" */
	update_listings_by_pk?: Maybe<listings>;
	/** update data of the table: "maintenance_orders" */
	update_maintenance_orders?: Maybe<maintenance_orders_mutation_response>;
	/** update single row of the table: "maintenance_orders" */
	update_maintenance_orders_by_pk?: Maybe<maintenance_orders>;
	/** update data of the table: "properties" */
	update_properties?: Maybe<properties_mutation_response>;
	/** update single row of the table: "properties" */
	update_properties_by_pk?: Maybe<properties>;
	/** update data of the table: "tenants" */
	update_tenants?: Maybe<tenants_mutation_response>;
	/** update single row of the table: "tenants" */
	update_tenants_by_pk?: Maybe<tenants>;
	/** update data of the table: "transactions" */
	update_transactions?: Maybe<transactions_mutation_response>;
	/** update single row of the table: "transactions" */
	update_transactions_by_pk?: Maybe<transactions>;
	/** update data of the table: "units" */
	update_units?: Maybe<units_mutation_response>;
	/** update single row of the table: "units" */
	update_units_by_pk?: Maybe<units>;
	/** update data of the table: "users" */
	update_users?: Maybe<users_mutation_response>;
	/** update single row of the table: "users" */
	update_users_by_pk?: Maybe<users>;
};

/** mutation root */
export type mutation_rootdelete_clientsArgs = {
	where: clients_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_clients_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_expensesArgs = {
	where: expenses_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_expenses_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_expenses_typesArgs = {
	where: expenses_types_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_expenses_types_by_pkArgs = {
	value: Scalars['String'];
};

/** mutation root */
export type mutation_rootdelete_leasesArgs = {
	where: leases_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_leases_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_listingsArgs = {
	where: listings_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_listings_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_maintenance_ordersArgs = {
	where: maintenance_orders_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_maintenance_orders_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_propertiesArgs = {
	where: properties_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_properties_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_tenantsArgs = {
	where: tenants_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_tenants_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_transactionsArgs = {
	where: transactions_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_transactions_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_unitsArgs = {
	where: units_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_units_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootdelete_usersArgs = {
	where: users_bool_exp;
};

/** mutation root */
export type mutation_rootdelete_users_by_pkArgs = {
	id: Scalars['Int'];
};

/** mutation root */
export type mutation_rootinsert_clientsArgs = {
	objects: Array<clients_insert_input>;
	on_conflict?: InputMaybe<clients_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_clients_oneArgs = {
	object: clients_insert_input;
	on_conflict?: InputMaybe<clients_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_expensesArgs = {
	objects: Array<expenses_insert_input>;
	on_conflict?: InputMaybe<expenses_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_expenses_oneArgs = {
	object: expenses_insert_input;
	on_conflict?: InputMaybe<expenses_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_expenses_typesArgs = {
	objects: Array<expenses_types_insert_input>;
	on_conflict?: InputMaybe<expenses_types_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_expenses_types_oneArgs = {
	object: expenses_types_insert_input;
	on_conflict?: InputMaybe<expenses_types_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_leasesArgs = {
	objects: Array<leases_insert_input>;
	on_conflict?: InputMaybe<leases_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_leases_oneArgs = {
	object: leases_insert_input;
	on_conflict?: InputMaybe<leases_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_listingsArgs = {
	objects: Array<listings_insert_input>;
	on_conflict?: InputMaybe<listings_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_listings_oneArgs = {
	object: listings_insert_input;
	on_conflict?: InputMaybe<listings_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_maintenance_ordersArgs = {
	objects: Array<maintenance_orders_insert_input>;
	on_conflict?: InputMaybe<maintenance_orders_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_maintenance_orders_oneArgs = {
	object: maintenance_orders_insert_input;
	on_conflict?: InputMaybe<maintenance_orders_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_propertiesArgs = {
	objects: Array<properties_insert_input>;
	on_conflict?: InputMaybe<properties_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_properties_oneArgs = {
	object: properties_insert_input;
	on_conflict?: InputMaybe<properties_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_tenantsArgs = {
	objects: Array<tenants_insert_input>;
	on_conflict?: InputMaybe<tenants_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_tenants_oneArgs = {
	object: tenants_insert_input;
	on_conflict?: InputMaybe<tenants_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_transactionsArgs = {
	objects: Array<transactions_insert_input>;
	on_conflict?: InputMaybe<transactions_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_transactions_oneArgs = {
	object: transactions_insert_input;
	on_conflict?: InputMaybe<transactions_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_unitsArgs = {
	objects: Array<units_insert_input>;
	on_conflict?: InputMaybe<units_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_units_oneArgs = {
	object: units_insert_input;
	on_conflict?: InputMaybe<units_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_usersArgs = {
	objects: Array<users_insert_input>;
	on_conflict?: InputMaybe<users_on_conflict>;
};

/** mutation root */
export type mutation_rootinsert_users_oneArgs = {
	object: users_insert_input;
	on_conflict?: InputMaybe<users_on_conflict>;
};

/** mutation root */
export type mutation_rootupdate_clientsArgs = {
	_inc?: InputMaybe<clients_inc_input>;
	_set?: InputMaybe<clients_set_input>;
	where: clients_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_clients_by_pkArgs = {
	_inc?: InputMaybe<clients_inc_input>;
	_set?: InputMaybe<clients_set_input>;
	pk_columns: clients_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_expensesArgs = {
	_inc?: InputMaybe<expenses_inc_input>;
	_set?: InputMaybe<expenses_set_input>;
	where: expenses_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_expenses_by_pkArgs = {
	_inc?: InputMaybe<expenses_inc_input>;
	_set?: InputMaybe<expenses_set_input>;
	pk_columns: expenses_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_expenses_typesArgs = {
	_set?: InputMaybe<expenses_types_set_input>;
	where: expenses_types_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_expenses_types_by_pkArgs = {
	_set?: InputMaybe<expenses_types_set_input>;
	pk_columns: expenses_types_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_leasesArgs = {
	_inc?: InputMaybe<leases_inc_input>;
	_set?: InputMaybe<leases_set_input>;
	where: leases_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_leases_by_pkArgs = {
	_inc?: InputMaybe<leases_inc_input>;
	_set?: InputMaybe<leases_set_input>;
	pk_columns: leases_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_listingsArgs = {
	_inc?: InputMaybe<listings_inc_input>;
	_set?: InputMaybe<listings_set_input>;
	where: listings_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_listings_by_pkArgs = {
	_inc?: InputMaybe<listings_inc_input>;
	_set?: InputMaybe<listings_set_input>;
	pk_columns: listings_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_maintenance_ordersArgs = {
	_inc?: InputMaybe<maintenance_orders_inc_input>;
	_set?: InputMaybe<maintenance_orders_set_input>;
	where: maintenance_orders_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_maintenance_orders_by_pkArgs = {
	_inc?: InputMaybe<maintenance_orders_inc_input>;
	_set?: InputMaybe<maintenance_orders_set_input>;
	pk_columns: maintenance_orders_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_propertiesArgs = {
	_inc?: InputMaybe<properties_inc_input>;
	_set?: InputMaybe<properties_set_input>;
	where: properties_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_properties_by_pkArgs = {
	_inc?: InputMaybe<properties_inc_input>;
	_set?: InputMaybe<properties_set_input>;
	pk_columns: properties_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_tenantsArgs = {
	_inc?: InputMaybe<tenants_inc_input>;
	_set?: InputMaybe<tenants_set_input>;
	where: tenants_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_tenants_by_pkArgs = {
	_inc?: InputMaybe<tenants_inc_input>;
	_set?: InputMaybe<tenants_set_input>;
	pk_columns: tenants_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_transactionsArgs = {
	_inc?: InputMaybe<transactions_inc_input>;
	_set?: InputMaybe<transactions_set_input>;
	where: transactions_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_transactions_by_pkArgs = {
	_inc?: InputMaybe<transactions_inc_input>;
	_set?: InputMaybe<transactions_set_input>;
	pk_columns: transactions_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_unitsArgs = {
	_inc?: InputMaybe<units_inc_input>;
	_set?: InputMaybe<units_set_input>;
	where: units_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_units_by_pkArgs = {
	_inc?: InputMaybe<units_inc_input>;
	_set?: InputMaybe<units_set_input>;
	pk_columns: units_pk_columns_input;
};

/** mutation root */
export type mutation_rootupdate_usersArgs = {
	_inc?: InputMaybe<users_inc_input>;
	_set?: InputMaybe<users_set_input>;
	where: users_bool_exp;
};

/** mutation root */
export type mutation_rootupdate_users_by_pkArgs = {
	_inc?: InputMaybe<users_inc_input>;
	_set?: InputMaybe<users_set_input>;
	pk_columns: users_pk_columns_input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type numeric_comparison_exp = {
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
export enum order_by {
	/** in ascending order, nulls last */
	asc = 'asc',
	/** in ascending order, nulls first */
	asc_nulls_first = 'asc_nulls_first',
	/** in ascending order, nulls last */
	asc_nulls_last = 'asc_nulls_last',
	/** in descending order, nulls first */
	desc = 'desc',
	/** in descending order, nulls first */
	desc_nulls_first = 'desc_nulls_first',
	/** in descending order, nulls last */
	desc_nulls_last = 'desc_nulls_last',
}

/** Boolean expression to compare columns of type "point". All fields are combined with logical 'AND'. */
export type point_comparison_exp = {
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
export type properties = {
	__typename?: 'properties';
	area?: Maybe<Scalars['String']>;
	avenue?: Maybe<Scalars['String']>;
	block?: Maybe<Scalars['String']>;
	/** An object relationship */
	client?: Maybe<clients>;
	client_id?: Maybe<Scalars['Int']>;
	coordinates?: Maybe<Scalars['point']>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	id: Scalars['Int'];
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	number?: Maybe<Scalars['String']>;
	street?: Maybe<Scalars['String']>;
	/** An array relationship */
	units: Array<units>;
	/** An aggregate relationship */
	units_aggregate: units_aggregate;
};

/** columns and relationships of "properties" */
export type propertiesexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "properties" */
export type propertiesexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "properties" */
export type propertiesmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "properties" */
export type propertiesmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "properties" */
export type propertiesunitsArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

/** columns and relationships of "properties" */
export type propertiesunits_aggregateArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

/** aggregated selection of "properties" */
export type properties_aggregate = {
	__typename?: 'properties_aggregate';
	aggregate?: Maybe<properties_aggregate_fields>;
	nodes: Array<properties>;
};

/** aggregate fields of "properties" */
export type properties_aggregate_fields = {
	__typename?: 'properties_aggregate_fields';
	avg?: Maybe<properties_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<properties_max_fields>;
	min?: Maybe<properties_min_fields>;
	stddev?: Maybe<properties_stddev_fields>;
	stddev_pop?: Maybe<properties_stddev_pop_fields>;
	stddev_samp?: Maybe<properties_stddev_samp_fields>;
	sum?: Maybe<properties_sum_fields>;
	var_pop?: Maybe<properties_var_pop_fields>;
	var_samp?: Maybe<properties_var_samp_fields>;
	variance?: Maybe<properties_variance_fields>;
};

/** aggregate fields of "properties" */
export type properties_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<properties_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "properties" */
export type properties_aggregate_order_by = {
	avg?: InputMaybe<properties_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<properties_max_order_by>;
	min?: InputMaybe<properties_min_order_by>;
	stddev?: InputMaybe<properties_stddev_order_by>;
	stddev_pop?: InputMaybe<properties_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<properties_stddev_samp_order_by>;
	sum?: InputMaybe<properties_sum_order_by>;
	var_pop?: InputMaybe<properties_var_pop_order_by>;
	var_samp?: InputMaybe<properties_var_samp_order_by>;
	variance?: InputMaybe<properties_variance_order_by>;
};

/** input type for inserting array relation for remote table "properties" */
export type properties_arr_rel_insert_input = {
	data: Array<properties_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<properties_on_conflict>;
};

/** aggregate avg on columns */
export type properties_avg_fields = {
	__typename?: 'properties_avg_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "properties" */
export type properties_avg_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "properties". All fields are combined with a logical 'AND'. */
export type properties_bool_exp = {
	_and?: InputMaybe<Array<properties_bool_exp>>;
	_not?: InputMaybe<properties_bool_exp>;
	_or?: InputMaybe<Array<properties_bool_exp>>;
	area?: InputMaybe<String_comparison_exp>;
	avenue?: InputMaybe<String_comparison_exp>;
	block?: InputMaybe<String_comparison_exp>;
	client?: InputMaybe<clients_bool_exp>;
	client_id?: InputMaybe<Int_comparison_exp>;
	coordinates?: InputMaybe<point_comparison_exp>;
	expenses?: InputMaybe<expenses_bool_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	maintenance_orders?: InputMaybe<maintenance_orders_bool_exp>;
	number?: InputMaybe<String_comparison_exp>;
	street?: InputMaybe<String_comparison_exp>;
	units?: InputMaybe<units_bool_exp>;
};

/** unique or primary key constraints on table "properties" */
export enum properties_constraint {
	/** unique or primary key constraint */
	properties_pkey = 'properties_pkey',
}

/** input type for incrementing numeric columns in table "properties" */
export type properties_inc_input = {
	client_id?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "properties" */
export type properties_insert_input = {
	area?: InputMaybe<Scalars['String']>;
	avenue?: InputMaybe<Scalars['String']>;
	block?: InputMaybe<Scalars['String']>;
	client?: InputMaybe<clients_obj_rel_insert_input>;
	client_id?: InputMaybe<Scalars['Int']>;
	coordinates?: InputMaybe<Scalars['point']>;
	expenses?: InputMaybe<expenses_arr_rel_insert_input>;
	id?: InputMaybe<Scalars['Int']>;
	maintenance_orders?: InputMaybe<maintenance_orders_arr_rel_insert_input>;
	number?: InputMaybe<Scalars['String']>;
	street?: InputMaybe<Scalars['String']>;
	units?: InputMaybe<units_arr_rel_insert_input>;
};

/** aggregate max on columns */
export type properties_max_fields = {
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
export type properties_max_order_by = {
	area?: InputMaybe<order_by>;
	avenue?: InputMaybe<order_by>;
	block?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	number?: InputMaybe<order_by>;
	street?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type properties_min_fields = {
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
export type properties_min_order_by = {
	area?: InputMaybe<order_by>;
	avenue?: InputMaybe<order_by>;
	block?: InputMaybe<order_by>;
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	number?: InputMaybe<order_by>;
	street?: InputMaybe<order_by>;
};

/** response of any mutation on the table "properties" */
export type properties_mutation_response = {
	__typename?: 'properties_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<properties>;
};

/** input type for inserting object relation for remote table "properties" */
export type properties_obj_rel_insert_input = {
	data: properties_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<properties_on_conflict>;
};

/** on conflict condition type for table "properties" */
export type properties_on_conflict = {
	constraint: properties_constraint;
	update_columns?: Array<properties_update_column>;
	where?: InputMaybe<properties_bool_exp>;
};

/** Ordering options when selecting data from "properties". */
export type properties_order_by = {
	area?: InputMaybe<order_by>;
	avenue?: InputMaybe<order_by>;
	block?: InputMaybe<order_by>;
	client?: InputMaybe<clients_order_by>;
	client_id?: InputMaybe<order_by>;
	coordinates?: InputMaybe<order_by>;
	expenses_aggregate?: InputMaybe<expenses_aggregate_order_by>;
	id?: InputMaybe<order_by>;
	maintenance_orders_aggregate?: InputMaybe<maintenance_orders_aggregate_order_by>;
	number?: InputMaybe<order_by>;
	street?: InputMaybe<order_by>;
	units_aggregate?: InputMaybe<units_aggregate_order_by>;
};

/** primary key columns input for table: properties */
export type properties_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "properties" */
export enum properties_select_column {
	/** column name */
	area = 'area',
	/** column name */
	avenue = 'avenue',
	/** column name */
	block = 'block',
	/** column name */
	client_id = 'client_id',
	/** column name */
	coordinates = 'coordinates',
	/** column name */
	id = 'id',
	/** column name */
	number = 'number',
	/** column name */
	street = 'street',
}

/** input type for updating data in table "properties" */
export type properties_set_input = {
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
export type properties_stddev_fields = {
	__typename?: 'properties_stddev_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "properties" */
export type properties_stddev_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type properties_stddev_pop_fields = {
	__typename?: 'properties_stddev_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "properties" */
export type properties_stddev_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type properties_stddev_samp_fields = {
	__typename?: 'properties_stddev_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "properties" */
export type properties_stddev_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type properties_sum_fields = {
	__typename?: 'properties_sum_fields';
	client_id?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "properties" */
export type properties_sum_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** update columns of table "properties" */
export enum properties_update_column {
	/** column name */
	area = 'area',
	/** column name */
	avenue = 'avenue',
	/** column name */
	block = 'block',
	/** column name */
	client_id = 'client_id',
	/** column name */
	coordinates = 'coordinates',
	/** column name */
	id = 'id',
	/** column name */
	number = 'number',
	/** column name */
	street = 'street',
}

/** aggregate var_pop on columns */
export type properties_var_pop_fields = {
	__typename?: 'properties_var_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "properties" */
export type properties_var_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type properties_var_samp_fields = {
	__typename?: 'properties_var_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "properties" */
export type properties_var_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type properties_variance_fields = {
	__typename?: 'properties_variance_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "properties" */
export type properties_variance_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
};

export type query_root = {
	__typename?: 'query_root';
	/** fetch data from the table: "clients" */
	clients: Array<clients>;
	/** fetch aggregated fields from the table: "clients" */
	clients_aggregate: clients_aggregate;
	/** fetch data from the table: "clients" using primary key columns */
	clients_by_pk?: Maybe<clients>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	/** fetch data from the table: "expenses" using primary key columns */
	expenses_by_pk?: Maybe<expenses>;
	/** fetch data from the table: "expenses_types" */
	expenses_types: Array<expenses_types>;
	/** fetch aggregated fields from the table: "expenses_types" */
	expenses_types_aggregate: expenses_types_aggregate;
	/** fetch data from the table: "expenses_types" using primary key columns */
	expenses_types_by_pk?: Maybe<expenses_types>;
	/** An array relationship */
	leases: Array<leases>;
	/** An aggregate relationship */
	leases_aggregate: leases_aggregate;
	/** fetch data from the table: "leases" using primary key columns */
	leases_by_pk?: Maybe<leases>;
	/** An array relationship */
	listings: Array<listings>;
	/** An aggregate relationship */
	listings_aggregate: listings_aggregate;
	/** fetch data from the table: "listings" using primary key columns */
	listings_by_pk?: Maybe<listings>;
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	/** fetch data from the table: "maintenance_orders" using primary key columns */
	maintenance_orders_by_pk?: Maybe<maintenance_orders>;
	/** An array relationship */
	properties: Array<properties>;
	/** An aggregate relationship */
	properties_aggregate: properties_aggregate;
	/** fetch data from the table: "properties" using primary key columns */
	properties_by_pk?: Maybe<properties>;
	/** fetch data from the table: "tenants" */
	tenants: Array<tenants>;
	/** fetch aggregated fields from the table: "tenants" */
	tenants_aggregate: tenants_aggregate;
	/** fetch data from the table: "tenants" using primary key columns */
	tenants_by_pk?: Maybe<tenants>;
	/** An array relationship */
	transactions: Array<transactions>;
	/** An aggregate relationship */
	transactions_aggregate: transactions_aggregate;
	/** fetch data from the table: "transactions" using primary key columns */
	transactions_by_pk?: Maybe<transactions>;
	/** An array relationship */
	units: Array<units>;
	/** An aggregate relationship */
	units_aggregate: units_aggregate;
	/** fetch data from the table: "units" using primary key columns */
	units_by_pk?: Maybe<units>;
	/** An array relationship */
	users: Array<users>;
	/** An aggregate relationship */
	users_aggregate: users_aggregate;
	/** fetch data from the table: "users" using primary key columns */
	users_by_pk?: Maybe<users>;
};

export type query_rootclientsArgs = {
	distinct_on?: InputMaybe<Array<clients_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<clients_order_by>>;
	where?: InputMaybe<clients_bool_exp>;
};

export type query_rootclients_aggregateArgs = {
	distinct_on?: InputMaybe<Array<clients_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<clients_order_by>>;
	where?: InputMaybe<clients_bool_exp>;
};

export type query_rootclients_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

export type query_rootexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

export type query_rootexpenses_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootexpenses_typesArgs = {
	distinct_on?: InputMaybe<Array<expenses_types_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_types_order_by>>;
	where?: InputMaybe<expenses_types_bool_exp>;
};

export type query_rootexpenses_types_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_types_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_types_order_by>>;
	where?: InputMaybe<expenses_types_bool_exp>;
};

export type query_rootexpenses_types_by_pkArgs = {
	value: Scalars['String'];
};

export type query_rootleasesArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

export type query_rootleases_aggregateArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

export type query_rootleases_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootlistingsArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

export type query_rootlistings_aggregateArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

export type query_rootlistings_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

export type query_rootmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

export type query_rootmaintenance_orders_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootpropertiesArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

export type query_rootproperties_aggregateArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

export type query_rootproperties_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_roottenantsArgs = {
	distinct_on?: InputMaybe<Array<tenants_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<tenants_order_by>>;
	where?: InputMaybe<tenants_bool_exp>;
};

export type query_roottenants_aggregateArgs = {
	distinct_on?: InputMaybe<Array<tenants_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<tenants_order_by>>;
	where?: InputMaybe<tenants_bool_exp>;
};

export type query_roottenants_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_roottransactionsArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

export type query_roottransactions_aggregateArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

export type query_roottransactions_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootunitsArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

export type query_rootunits_aggregateArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

export type query_rootunits_by_pkArgs = {
	id: Scalars['Int'];
};

export type query_rootusersArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

export type query_rootusers_aggregateArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

export type query_rootusers_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_root = {
	__typename?: 'subscription_root';
	/** fetch data from the table: "clients" */
	clients: Array<clients>;
	/** fetch aggregated fields from the table: "clients" */
	clients_aggregate: clients_aggregate;
	/** fetch data from the table: "clients" using primary key columns */
	clients_by_pk?: Maybe<clients>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	/** fetch data from the table: "expenses" using primary key columns */
	expenses_by_pk?: Maybe<expenses>;
	/** fetch data from the table: "expenses_types" */
	expenses_types: Array<expenses_types>;
	/** fetch aggregated fields from the table: "expenses_types" */
	expenses_types_aggregate: expenses_types_aggregate;
	/** fetch data from the table: "expenses_types" using primary key columns */
	expenses_types_by_pk?: Maybe<expenses_types>;
	/** An array relationship */
	leases: Array<leases>;
	/** An aggregate relationship */
	leases_aggregate: leases_aggregate;
	/** fetch data from the table: "leases" using primary key columns */
	leases_by_pk?: Maybe<leases>;
	/** An array relationship */
	listings: Array<listings>;
	/** An aggregate relationship */
	listings_aggregate: listings_aggregate;
	/** fetch data from the table: "listings" using primary key columns */
	listings_by_pk?: Maybe<listings>;
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	/** fetch data from the table: "maintenance_orders" using primary key columns */
	maintenance_orders_by_pk?: Maybe<maintenance_orders>;
	/** An array relationship */
	properties: Array<properties>;
	/** An aggregate relationship */
	properties_aggregate: properties_aggregate;
	/** fetch data from the table: "properties" using primary key columns */
	properties_by_pk?: Maybe<properties>;
	/** fetch data from the table: "tenants" */
	tenants: Array<tenants>;
	/** fetch aggregated fields from the table: "tenants" */
	tenants_aggregate: tenants_aggregate;
	/** fetch data from the table: "tenants" using primary key columns */
	tenants_by_pk?: Maybe<tenants>;
	/** An array relationship */
	transactions: Array<transactions>;
	/** An aggregate relationship */
	transactions_aggregate: transactions_aggregate;
	/** fetch data from the table: "transactions" using primary key columns */
	transactions_by_pk?: Maybe<transactions>;
	/** An array relationship */
	units: Array<units>;
	/** An aggregate relationship */
	units_aggregate: units_aggregate;
	/** fetch data from the table: "units" using primary key columns */
	units_by_pk?: Maybe<units>;
	/** An array relationship */
	users: Array<users>;
	/** An aggregate relationship */
	users_aggregate: users_aggregate;
	/** fetch data from the table: "users" using primary key columns */
	users_by_pk?: Maybe<users>;
};

export type subscription_rootclientsArgs = {
	distinct_on?: InputMaybe<Array<clients_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<clients_order_by>>;
	where?: InputMaybe<clients_bool_exp>;
};

export type subscription_rootclients_aggregateArgs = {
	distinct_on?: InputMaybe<Array<clients_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<clients_order_by>>;
	where?: InputMaybe<clients_bool_exp>;
};

export type subscription_rootclients_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

export type subscription_rootexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

export type subscription_rootexpenses_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootexpenses_typesArgs = {
	distinct_on?: InputMaybe<Array<expenses_types_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_types_order_by>>;
	where?: InputMaybe<expenses_types_bool_exp>;
};

export type subscription_rootexpenses_types_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_types_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_types_order_by>>;
	where?: InputMaybe<expenses_types_bool_exp>;
};

export type subscription_rootexpenses_types_by_pkArgs = {
	value: Scalars['String'];
};

export type subscription_rootleasesArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

export type subscription_rootleases_aggregateArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

export type subscription_rootleases_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootlistingsArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

export type subscription_rootlistings_aggregateArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

export type subscription_rootlistings_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

export type subscription_rootmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

export type subscription_rootmaintenance_orders_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootpropertiesArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

export type subscription_rootproperties_aggregateArgs = {
	distinct_on?: InputMaybe<Array<properties_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by>>;
	where?: InputMaybe<properties_bool_exp>;
};

export type subscription_rootproperties_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_roottenantsArgs = {
	distinct_on?: InputMaybe<Array<tenants_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<tenants_order_by>>;
	where?: InputMaybe<tenants_bool_exp>;
};

export type subscription_roottenants_aggregateArgs = {
	distinct_on?: InputMaybe<Array<tenants_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<tenants_order_by>>;
	where?: InputMaybe<tenants_bool_exp>;
};

export type subscription_roottenants_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_roottransactionsArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

export type subscription_roottransactions_aggregateArgs = {
	distinct_on?: InputMaybe<Array<transactions_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<transactions_order_by>>;
	where?: InputMaybe<transactions_bool_exp>;
};

export type subscription_roottransactions_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootunitsArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

export type subscription_rootunits_aggregateArgs = {
	distinct_on?: InputMaybe<Array<units_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by>>;
	where?: InputMaybe<units_bool_exp>;
};

export type subscription_rootunits_by_pkArgs = {
	id: Scalars['Int'];
};

export type subscription_rootusersArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

export type subscription_rootusers_aggregateArgs = {
	distinct_on?: InputMaybe<Array<users_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<users_order_by>>;
	where?: InputMaybe<users_bool_exp>;
};

export type subscription_rootusers_by_pkArgs = {
	id: Scalars['Int'];
};

/** columns and relationships of "tenants" */
export type tenants = {
	__typename?: 'tenants';
	civilid?: Maybe<Scalars['bigint']>;
	dob?: Maybe<Scalars['date']>;
	email?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	id: Scalars['Int'];
	last_name?: Maybe<Scalars['String']>;
	/** An array relationship */
	leases: Array<leases>;
	/** An aggregate relationship */
	leases_aggregate: leases_aggregate;
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	phone?: Maybe<Scalars['String']>;
	second_name?: Maybe<Scalars['String']>;
	third_name?: Maybe<Scalars['String']>;
	/** An object relationship */
	user?: Maybe<users>;
};

/** columns and relationships of "tenants" */
export type tenantsleasesArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

/** columns and relationships of "tenants" */
export type tenantsleases_aggregateArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

/** columns and relationships of "tenants" */
export type tenantsmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "tenants" */
export type tenantsmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** aggregated selection of "tenants" */
export type tenants_aggregate = {
	__typename?: 'tenants_aggregate';
	aggregate?: Maybe<tenants_aggregate_fields>;
	nodes: Array<tenants>;
};

/** aggregate fields of "tenants" */
export type tenants_aggregate_fields = {
	__typename?: 'tenants_aggregate_fields';
	avg?: Maybe<tenants_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<tenants_max_fields>;
	min?: Maybe<tenants_min_fields>;
	stddev?: Maybe<tenants_stddev_fields>;
	stddev_pop?: Maybe<tenants_stddev_pop_fields>;
	stddev_samp?: Maybe<tenants_stddev_samp_fields>;
	sum?: Maybe<tenants_sum_fields>;
	var_pop?: Maybe<tenants_var_pop_fields>;
	var_samp?: Maybe<tenants_var_samp_fields>;
	variance?: Maybe<tenants_variance_fields>;
};

/** aggregate fields of "tenants" */
export type tenants_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<tenants_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type tenants_avg_fields = {
	__typename?: 'tenants_avg_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "tenants". All fields are combined with a logical 'AND'. */
export type tenants_bool_exp = {
	_and?: InputMaybe<Array<tenants_bool_exp>>;
	_not?: InputMaybe<tenants_bool_exp>;
	_or?: InputMaybe<Array<tenants_bool_exp>>;
	civilid?: InputMaybe<bigint_comparison_exp>;
	dob?: InputMaybe<date_comparison_exp>;
	email?: InputMaybe<String_comparison_exp>;
	first_name?: InputMaybe<String_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	last_name?: InputMaybe<String_comparison_exp>;
	leases?: InputMaybe<leases_bool_exp>;
	maintenance_orders?: InputMaybe<maintenance_orders_bool_exp>;
	phone?: InputMaybe<String_comparison_exp>;
	second_name?: InputMaybe<String_comparison_exp>;
	third_name?: InputMaybe<String_comparison_exp>;
	user?: InputMaybe<users_bool_exp>;
};

/** unique or primary key constraints on table "tenants" */
export enum tenants_constraint {
	/** unique or primary key constraint */
	tenants_pkey = 'tenants_pkey',
}

/** input type for incrementing numeric columns in table "tenants" */
export type tenants_inc_input = {
	civilid?: InputMaybe<Scalars['bigint']>;
	id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "tenants" */
export type tenants_insert_input = {
	civilid?: InputMaybe<Scalars['bigint']>;
	dob?: InputMaybe<Scalars['date']>;
	email?: InputMaybe<Scalars['String']>;
	first_name?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	last_name?: InputMaybe<Scalars['String']>;
	leases?: InputMaybe<leases_arr_rel_insert_input>;
	maintenance_orders?: InputMaybe<maintenance_orders_arr_rel_insert_input>;
	phone?: InputMaybe<Scalars['String']>;
	second_name?: InputMaybe<Scalars['String']>;
	third_name?: InputMaybe<Scalars['String']>;
	user?: InputMaybe<users_obj_rel_insert_input>;
};

/** aggregate max on columns */
export type tenants_max_fields = {
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
export type tenants_min_fields = {
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
export type tenants_mutation_response = {
	__typename?: 'tenants_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<tenants>;
};

/** input type for inserting object relation for remote table "tenants" */
export type tenants_obj_rel_insert_input = {
	data: tenants_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<tenants_on_conflict>;
};

/** on conflict condition type for table "tenants" */
export type tenants_on_conflict = {
	constraint: tenants_constraint;
	update_columns?: Array<tenants_update_column>;
	where?: InputMaybe<tenants_bool_exp>;
};

/** Ordering options when selecting data from "tenants". */
export type tenants_order_by = {
	civilid?: InputMaybe<order_by>;
	dob?: InputMaybe<order_by>;
	email?: InputMaybe<order_by>;
	first_name?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	last_name?: InputMaybe<order_by>;
	leases_aggregate?: InputMaybe<leases_aggregate_order_by>;
	maintenance_orders_aggregate?: InputMaybe<maintenance_orders_aggregate_order_by>;
	phone?: InputMaybe<order_by>;
	second_name?: InputMaybe<order_by>;
	third_name?: InputMaybe<order_by>;
	user?: InputMaybe<users_order_by>;
};

/** primary key columns input for table: tenants */
export type tenants_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "tenants" */
export enum tenants_select_column {
	/** column name */
	civilid = 'civilid',
	/** column name */
	dob = 'dob',
	/** column name */
	email = 'email',
	/** column name */
	first_name = 'first_name',
	/** column name */
	id = 'id',
	/** column name */
	last_name = 'last_name',
	/** column name */
	phone = 'phone',
	/** column name */
	second_name = 'second_name',
	/** column name */
	third_name = 'third_name',
}

/** input type for updating data in table "tenants" */
export type tenants_set_input = {
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
export type tenants_stddev_fields = {
	__typename?: 'tenants_stddev_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type tenants_stddev_pop_fields = {
	__typename?: 'tenants_stddev_pop_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type tenants_stddev_samp_fields = {
	__typename?: 'tenants_stddev_samp_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type tenants_sum_fields = {
	__typename?: 'tenants_sum_fields';
	civilid?: Maybe<Scalars['bigint']>;
	id?: Maybe<Scalars['Int']>;
};

/** update columns of table "tenants" */
export enum tenants_update_column {
	/** column name */
	civilid = 'civilid',
	/** column name */
	dob = 'dob',
	/** column name */
	email = 'email',
	/** column name */
	first_name = 'first_name',
	/** column name */
	id = 'id',
	/** column name */
	last_name = 'last_name',
	/** column name */
	phone = 'phone',
	/** column name */
	second_name = 'second_name',
	/** column name */
	third_name = 'third_name',
}

/** aggregate var_pop on columns */
export type tenants_var_pop_fields = {
	__typename?: 'tenants_var_pop_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type tenants_var_samp_fields = {
	__typename?: 'tenants_var_samp_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type tenants_variance_fields = {
	__typename?: 'tenants_variance_fields';
	civilid?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type timestamptz_comparison_exp = {
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
export type transactions = {
	__typename?: 'transactions';
	amount?: Maybe<Scalars['Int']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	due_date?: Maybe<Scalars['date']>;
	id: Scalars['Int'];
	is_paid?: Maybe<Scalars['Boolean']>;
	/** An object relationship */
	lease?: Maybe<leases>;
	lease_id?: Maybe<Scalars['Int']>;
	memo?: Maybe<Scalars['String']>;
	receipt_url?: Maybe<Scalars['String']>;
};

/** aggregated selection of "transactions" */
export type transactions_aggregate = {
	__typename?: 'transactions_aggregate';
	aggregate?: Maybe<transactions_aggregate_fields>;
	nodes: Array<transactions>;
};

/** aggregate fields of "transactions" */
export type transactions_aggregate_fields = {
	__typename?: 'transactions_aggregate_fields';
	avg?: Maybe<transactions_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<transactions_max_fields>;
	min?: Maybe<transactions_min_fields>;
	stddev?: Maybe<transactions_stddev_fields>;
	stddev_pop?: Maybe<transactions_stddev_pop_fields>;
	stddev_samp?: Maybe<transactions_stddev_samp_fields>;
	sum?: Maybe<transactions_sum_fields>;
	var_pop?: Maybe<transactions_var_pop_fields>;
	var_samp?: Maybe<transactions_var_samp_fields>;
	variance?: Maybe<transactions_variance_fields>;
};

/** aggregate fields of "transactions" */
export type transactions_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<transactions_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "transactions" */
export type transactions_aggregate_order_by = {
	avg?: InputMaybe<transactions_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<transactions_max_order_by>;
	min?: InputMaybe<transactions_min_order_by>;
	stddev?: InputMaybe<transactions_stddev_order_by>;
	stddev_pop?: InputMaybe<transactions_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<transactions_stddev_samp_order_by>;
	sum?: InputMaybe<transactions_sum_order_by>;
	var_pop?: InputMaybe<transactions_var_pop_order_by>;
	var_samp?: InputMaybe<transactions_var_samp_order_by>;
	variance?: InputMaybe<transactions_variance_order_by>;
};

/** input type for inserting array relation for remote table "transactions" */
export type transactions_arr_rel_insert_input = {
	data: Array<transactions_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<transactions_on_conflict>;
};

/** aggregate avg on columns */
export type transactions_avg_fields = {
	__typename?: 'transactions_avg_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transactions" */
export type transactions_avg_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type transactions_bool_exp = {
	_and?: InputMaybe<Array<transactions_bool_exp>>;
	_not?: InputMaybe<transactions_bool_exp>;
	_or?: InputMaybe<Array<transactions_bool_exp>>;
	amount?: InputMaybe<Int_comparison_exp>;
	created_at?: InputMaybe<timestamptz_comparison_exp>;
	due_date?: InputMaybe<date_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	is_paid?: InputMaybe<Boolean_comparison_exp>;
	lease?: InputMaybe<leases_bool_exp>;
	lease_id?: InputMaybe<Int_comparison_exp>;
	memo?: InputMaybe<String_comparison_exp>;
	receipt_url?: InputMaybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum transactions_constraint {
	/** unique or primary key constraint */
	transactions_pkey = 'transactions_pkey',
}

/** input type for incrementing numeric columns in table "transactions" */
export type transactions_inc_input = {
	amount?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
	lease_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "transactions" */
export type transactions_insert_input = {
	amount?: InputMaybe<Scalars['Int']>;
	created_at?: InputMaybe<Scalars['timestamptz']>;
	due_date?: InputMaybe<Scalars['date']>;
	id?: InputMaybe<Scalars['Int']>;
	is_paid?: InputMaybe<Scalars['Boolean']>;
	lease?: InputMaybe<leases_obj_rel_insert_input>;
	lease_id?: InputMaybe<Scalars['Int']>;
	memo?: InputMaybe<Scalars['String']>;
	receipt_url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type transactions_max_fields = {
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
export type transactions_max_order_by = {
	amount?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	due_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	receipt_url?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type transactions_min_fields = {
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
export type transactions_min_order_by = {
	amount?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	due_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	receipt_url?: InputMaybe<order_by>;
};

/** response of any mutation on the table "transactions" */
export type transactions_mutation_response = {
	__typename?: 'transactions_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<transactions>;
};

/** on conflict condition type for table "transactions" */
export type transactions_on_conflict = {
	constraint: transactions_constraint;
	update_columns?: Array<transactions_update_column>;
	where?: InputMaybe<transactions_bool_exp>;
};

/** Ordering options when selecting data from "transactions". */
export type transactions_order_by = {
	amount?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	due_date?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	is_paid?: InputMaybe<order_by>;
	lease?: InputMaybe<leases_order_by>;
	lease_id?: InputMaybe<order_by>;
	memo?: InputMaybe<order_by>;
	receipt_url?: InputMaybe<order_by>;
};

/** primary key columns input for table: transactions */
export type transactions_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "transactions" */
export enum transactions_select_column {
	/** column name */
	amount = 'amount',
	/** column name */
	created_at = 'created_at',
	/** column name */
	due_date = 'due_date',
	/** column name */
	id = 'id',
	/** column name */
	is_paid = 'is_paid',
	/** column name */
	lease_id = 'lease_id',
	/** column name */
	memo = 'memo',
	/** column name */
	receipt_url = 'receipt_url',
}

/** input type for updating data in table "transactions" */
export type transactions_set_input = {
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
export type transactions_stddev_fields = {
	__typename?: 'transactions_stddev_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "transactions" */
export type transactions_stddev_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type transactions_stddev_pop_fields = {
	__typename?: 'transactions_stddev_pop_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type transactions_stddev_pop_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type transactions_stddev_samp_fields = {
	__typename?: 'transactions_stddev_samp_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type transactions_stddev_samp_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type transactions_sum_fields = {
	__typename?: 'transactions_sum_fields';
	amount?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	lease_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "transactions" */
export type transactions_sum_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** update columns of table "transactions" */
export enum transactions_update_column {
	/** column name */
	amount = 'amount',
	/** column name */
	created_at = 'created_at',
	/** column name */
	due_date = 'due_date',
	/** column name */
	id = 'id',
	/** column name */
	is_paid = 'is_paid',
	/** column name */
	lease_id = 'lease_id',
	/** column name */
	memo = 'memo',
	/** column name */
	receipt_url = 'receipt_url',
}

/** aggregate var_pop on columns */
export type transactions_var_pop_fields = {
	__typename?: 'transactions_var_pop_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "transactions" */
export type transactions_var_pop_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type transactions_var_samp_fields = {
	__typename?: 'transactions_var_samp_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transactions" */
export type transactions_var_samp_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type transactions_variance_fields = {
	__typename?: 'transactions_variance_fields';
	amount?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	lease_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transactions" */
export type transactions_variance_order_by = {
	amount?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	lease_id?: InputMaybe<order_by>;
};

/** columns and relationships of "units" */
export type units = {
	__typename?: 'units';
	bath?: Maybe<Scalars['numeric']>;
	bed?: Maybe<Scalars['numeric']>;
	/** A computed field, executes function "client_id" */
	client_id_s?: Maybe<Scalars['Int']>;
	/** fetch data from the table: "expenses" */
	expenses: Array<expenses>;
	/** An aggregate relationship */
	expenses_aggregate: expenses_aggregate;
	floor?: Maybe<Scalars['String']>;
	id: Scalars['Int'];
	/** A computed field, executes function "is_vacant" */
	is_vacant?: Maybe<Scalars['Boolean']>;
	/** An array relationship */
	leases: Array<leases>;
	/** An aggregate relationship */
	leases_aggregate: leases_aggregate;
	/** An array relationship */
	listings: Array<listings>;
	/** An aggregate relationship */
	listings_aggregate: listings_aggregate;
	/** An array relationship */
	maintenance_orders: Array<maintenance_orders>;
	/** An aggregate relationship */
	maintenance_orders_aggregate: maintenance_orders_aggregate;
	/** An object relationship */
	property?: Maybe<properties>;
	property_id?: Maybe<Scalars['Int']>;
	rent_market?: Maybe<Scalars['Int']>;
	size?: Maybe<Scalars['Int']>;
	type?: Maybe<Scalars['String']>;
	unit_number?: Maybe<Scalars['String']>;
	usage?: Maybe<Scalars['String']>;
};

/** columns and relationships of "units" */
export type unitsexpensesArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "units" */
export type unitsexpenses_aggregateArgs = {
	distinct_on?: InputMaybe<Array<expenses_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<expenses_order_by>>;
	where?: InputMaybe<expenses_bool_exp>;
};

/** columns and relationships of "units" */
export type unitsleasesArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

/** columns and relationships of "units" */
export type unitsleases_aggregateArgs = {
	distinct_on?: InputMaybe<Array<leases_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by>>;
	where?: InputMaybe<leases_bool_exp>;
};

/** columns and relationships of "units" */
export type unitslistingsArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

/** columns and relationships of "units" */
export type unitslistings_aggregateArgs = {
	distinct_on?: InputMaybe<Array<listings_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<listings_order_by>>;
	where?: InputMaybe<listings_bool_exp>;
};

/** columns and relationships of "units" */
export type unitsmaintenance_ordersArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** columns and relationships of "units" */
export type unitsmaintenance_orders_aggregateArgs = {
	distinct_on?: InputMaybe<Array<maintenance_orders_select_column>>;
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<maintenance_orders_order_by>>;
	where?: InputMaybe<maintenance_orders_bool_exp>;
};

/** aggregated selection of "units" */
export type units_aggregate = {
	__typename?: 'units_aggregate';
	aggregate?: Maybe<units_aggregate_fields>;
	nodes: Array<units>;
};

/** aggregate fields of "units" */
export type units_aggregate_fields = {
	__typename?: 'units_aggregate_fields';
	avg?: Maybe<units_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<units_max_fields>;
	min?: Maybe<units_min_fields>;
	stddev?: Maybe<units_stddev_fields>;
	stddev_pop?: Maybe<units_stddev_pop_fields>;
	stddev_samp?: Maybe<units_stddev_samp_fields>;
	sum?: Maybe<units_sum_fields>;
	var_pop?: Maybe<units_var_pop_fields>;
	var_samp?: Maybe<units_var_samp_fields>;
	variance?: Maybe<units_variance_fields>;
};

/** aggregate fields of "units" */
export type units_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<units_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "units" */
export type units_aggregate_order_by = {
	avg?: InputMaybe<units_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<units_max_order_by>;
	min?: InputMaybe<units_min_order_by>;
	stddev?: InputMaybe<units_stddev_order_by>;
	stddev_pop?: InputMaybe<units_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<units_stddev_samp_order_by>;
	sum?: InputMaybe<units_sum_order_by>;
	var_pop?: InputMaybe<units_var_pop_order_by>;
	var_samp?: InputMaybe<units_var_samp_order_by>;
	variance?: InputMaybe<units_variance_order_by>;
};

/** input type for inserting array relation for remote table "units" */
export type units_arr_rel_insert_input = {
	data: Array<units_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<units_on_conflict>;
};

/** aggregate avg on columns */
export type units_avg_fields = {
	__typename?: 'units_avg_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "units" */
export type units_avg_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "units". All fields are combined with a logical 'AND'. */
export type units_bool_exp = {
	_and?: InputMaybe<Array<units_bool_exp>>;
	_not?: InputMaybe<units_bool_exp>;
	_or?: InputMaybe<Array<units_bool_exp>>;
	bath?: InputMaybe<numeric_comparison_exp>;
	bed?: InputMaybe<numeric_comparison_exp>;
	client_id_s?: InputMaybe<Int_comparison_exp>;
	expenses?: InputMaybe<expenses_bool_exp>;
	floor?: InputMaybe<String_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	is_vacant?: InputMaybe<Boolean_comparison_exp>;
	leases?: InputMaybe<leases_bool_exp>;
	listings?: InputMaybe<listings_bool_exp>;
	maintenance_orders?: InputMaybe<maintenance_orders_bool_exp>;
	property?: InputMaybe<properties_bool_exp>;
	property_id?: InputMaybe<Int_comparison_exp>;
	rent_market?: InputMaybe<Int_comparison_exp>;
	size?: InputMaybe<Int_comparison_exp>;
	type?: InputMaybe<String_comparison_exp>;
	unit_number?: InputMaybe<String_comparison_exp>;
	usage?: InputMaybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "units" */
export enum units_constraint {
	/** unique or primary key constraint */
	units_pkey = 'units_pkey',
}

/** input type for incrementing numeric columns in table "units" */
export type units_inc_input = {
	bath?: InputMaybe<Scalars['numeric']>;
	bed?: InputMaybe<Scalars['numeric']>;
	id?: InputMaybe<Scalars['Int']>;
	property_id?: InputMaybe<Scalars['Int']>;
	rent_market?: InputMaybe<Scalars['Int']>;
	size?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "units" */
export type units_insert_input = {
	bath?: InputMaybe<Scalars['numeric']>;
	bed?: InputMaybe<Scalars['numeric']>;
	expenses?: InputMaybe<expenses_arr_rel_insert_input>;
	floor?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	leases?: InputMaybe<leases_arr_rel_insert_input>;
	listings?: InputMaybe<listings_arr_rel_insert_input>;
	maintenance_orders?: InputMaybe<maintenance_orders_arr_rel_insert_input>;
	property?: InputMaybe<properties_obj_rel_insert_input>;
	property_id?: InputMaybe<Scalars['Int']>;
	rent_market?: InputMaybe<Scalars['Int']>;
	size?: InputMaybe<Scalars['Int']>;
	type?: InputMaybe<Scalars['String']>;
	unit_number?: InputMaybe<Scalars['String']>;
	usage?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type units_max_fields = {
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
export type units_max_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	floor?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
	type?: InputMaybe<order_by>;
	unit_number?: InputMaybe<order_by>;
	usage?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type units_min_fields = {
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
export type units_min_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	floor?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
	type?: InputMaybe<order_by>;
	unit_number?: InputMaybe<order_by>;
	usage?: InputMaybe<order_by>;
};

/** response of any mutation on the table "units" */
export type units_mutation_response = {
	__typename?: 'units_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<units>;
};

/** input type for inserting object relation for remote table "units" */
export type units_obj_rel_insert_input = {
	data: units_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<units_on_conflict>;
};

/** on conflict condition type for table "units" */
export type units_on_conflict = {
	constraint: units_constraint;
	update_columns?: Array<units_update_column>;
	where?: InputMaybe<units_bool_exp>;
};

/** Ordering options when selecting data from "units". */
export type units_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	client_id_s?: InputMaybe<order_by>;
	expenses_aggregate?: InputMaybe<expenses_aggregate_order_by>;
	floor?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	is_vacant?: InputMaybe<order_by>;
	leases_aggregate?: InputMaybe<leases_aggregate_order_by>;
	listings_aggregate?: InputMaybe<listings_aggregate_order_by>;
	maintenance_orders_aggregate?: InputMaybe<maintenance_orders_aggregate_order_by>;
	property?: InputMaybe<properties_order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
	type?: InputMaybe<order_by>;
	unit_number?: InputMaybe<order_by>;
	usage?: InputMaybe<order_by>;
};

/** primary key columns input for table: units */
export type units_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "units" */
export enum units_select_column {
	/** column name */
	bath = 'bath',
	/** column name */
	bed = 'bed',
	/** column name */
	floor = 'floor',
	/** column name */
	id = 'id',
	/** column name */
	property_id = 'property_id',
	/** column name */
	rent_market = 'rent_market',
	/** column name */
	size = 'size',
	/** column name */
	type = 'type',
	/** column name */
	unit_number = 'unit_number',
	/** column name */
	usage = 'usage',
}

/** input type for updating data in table "units" */
export type units_set_input = {
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
export type units_stddev_fields = {
	__typename?: 'units_stddev_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "units" */
export type units_stddev_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type units_stddev_pop_fields = {
	__typename?: 'units_stddev_pop_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "units" */
export type units_stddev_pop_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type units_stddev_samp_fields = {
	__typename?: 'units_stddev_samp_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "units" */
export type units_stddev_samp_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type units_sum_fields = {
	__typename?: 'units_sum_fields';
	bath?: Maybe<Scalars['numeric']>;
	bed?: Maybe<Scalars['numeric']>;
	id?: Maybe<Scalars['Int']>;
	property_id?: Maybe<Scalars['Int']>;
	rent_market?: Maybe<Scalars['Int']>;
	size?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "units" */
export type units_sum_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** update columns of table "units" */
export enum units_update_column {
	/** column name */
	bath = 'bath',
	/** column name */
	bed = 'bed',
	/** column name */
	floor = 'floor',
	/** column name */
	id = 'id',
	/** column name */
	property_id = 'property_id',
	/** column name */
	rent_market = 'rent_market',
	/** column name */
	size = 'size',
	/** column name */
	type = 'type',
	/** column name */
	unit_number = 'unit_number',
	/** column name */
	usage = 'usage',
}

/** aggregate var_pop on columns */
export type units_var_pop_fields = {
	__typename?: 'units_var_pop_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "units" */
export type units_var_pop_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type units_var_samp_fields = {
	__typename?: 'units_var_samp_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "units" */
export type units_var_samp_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type units_variance_fields = {
	__typename?: 'units_variance_fields';
	bath?: Maybe<Scalars['Float']>;
	bed?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	property_id?: Maybe<Scalars['Float']>;
	rent_market?: Maybe<Scalars['Float']>;
	size?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "units" */
export type units_variance_order_by = {
	bath?: InputMaybe<order_by>;
	bed?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	property_id?: InputMaybe<order_by>;
	rent_market?: InputMaybe<order_by>;
	size?: InputMaybe<order_by>;
};

/** columns and relationships of "users" */
export type users = {
	__typename?: 'users';
	/** An object relationship */
	client?: Maybe<clients>;
	client_id?: Maybe<Scalars['Int']>;
	created_at?: Maybe<Scalars['date']>;
	email?: Maybe<Scalars['String']>;
	id: Scalars['Int'];
	last_seen?: Maybe<Scalars['timestamptz']>;
	phone?: Maybe<Scalars['String']>;
	/** An object relationship */
	tenant?: Maybe<tenants>;
	tenant_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "users" */
export type users_aggregate = {
	__typename?: 'users_aggregate';
	aggregate?: Maybe<users_aggregate_fields>;
	nodes: Array<users>;
};

/** aggregate fields of "users" */
export type users_aggregate_fields = {
	__typename?: 'users_aggregate_fields';
	avg?: Maybe<users_avg_fields>;
	count: Scalars['Int'];
	max?: Maybe<users_max_fields>;
	min?: Maybe<users_min_fields>;
	stddev?: Maybe<users_stddev_fields>;
	stddev_pop?: Maybe<users_stddev_pop_fields>;
	stddev_samp?: Maybe<users_stddev_samp_fields>;
	sum?: Maybe<users_sum_fields>;
	var_pop?: Maybe<users_var_pop_fields>;
	var_samp?: Maybe<users_var_samp_fields>;
	variance?: Maybe<users_variance_fields>;
};

/** aggregate fields of "users" */
export type users_aggregate_fieldscountArgs = {
	columns?: InputMaybe<Array<users_select_column>>;
	distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type users_aggregate_order_by = {
	avg?: InputMaybe<users_avg_order_by>;
	count?: InputMaybe<order_by>;
	max?: InputMaybe<users_max_order_by>;
	min?: InputMaybe<users_min_order_by>;
	stddev?: InputMaybe<users_stddev_order_by>;
	stddev_pop?: InputMaybe<users_stddev_pop_order_by>;
	stddev_samp?: InputMaybe<users_stddev_samp_order_by>;
	sum?: InputMaybe<users_sum_order_by>;
	var_pop?: InputMaybe<users_var_pop_order_by>;
	var_samp?: InputMaybe<users_var_samp_order_by>;
	variance?: InputMaybe<users_variance_order_by>;
};

/** input type for inserting array relation for remote table "users" */
export type users_arr_rel_insert_input = {
	data: Array<users_insert_input>;
	/** on conflict condition */
	on_conflict?: InputMaybe<users_on_conflict>;
};

/** aggregate avg on columns */
export type users_avg_fields = {
	__typename?: 'users_avg_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "users" */
export type users_avg_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type users_bool_exp = {
	_and?: InputMaybe<Array<users_bool_exp>>;
	_not?: InputMaybe<users_bool_exp>;
	_or?: InputMaybe<Array<users_bool_exp>>;
	client?: InputMaybe<clients_bool_exp>;
	client_id?: InputMaybe<Int_comparison_exp>;
	created_at?: InputMaybe<date_comparison_exp>;
	email?: InputMaybe<String_comparison_exp>;
	id?: InputMaybe<Int_comparison_exp>;
	last_seen?: InputMaybe<timestamptz_comparison_exp>;
	phone?: InputMaybe<String_comparison_exp>;
	tenant?: InputMaybe<tenants_bool_exp>;
	tenant_id?: InputMaybe<Int_comparison_exp>;
};

/** unique or primary key constraints on table "users" */
export enum users_constraint {
	/** unique or primary key constraint */
	users_pkey = 'users_pkey',
	/** unique or primary key constraint */
	users_tenant_id_key = 'users_tenant_id_key',
}

/** input type for incrementing numeric columns in table "users" */
export type users_inc_input = {
	client_id?: InputMaybe<Scalars['Int']>;
	id?: InputMaybe<Scalars['Int']>;
	tenant_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type users_insert_input = {
	client?: InputMaybe<clients_obj_rel_insert_input>;
	client_id?: InputMaybe<Scalars['Int']>;
	created_at?: InputMaybe<Scalars['date']>;
	email?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	last_seen?: InputMaybe<Scalars['timestamptz']>;
	phone?: InputMaybe<Scalars['String']>;
	tenant?: InputMaybe<tenants_obj_rel_insert_input>;
	tenant_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type users_max_fields = {
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
export type users_max_order_by = {
	client_id?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	email?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	last_seen?: InputMaybe<order_by>;
	phone?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate min on columns */
export type users_min_fields = {
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
export type users_min_order_by = {
	client_id?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	email?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	last_seen?: InputMaybe<order_by>;
	phone?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** response of any mutation on the table "users" */
export type users_mutation_response = {
	__typename?: 'users_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int'];
	/** data from the rows affected by the mutation */
	returning: Array<users>;
};

/** input type for inserting object relation for remote table "users" */
export type users_obj_rel_insert_input = {
	data: users_insert_input;
	/** on conflict condition */
	on_conflict?: InputMaybe<users_on_conflict>;
};

/** on conflict condition type for table "users" */
export type users_on_conflict = {
	constraint: users_constraint;
	update_columns?: Array<users_update_column>;
	where?: InputMaybe<users_bool_exp>;
};

/** Ordering options when selecting data from "users". */
export type users_order_by = {
	client?: InputMaybe<clients_order_by>;
	client_id?: InputMaybe<order_by>;
	created_at?: InputMaybe<order_by>;
	email?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	last_seen?: InputMaybe<order_by>;
	phone?: InputMaybe<order_by>;
	tenant?: InputMaybe<tenants_order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** primary key columns input for table: users */
export type users_pk_columns_input = {
	id: Scalars['Int'];
};

/** select columns of table "users" */
export enum users_select_column {
	/** column name */
	client_id = 'client_id',
	/** column name */
	created_at = 'created_at',
	/** column name */
	email = 'email',
	/** column name */
	id = 'id',
	/** column name */
	last_seen = 'last_seen',
	/** column name */
	phone = 'phone',
	/** column name */
	tenant_id = 'tenant_id',
}

/** input type for updating data in table "users" */
export type users_set_input = {
	client_id?: InputMaybe<Scalars['Int']>;
	created_at?: InputMaybe<Scalars['date']>;
	email?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['Int']>;
	last_seen?: InputMaybe<Scalars['timestamptz']>;
	phone?: InputMaybe<Scalars['String']>;
	tenant_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type users_stddev_fields = {
	__typename?: 'users_stddev_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "users" */
export type users_stddev_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type users_stddev_pop_fields = {
	__typename?: 'users_stddev_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "users" */
export type users_stddev_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type users_stddev_samp_fields = {
	__typename?: 'users_stddev_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "users" */
export type users_stddev_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate sum on columns */
export type users_sum_fields = {
	__typename?: 'users_sum_fields';
	client_id?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	tenant_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "users" */
export type users_sum_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** update columns of table "users" */
export enum users_update_column {
	/** column name */
	client_id = 'client_id',
	/** column name */
	created_at = 'created_at',
	/** column name */
	email = 'email',
	/** column name */
	id = 'id',
	/** column name */
	last_seen = 'last_seen',
	/** column name */
	phone = 'phone',
	/** column name */
	tenant_id = 'tenant_id',
}

/** aggregate var_pop on columns */
export type users_var_pop_fields = {
	__typename?: 'users_var_pop_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "users" */
export type users_var_pop_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate var_samp on columns */
export type users_var_samp_fields = {
	__typename?: 'users_var_samp_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "users" */
export type users_var_samp_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

/** aggregate variance on columns */
export type users_variance_fields = {
	__typename?: 'users_variance_fields';
	client_id?: Maybe<Scalars['Float']>;
	id?: Maybe<Scalars['Float']>;
	tenant_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "users" */
export type users_variance_order_by = {
	client_id?: InputMaybe<order_by>;
	id?: InputMaybe<order_by>;
	tenant_id?: InputMaybe<order_by>;
};

export type detailsFragment = {
	__typename?: 'clients';
	id: number;
	first_name?: string | null | undefined;
	last_name?: string | null | undefined;
	email?: string | null | undefined;
	phone?: string | null | undefined;
	civilid?: any | null | undefined;
	is_active?: boolean | null | undefined;
};

export type ClientsInsertMutationVariables = Exact<{
	object?: InputMaybe<clients_insert_input>;
}>;

export type ClientsInsertMutation = {
	__typename?: 'mutation_root';
	insert_clients_one?:
		| {
				__typename?: 'clients';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				civilid?: any | null | undefined;
				is_active?: boolean | null | undefined;
		  }
		| null
		| undefined;
};

export type ClientsUpdateMutationVariables = Exact<{
	id: Scalars['Int'];
	_set?: InputMaybe<clients_set_input>;
}>;

export type ClientsUpdateMutation = {
	__typename?: 'mutation_root';
	update_clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				civilid?: any | null | undefined;
				is_active?: boolean | null | undefined;
		  }
		| null
		| undefined;
};

export type DeleteClientsMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteClientsMutation = {
	__typename?: 'mutation_root';
	delete_clients_by_pk?:
		| { __typename?: 'clients'; id: number }
		| null
		| undefined;
};

export type ClientsByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type ClientsByIdQuery = {
	__typename?: 'query_root';
	clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				civilid?: any | null | undefined;
				is_active?: boolean | null | undefined;
		  }
		| null
		| undefined;
};

export type ClientsListQueryVariables = Exact<{
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<clients_order_by> | clients_order_by>;
}>;

export type ClientsListQuery = {
	__typename?: 'query_root';
	clients: Array<{
		__typename?: 'clients';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
		email?: string | null | undefined;
		phone?: string | null | undefined;
		civilid?: any | null | undefined;
		is_active?: boolean | null | undefined;
	}>;
};

export type leasesDetailsFragment = {
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
};

export type LeasesInsertMutationVariables = Exact<{
	object?: InputMaybe<leases_insert_input>;
}>;

export type LeasesInsertMutation = {
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

export type LeasesUpdateMutationVariables = Exact<{
	id: Scalars['Int'];
	_set?: InputMaybe<leases_set_input>;
}>;

export type LeasesUpdateMutation = {
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

export type DeleteLeasesMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteLeasesMutation = {
	__typename?: 'mutation_root';
	delete_leases_by_pk?:
		| { __typename?: 'leases'; id: number }
		| null
		| undefined;
};

export type LeasesByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type LeasesByIdQuery = {
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

export type LeasesListQueryVariables = Exact<{
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<leases_order_by> | leases_order_by>;
}>;

export type LeasesListQuery = {
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

export type propertiesDetailsFragment = {
	__typename?: 'properties';
	id: number;
	client_id?: number | null | undefined;
	area?: string | null | undefined;
	block?: string | null | undefined;
	street?: string | null | undefined;
	avenue?: string | null | undefined;
	number?: string | null | undefined;
	coordinates?: any | null | undefined;
};

export type PropertiesInsertMutationVariables = Exact<{
	object?: InputMaybe<properties_insert_input>;
}>;

export type PropertiesInsertMutation = {
	__typename?: 'mutation_root';
	insert_properties_one?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type PropertiesUpdateMutationVariables = Exact<{
	id: Scalars['Int'];
	_set?: InputMaybe<properties_set_input>;
}>;

export type PropertiesUpdateMutation = {
	__typename?: 'mutation_root';
	update_properties_by_pk?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type DeletePropertiesMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeletePropertiesMutation = {
	__typename?: 'mutation_root';
	delete_properties_by_pk?:
		| { __typename?: 'properties'; id: number }
		| null
		| undefined;
};

export type PropertiesByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type PropertiesByIdQuery = {
	__typename?: 'query_root';
	properties_by_pk?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type PropertiesListQueryVariables = Exact<{
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<properties_order_by> | properties_order_by>;
}>;

export type PropertiesListQuery = {
	__typename?: 'query_root';
	properties: Array<{
		__typename?: 'properties';
		id: number;
		client_id?: number | null | undefined;
		area?: string | null | undefined;
		block?: string | null | undefined;
		street?: string | null | undefined;
		avenue?: string | null | undefined;
		number?: string | null | undefined;
		coordinates?: any | null | undefined;
	}>;
};

export type tenantsDetailsFragment = {
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
};

export type TenantsInsertMutationVariables = Exact<{
	object?: InputMaybe<tenants_insert_input>;
}>;

export type TenantsInsertMutation = {
	__typename?: 'mutation_root';
	insert_tenants_one?:
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
		  }
		| null
		| undefined;
};

export type TenantsUpdateMutationVariables = Exact<{
	id: Scalars['Int'];
	_set?: InputMaybe<tenants_set_input>;
}>;

export type TenantsUpdateMutation = {
	__typename?: 'mutation_root';
	update_tenants_by_pk?:
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
		  }
		| null
		| undefined;
};

export type DeleteTenantsMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteTenantsMutation = {
	__typename?: 'mutation_root';
	delete_tenants_by_pk?:
		| { __typename?: 'tenants'; id: number }
		| null
		| undefined;
};

export type TenantsByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type TenantsByIdQuery = {
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
		  }
		| null
		| undefined;
};

export type TenantsListQueryVariables = Exact<{
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<tenants_order_by> | tenants_order_by>;
}>;

export type TenantsListQuery = {
	__typename?: 'query_root';
	tenants: Array<{
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
	}>;
};

export type unitsDetailsFragment = {
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
};

export type UnitsInsertMutationVariables = Exact<{
	object?: InputMaybe<units_insert_input>;
}>;

export type UnitsInsertMutation = {
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

export type UnitsUpdateMutationVariables = Exact<{
	id: Scalars['Int'];
	_set?: InputMaybe<units_set_input>;
}>;

export type UnitsUpdateMutation = {
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

export type DeleteUnitsMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteUnitsMutation = {
	__typename?: 'mutation_root';
	delete_units_by_pk?: { __typename?: 'units'; id: number } | null | undefined;
};

export type UnitsByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type UnitsByIdQuery = {
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

export type UnitsListQueryVariables = Exact<{
	limit?: InputMaybe<Scalars['Int']>;
	offset?: InputMaybe<Scalars['Int']>;
	order_by?: InputMaybe<Array<units_order_by> | units_order_by>;
}>;

export type UnitsListQuery = {
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

export type TrxByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type TrxByIdQuery = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
		  }
		| null
		| undefined;
};

export type Trx2ByIdQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type Trx2ByIdQuery = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				is_paid?: boolean | null | undefined;
				memo?: string | null | undefined;
				created_at?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type TenantsByIdLocalQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type TenantsByIdLocalQuery = {
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
		  }
		| null
		| undefined;
};

export type ClientsInsertMutationStore = OperationStore<
	ClientsInsertMutation,
	ClientsInsertMutationVariables
>;
export type ClientsUpdateMutationStore = OperationStore<
	ClientsUpdateMutation,
	ClientsUpdateMutationVariables
>;
export type DeleteClientsMutationStore = OperationStore<
	DeleteClientsMutation,
	DeleteClientsMutationVariables
>;
export type ClientsByIdQueryStore = OperationStore<
	ClientsByIdQuery,
	ClientsByIdQueryVariables
>;
export type ClientsListQueryStore = OperationStore<
	ClientsListQuery,
	ClientsListQueryVariables
>;
export type LeasesInsertMutationStore = OperationStore<
	LeasesInsertMutation,
	LeasesInsertMutationVariables
>;
export type LeasesUpdateMutationStore = OperationStore<
	LeasesUpdateMutation,
	LeasesUpdateMutationVariables
>;
export type DeleteLeasesMutationStore = OperationStore<
	DeleteLeasesMutation,
	DeleteLeasesMutationVariables
>;
export type LeasesByIdQueryStore = OperationStore<
	LeasesByIdQuery,
	LeasesByIdQueryVariables
>;
export type LeasesListQueryStore = OperationStore<
	LeasesListQuery,
	LeasesListQueryVariables
>;
export type PropertiesInsertMutationStore = OperationStore<
	PropertiesInsertMutation,
	PropertiesInsertMutationVariables
>;
export type PropertiesUpdateMutationStore = OperationStore<
	PropertiesUpdateMutation,
	PropertiesUpdateMutationVariables
>;
export type DeletePropertiesMutationStore = OperationStore<
	DeletePropertiesMutation,
	DeletePropertiesMutationVariables
>;
export type PropertiesByIdQueryStore = OperationStore<
	PropertiesByIdQuery,
	PropertiesByIdQueryVariables
>;
export type PropertiesListQueryStore = OperationStore<
	PropertiesListQuery,
	PropertiesListQueryVariables
>;
export type TenantsInsertMutationStore = OperationStore<
	TenantsInsertMutation,
	TenantsInsertMutationVariables
>;
export type TenantsUpdateMutationStore = OperationStore<
	TenantsUpdateMutation,
	TenantsUpdateMutationVariables
>;
export type DeleteTenantsMutationStore = OperationStore<
	DeleteTenantsMutation,
	DeleteTenantsMutationVariables
>;
export type TenantsByIdQueryStore = OperationStore<
	TenantsByIdQuery,
	TenantsByIdQueryVariables
>;
export type TenantsListQueryStore = OperationStore<
	TenantsListQuery,
	TenantsListQueryVariables
>;
export type UnitsInsertMutationStore = OperationStore<
	UnitsInsertMutation,
	UnitsInsertMutationVariables
>;
export type UnitsUpdateMutationStore = OperationStore<
	UnitsUpdateMutation,
	UnitsUpdateMutationVariables
>;
export type DeleteUnitsMutationStore = OperationStore<
	DeleteUnitsMutation,
	DeleteUnitsMutationVariables
>;
export type UnitsByIdQueryStore = OperationStore<
	UnitsByIdQuery,
	UnitsByIdQueryVariables
>;
export type UnitsListQueryStore = OperationStore<
	UnitsListQuery,
	UnitsListQueryVariables
>;
export type TrxByIdQueryStore = OperationStore<
	TrxByIdQuery,
	TrxByIdQueryVariables
>;
export type Trx2ByIdQueryStore = OperationStore<
	Trx2ByIdQuery,
	Trx2ByIdQueryVariables
>;
export type TenantsByIdLocalQueryStore = OperationStore<
	TenantsByIdLocalQuery,
	TenantsByIdLocalQueryVariables
>;
export type WithTypename<T extends { __typename?: any }> = {
	[K in Exclude<keyof T, '__typename'>]?: T[K];
} & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
	clients?: (data: WithTypename<clients>) => null | string;
	clients_aggregate?: (data: WithTypename<clients_aggregate>) => null | string;
	clients_aggregate_fields?: (
		data: WithTypename<clients_aggregate_fields>,
	) => null | string;
	clients_avg_fields?: (
		data: WithTypename<clients_avg_fields>,
	) => null | string;
	clients_max_fields?: (
		data: WithTypename<clients_max_fields>,
	) => null | string;
	clients_min_fields?: (
		data: WithTypename<clients_min_fields>,
	) => null | string;
	clients_mutation_response?: (
		data: WithTypename<clients_mutation_response>,
	) => null | string;
	clients_stddev_fields?: (
		data: WithTypename<clients_stddev_fields>,
	) => null | string;
	clients_stddev_pop_fields?: (
		data: WithTypename<clients_stddev_pop_fields>,
	) => null | string;
	clients_stddev_samp_fields?: (
		data: WithTypename<clients_stddev_samp_fields>,
	) => null | string;
	clients_sum_fields?: (
		data: WithTypename<clients_sum_fields>,
	) => null | string;
	clients_var_pop_fields?: (
		data: WithTypename<clients_var_pop_fields>,
	) => null | string;
	clients_var_samp_fields?: (
		data: WithTypename<clients_var_samp_fields>,
	) => null | string;
	clients_variance_fields?: (
		data: WithTypename<clients_variance_fields>,
	) => null | string;
	expenses?: (data: WithTypename<expenses>) => null | string;
	expenses_aggregate?: (
		data: WithTypename<expenses_aggregate>,
	) => null | string;
	expenses_aggregate_fields?: (
		data: WithTypename<expenses_aggregate_fields>,
	) => null | string;
	expenses_avg_fields?: (
		data: WithTypename<expenses_avg_fields>,
	) => null | string;
	expenses_max_fields?: (
		data: WithTypename<expenses_max_fields>,
	) => null | string;
	expenses_min_fields?: (
		data: WithTypename<expenses_min_fields>,
	) => null | string;
	expenses_mutation_response?: (
		data: WithTypename<expenses_mutation_response>,
	) => null | string;
	expenses_stddev_fields?: (
		data: WithTypename<expenses_stddev_fields>,
	) => null | string;
	expenses_stddev_pop_fields?: (
		data: WithTypename<expenses_stddev_pop_fields>,
	) => null | string;
	expenses_stddev_samp_fields?: (
		data: WithTypename<expenses_stddev_samp_fields>,
	) => null | string;
	expenses_sum_fields?: (
		data: WithTypename<expenses_sum_fields>,
	) => null | string;
	expenses_types?: (data: WithTypename<expenses_types>) => null | string;
	expenses_types_aggregate?: (
		data: WithTypename<expenses_types_aggregate>,
	) => null | string;
	expenses_types_aggregate_fields?: (
		data: WithTypename<expenses_types_aggregate_fields>,
	) => null | string;
	expenses_types_max_fields?: (
		data: WithTypename<expenses_types_max_fields>,
	) => null | string;
	expenses_types_min_fields?: (
		data: WithTypename<expenses_types_min_fields>,
	) => null | string;
	expenses_types_mutation_response?: (
		data: WithTypename<expenses_types_mutation_response>,
	) => null | string;
	expenses_var_pop_fields?: (
		data: WithTypename<expenses_var_pop_fields>,
	) => null | string;
	expenses_var_samp_fields?: (
		data: WithTypename<expenses_var_samp_fields>,
	) => null | string;
	expenses_variance_fields?: (
		data: WithTypename<expenses_variance_fields>,
	) => null | string;
	leases?: (data: WithTypename<leases>) => null | string;
	leases_aggregate?: (data: WithTypename<leases_aggregate>) => null | string;
	leases_aggregate_fields?: (
		data: WithTypename<leases_aggregate_fields>,
	) => null | string;
	leases_avg_fields?: (data: WithTypename<leases_avg_fields>) => null | string;
	leases_max_fields?: (data: WithTypename<leases_max_fields>) => null | string;
	leases_min_fields?: (data: WithTypename<leases_min_fields>) => null | string;
	leases_mutation_response?: (
		data: WithTypename<leases_mutation_response>,
	) => null | string;
	leases_stddev_fields?: (
		data: WithTypename<leases_stddev_fields>,
	) => null | string;
	leases_stddev_pop_fields?: (
		data: WithTypename<leases_stddev_pop_fields>,
	) => null | string;
	leases_stddev_samp_fields?: (
		data: WithTypename<leases_stddev_samp_fields>,
	) => null | string;
	leases_sum_fields?: (data: WithTypename<leases_sum_fields>) => null | string;
	leases_var_pop_fields?: (
		data: WithTypename<leases_var_pop_fields>,
	) => null | string;
	leases_var_samp_fields?: (
		data: WithTypename<leases_var_samp_fields>,
	) => null | string;
	leases_variance_fields?: (
		data: WithTypename<leases_variance_fields>,
	) => null | string;
	listings?: (data: WithTypename<listings>) => null | string;
	listings_aggregate?: (
		data: WithTypename<listings_aggregate>,
	) => null | string;
	listings_aggregate_fields?: (
		data: WithTypename<listings_aggregate_fields>,
	) => null | string;
	listings_avg_fields?: (
		data: WithTypename<listings_avg_fields>,
	) => null | string;
	listings_max_fields?: (
		data: WithTypename<listings_max_fields>,
	) => null | string;
	listings_min_fields?: (
		data: WithTypename<listings_min_fields>,
	) => null | string;
	listings_mutation_response?: (
		data: WithTypename<listings_mutation_response>,
	) => null | string;
	listings_stddev_fields?: (
		data: WithTypename<listings_stddev_fields>,
	) => null | string;
	listings_stddev_pop_fields?: (
		data: WithTypename<listings_stddev_pop_fields>,
	) => null | string;
	listings_stddev_samp_fields?: (
		data: WithTypename<listings_stddev_samp_fields>,
	) => null | string;
	listings_sum_fields?: (
		data: WithTypename<listings_sum_fields>,
	) => null | string;
	listings_var_pop_fields?: (
		data: WithTypename<listings_var_pop_fields>,
	) => null | string;
	listings_var_samp_fields?: (
		data: WithTypename<listings_var_samp_fields>,
	) => null | string;
	listings_variance_fields?: (
		data: WithTypename<listings_variance_fields>,
	) => null | string;
	maintenance_orders?: (
		data: WithTypename<maintenance_orders>,
	) => null | string;
	maintenance_orders_aggregate?: (
		data: WithTypename<maintenance_orders_aggregate>,
	) => null | string;
	maintenance_orders_aggregate_fields?: (
		data: WithTypename<maintenance_orders_aggregate_fields>,
	) => null | string;
	maintenance_orders_avg_fields?: (
		data: WithTypename<maintenance_orders_avg_fields>,
	) => null | string;
	maintenance_orders_max_fields?: (
		data: WithTypename<maintenance_orders_max_fields>,
	) => null | string;
	maintenance_orders_min_fields?: (
		data: WithTypename<maintenance_orders_min_fields>,
	) => null | string;
	maintenance_orders_mutation_response?: (
		data: WithTypename<maintenance_orders_mutation_response>,
	) => null | string;
	maintenance_orders_stddev_fields?: (
		data: WithTypename<maintenance_orders_stddev_fields>,
	) => null | string;
	maintenance_orders_stddev_pop_fields?: (
		data: WithTypename<maintenance_orders_stddev_pop_fields>,
	) => null | string;
	maintenance_orders_stddev_samp_fields?: (
		data: WithTypename<maintenance_orders_stddev_samp_fields>,
	) => null | string;
	maintenance_orders_sum_fields?: (
		data: WithTypename<maintenance_orders_sum_fields>,
	) => null | string;
	maintenance_orders_var_pop_fields?: (
		data: WithTypename<maintenance_orders_var_pop_fields>,
	) => null | string;
	maintenance_orders_var_samp_fields?: (
		data: WithTypename<maintenance_orders_var_samp_fields>,
	) => null | string;
	maintenance_orders_variance_fields?: (
		data: WithTypename<maintenance_orders_variance_fields>,
	) => null | string;
	properties?: (data: WithTypename<properties>) => null | string;
	properties_aggregate?: (
		data: WithTypename<properties_aggregate>,
	) => null | string;
	properties_aggregate_fields?: (
		data: WithTypename<properties_aggregate_fields>,
	) => null | string;
	properties_avg_fields?: (
		data: WithTypename<properties_avg_fields>,
	) => null | string;
	properties_max_fields?: (
		data: WithTypename<properties_max_fields>,
	) => null | string;
	properties_min_fields?: (
		data: WithTypename<properties_min_fields>,
	) => null | string;
	properties_mutation_response?: (
		data: WithTypename<properties_mutation_response>,
	) => null | string;
	properties_stddev_fields?: (
		data: WithTypename<properties_stddev_fields>,
	) => null | string;
	properties_stddev_pop_fields?: (
		data: WithTypename<properties_stddev_pop_fields>,
	) => null | string;
	properties_stddev_samp_fields?: (
		data: WithTypename<properties_stddev_samp_fields>,
	) => null | string;
	properties_sum_fields?: (
		data: WithTypename<properties_sum_fields>,
	) => null | string;
	properties_var_pop_fields?: (
		data: WithTypename<properties_var_pop_fields>,
	) => null | string;
	properties_var_samp_fields?: (
		data: WithTypename<properties_var_samp_fields>,
	) => null | string;
	properties_variance_fields?: (
		data: WithTypename<properties_variance_fields>,
	) => null | string;
	tenants?: (data: WithTypename<tenants>) => null | string;
	tenants_aggregate?: (data: WithTypename<tenants_aggregate>) => null | string;
	tenants_aggregate_fields?: (
		data: WithTypename<tenants_aggregate_fields>,
	) => null | string;
	tenants_avg_fields?: (
		data: WithTypename<tenants_avg_fields>,
	) => null | string;
	tenants_max_fields?: (
		data: WithTypename<tenants_max_fields>,
	) => null | string;
	tenants_min_fields?: (
		data: WithTypename<tenants_min_fields>,
	) => null | string;
	tenants_mutation_response?: (
		data: WithTypename<tenants_mutation_response>,
	) => null | string;
	tenants_stddev_fields?: (
		data: WithTypename<tenants_stddev_fields>,
	) => null | string;
	tenants_stddev_pop_fields?: (
		data: WithTypename<tenants_stddev_pop_fields>,
	) => null | string;
	tenants_stddev_samp_fields?: (
		data: WithTypename<tenants_stddev_samp_fields>,
	) => null | string;
	tenants_sum_fields?: (
		data: WithTypename<tenants_sum_fields>,
	) => null | string;
	tenants_var_pop_fields?: (
		data: WithTypename<tenants_var_pop_fields>,
	) => null | string;
	tenants_var_samp_fields?: (
		data: WithTypename<tenants_var_samp_fields>,
	) => null | string;
	tenants_variance_fields?: (
		data: WithTypename<tenants_variance_fields>,
	) => null | string;
	transactions?: (data: WithTypename<transactions>) => null | string;
	transactions_aggregate?: (
		data: WithTypename<transactions_aggregate>,
	) => null | string;
	transactions_aggregate_fields?: (
		data: WithTypename<transactions_aggregate_fields>,
	) => null | string;
	transactions_avg_fields?: (
		data: WithTypename<transactions_avg_fields>,
	) => null | string;
	transactions_max_fields?: (
		data: WithTypename<transactions_max_fields>,
	) => null | string;
	transactions_min_fields?: (
		data: WithTypename<transactions_min_fields>,
	) => null | string;
	transactions_mutation_response?: (
		data: WithTypename<transactions_mutation_response>,
	) => null | string;
	transactions_stddev_fields?: (
		data: WithTypename<transactions_stddev_fields>,
	) => null | string;
	transactions_stddev_pop_fields?: (
		data: WithTypename<transactions_stddev_pop_fields>,
	) => null | string;
	transactions_stddev_samp_fields?: (
		data: WithTypename<transactions_stddev_samp_fields>,
	) => null | string;
	transactions_sum_fields?: (
		data: WithTypename<transactions_sum_fields>,
	) => null | string;
	transactions_var_pop_fields?: (
		data: WithTypename<transactions_var_pop_fields>,
	) => null | string;
	transactions_var_samp_fields?: (
		data: WithTypename<transactions_var_samp_fields>,
	) => null | string;
	transactions_variance_fields?: (
		data: WithTypename<transactions_variance_fields>,
	) => null | string;
	units?: (data: WithTypename<units>) => null | string;
	units_aggregate?: (data: WithTypename<units_aggregate>) => null | string;
	units_aggregate_fields?: (
		data: WithTypename<units_aggregate_fields>,
	) => null | string;
	units_avg_fields?: (data: WithTypename<units_avg_fields>) => null | string;
	units_max_fields?: (data: WithTypename<units_max_fields>) => null | string;
	units_min_fields?: (data: WithTypename<units_min_fields>) => null | string;
	units_mutation_response?: (
		data: WithTypename<units_mutation_response>,
	) => null | string;
	units_stddev_fields?: (
		data: WithTypename<units_stddev_fields>,
	) => null | string;
	units_stddev_pop_fields?: (
		data: WithTypename<units_stddev_pop_fields>,
	) => null | string;
	units_stddev_samp_fields?: (
		data: WithTypename<units_stddev_samp_fields>,
	) => null | string;
	units_sum_fields?: (data: WithTypename<units_sum_fields>) => null | string;
	units_var_pop_fields?: (
		data: WithTypename<units_var_pop_fields>,
	) => null | string;
	units_var_samp_fields?: (
		data: WithTypename<units_var_samp_fields>,
	) => null | string;
	units_variance_fields?: (
		data: WithTypename<units_variance_fields>,
	) => null | string;
	users?: (data: WithTypename<users>) => null | string;
	users_aggregate?: (data: WithTypename<users_aggregate>) => null | string;
	users_aggregate_fields?: (
		data: WithTypename<users_aggregate_fields>,
	) => null | string;
	users_avg_fields?: (data: WithTypename<users_avg_fields>) => null | string;
	users_max_fields?: (data: WithTypename<users_max_fields>) => null | string;
	users_min_fields?: (data: WithTypename<users_min_fields>) => null | string;
	users_mutation_response?: (
		data: WithTypename<users_mutation_response>,
	) => null | string;
	users_stddev_fields?: (
		data: WithTypename<users_stddev_fields>,
	) => null | string;
	users_stddev_pop_fields?: (
		data: WithTypename<users_stddev_pop_fields>,
	) => null | string;
	users_stddev_samp_fields?: (
		data: WithTypename<users_stddev_samp_fields>,
	) => null | string;
	users_sum_fields?: (data: WithTypename<users_sum_fields>) => null | string;
	users_var_pop_fields?: (
		data: WithTypename<users_var_pop_fields>,
	) => null | string;
	users_var_samp_fields?: (
		data: WithTypename<users_var_samp_fields>,
	) => null | string;
	users_variance_fields?: (
		data: WithTypename<users_variance_fields>,
	) => null | string;
};

export type GraphCacheResolvers = {
	query_root?: {
		clients?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootClientsArgs,
			Array<WithTypename<clients> | string>
		>;
		clients_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootClients_aggregateArgs,
			WithTypename<clients_aggregate> | string
		>;
		clients_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootClients_by_pkArgs,
			WithTypename<clients> | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		expenses_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpenses_by_pkArgs,
			WithTypename<expenses> | string
		>;
		expenses_types?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpenses_typesArgs,
			Array<WithTypename<expenses_types> | string>
		>;
		expenses_types_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpenses_types_aggregateArgs,
			WithTypename<expenses_types_aggregate> | string
		>;
		expenses_types_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootExpenses_types_by_pkArgs,
			WithTypename<expenses_types> | string
		>;
		leases?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootLeasesArgs,
			Array<WithTypename<leases> | string>
		>;
		leases_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootLeases_aggregateArgs,
			WithTypename<leases_aggregate> | string
		>;
		leases_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootLeases_by_pkArgs,
			WithTypename<leases> | string
		>;
		listings?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootListingsArgs,
			Array<WithTypename<listings> | string>
		>;
		listings_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootListings_aggregateArgs,
			WithTypename<listings_aggregate> | string
		>;
		listings_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootListings_by_pkArgs,
			WithTypename<listings> | string
		>;
		maintenance_orders?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootMaintenance_ordersArgs,
			Array<WithTypename<maintenance_orders> | string>
		>;
		maintenance_orders_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootMaintenance_orders_aggregateArgs,
			WithTypename<maintenance_orders_aggregate> | string
		>;
		maintenance_orders_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootMaintenance_orders_by_pkArgs,
			WithTypename<maintenance_orders> | string
		>;
		properties?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootPropertiesArgs,
			Array<WithTypename<properties> | string>
		>;
		properties_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootProperties_aggregateArgs,
			WithTypename<properties_aggregate> | string
		>;
		properties_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootProperties_by_pkArgs,
			WithTypename<properties> | string
		>;
		tenants?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTenantsArgs,
			Array<WithTypename<tenants> | string>
		>;
		tenants_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTenants_aggregateArgs,
			WithTypename<tenants_aggregate> | string
		>;
		tenants_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTenants_by_pkArgs,
			WithTypename<tenants> | string
		>;
		transactions?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTransactionsArgs,
			Array<WithTypename<transactions> | string>
		>;
		transactions_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTransactions_aggregateArgs,
			WithTypename<transactions_aggregate> | string
		>;
		transactions_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootTransactions_by_pkArgs,
			WithTypename<transactions> | string
		>;
		units?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUnitsArgs,
			Array<WithTypename<units> | string>
		>;
		units_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUnits_aggregateArgs,
			WithTypename<units_aggregate> | string
		>;
		units_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUnits_by_pkArgs,
			WithTypename<units> | string
		>;
		users?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUsersArgs,
			Array<WithTypename<users> | string>
		>;
		users_aggregate?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUsers_aggregateArgs,
			WithTypename<users_aggregate> | string
		>;
		users_by_pk?: GraphCacheResolver<
			WithTypename<query_root>,
			query_rootUsers_by_pkArgs,
			WithTypename<users> | string
		>;
	};
	clients?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<clients>,
			clientsExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<clients>,
			clientsExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		is_active?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		maintenance_orders?: GraphCacheResolver<
			WithTypename<clients>,
			clientsMaintenance_ordersArgs,
			Array<WithTypename<maintenance_orders> | string>
		>;
		maintenance_orders_aggregate?: GraphCacheResolver<
			WithTypename<clients>,
			clientsMaintenance_orders_aggregateArgs,
			WithTypename<maintenance_orders_aggregate> | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		properties?: GraphCacheResolver<
			WithTypename<clients>,
			clientsPropertiesArgs,
			Array<WithTypename<properties> | string>
		>;
		properties_aggregate?: GraphCacheResolver<
			WithTypename<clients>,
			clientsProperties_aggregateArgs,
			WithTypename<properties_aggregate> | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<clients>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		users?: GraphCacheResolver<
			WithTypename<clients>,
			clientsUsersArgs,
			Array<WithTypename<users> | string>
		>;
		users_aggregate?: GraphCacheResolver<
			WithTypename<clients>,
			clientsUsers_aggregateArgs,
			WithTypename<users_aggregate> | string
		>;
	};
	clients_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<clients_aggregate>,
			Record<string, never>,
			WithTypename<clients_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<clients_aggregate>,
			Record<string, never>,
			Array<WithTypename<clients> | string>
		>;
	};
	clients_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			clients_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<clients_aggregate_fields>,
			Record<string, never>,
			WithTypename<clients_variance_fields> | string
		>;
	};
	clients_avg_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_max_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<clients_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	clients_min_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<clients_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	clients_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<clients_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<clients_mutation_response>,
			Record<string, never>,
			Array<WithTypename<clients> | string>
		>;
	};
	clients_stddev_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_stddev_pop_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_stddev_samp_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_sum_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_sum_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	clients_var_pop_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_var_samp_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	clients_variance_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<clients_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<clients_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		category?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			expenses_types_enum | string
		>;
		client?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			WithTypename<clients> | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		date_post?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		expenses_type?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			WithTypename<expenses_types> | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		maintenance_order?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			WithTypename<maintenance_orders> | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		property?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			WithTypename<properties> | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			WithTypename<units> | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	expenses_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<expenses_aggregate>,
			Record<string, never>,
			WithTypename<expenses_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<expenses_aggregate>,
			Record<string, never>,
			Array<WithTypename<expenses> | string>
		>;
	};
	expenses_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			expenses_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<expenses_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_variance_fields> | string
		>;
	};
	expenses_avg_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_max_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		date_post?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	expenses_min_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		date_post?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	expenses_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<expenses_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<expenses_mutation_response>,
			Record<string, never>,
			Array<WithTypename<expenses> | string>
		>;
	};
	expenses_stddev_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_stddev_pop_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_stddev_samp_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_sum_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	expenses_types?: {
		description?: GraphCacheResolver<
			WithTypename<expenses_types>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<expenses_types>,
			expenses_typesExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<expenses_types>,
			expenses_typesExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		value?: GraphCacheResolver<
			WithTypename<expenses_types>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	expenses_types_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<expenses_types_aggregate>,
			Record<string, never>,
			WithTypename<expenses_types_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<expenses_types_aggregate>,
			Record<string, never>,
			Array<WithTypename<expenses_types> | string>
		>;
	};
	expenses_types_aggregate_fields?: {
		count?: GraphCacheResolver<
			WithTypename<expenses_types_aggregate_fields>,
			expenses_types_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<expenses_types_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_types_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<expenses_types_aggregate_fields>,
			Record<string, never>,
			WithTypename<expenses_types_min_fields> | string
		>;
	};
	expenses_types_max_fields?: {
		description?: GraphCacheResolver<
			WithTypename<expenses_types_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		value?: GraphCacheResolver<
			WithTypename<expenses_types_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	expenses_types_min_fields?: {
		description?: GraphCacheResolver<
			WithTypename<expenses_types_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		value?: GraphCacheResolver<
			WithTypename<expenses_types_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	expenses_types_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<expenses_types_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<expenses_types_mutation_response>,
			Record<string, never>,
			Array<WithTypename<expenses_types> | string>
		>;
	};
	expenses_var_pop_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_var_samp_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	expenses_variance_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		maintenance_order_id?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<expenses_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		end_date?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		is_expired?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		is_signed?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		license?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		start_date?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		tenant?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			WithTypename<tenants> | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		transactions?: GraphCacheResolver<
			WithTypename<leases>,
			leasesTransactionsArgs,
			Array<WithTypename<transactions> | string>
		>;
		transactions_aggregate?: GraphCacheResolver<
			WithTypename<leases>,
			leasesTransactions_aggregateArgs,
			WithTypename<transactions_aggregate> | string
		>;
		unit?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			WithTypename<units> | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	leases_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<leases_aggregate>,
			Record<string, never>,
			WithTypename<leases_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<leases_aggregate>,
			Record<string, never>,
			Array<WithTypename<leases> | string>
		>;
	};
	leases_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			leases_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<leases_aggregate_fields>,
			Record<string, never>,
			WithTypename<leases_variance_fields> | string
		>;
	};
	leases_avg_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_max_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		end_date?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		license?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		start_date?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	leases_min_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		end_date?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		license?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		start_date?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	leases_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<leases_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<leases_mutation_response>,
			Record<string, never>,
			Array<WithTypename<leases> | string>
		>;
	};
	leases_stddev_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_stddev_pop_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_stddev_samp_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_sum_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	leases_var_pop_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_var_samp_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	leases_variance_fields?: {
		deposit?: GraphCacheResolver<
			WithTypename<leases_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<leases_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		monthly_rent?: GraphCacheResolver<
			WithTypename<leases_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<leases_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<leases_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings?: {
		available_on?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		is_active?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		lease_length?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			WithTypename<units> | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	listings_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<listings_aggregate>,
			Record<string, never>,
			WithTypename<listings_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<listings_aggregate>,
			Record<string, never>,
			Array<WithTypename<listings> | string>
		>;
	};
	listings_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			listings_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<listings_aggregate_fields>,
			Record<string, never>,
			WithTypename<listings_variance_fields> | string
		>;
	};
	listings_avg_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_max_fields?: {
		available_on?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		lease_length?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	listings_min_fields?: {
		available_on?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		lease_length?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	listings_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<listings_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<listings_mutation_response>,
			Record<string, never>,
			Array<WithTypename<listings> | string>
		>;
	};
	listings_stddev_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_stddev_pop_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_stddev_samp_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_sum_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	listings_var_pop_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_var_samp_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	listings_variance_fields?: {
		id?: GraphCacheResolver<
			WithTypename<listings_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<listings_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders?: {
		client?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			WithTypename<clients> | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		completed_at?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			maintenance_ordersExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			maintenance_ordersExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			WithTypename<properties> | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		status?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			WithTypename<tenants> | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			WithTypename<units> | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	maintenance_orders_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate>,
			Record<string, never>,
			WithTypename<maintenance_orders_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate>,
			Record<string, never>,
			Array<WithTypename<maintenance_orders> | string>
		>;
	};
	maintenance_orders_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			maintenance_orders_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<maintenance_orders_aggregate_fields>,
			Record<string, never>,
			WithTypename<maintenance_orders_variance_fields> | string
		>;
	};
	maintenance_orders_avg_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_max_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		completed_at?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		status?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	maintenance_orders_min_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		completed_at?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		description?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		status?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		title?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	maintenance_orders_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<maintenance_orders_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<maintenance_orders_mutation_response>,
			Record<string, never>,
			Array<WithTypename<maintenance_orders> | string>
		>;
	};
	maintenance_orders_stddev_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_stddev_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_stddev_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_sum_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	maintenance_orders_var_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_var_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	maintenance_orders_variance_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<maintenance_orders_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		unit_id?: GraphCacheResolver<
			WithTypename<maintenance_orders_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties?: {
		area?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		avenue?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		block?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		client?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			WithTypename<clients> | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		coordinates?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['point'] | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		maintenance_orders?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesMaintenance_ordersArgs,
			Array<WithTypename<maintenance_orders> | string>
		>;
		maintenance_orders_aggregate?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesMaintenance_orders_aggregateArgs,
			WithTypename<maintenance_orders_aggregate> | string
		>;
		number?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		street?: GraphCacheResolver<
			WithTypename<properties>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		units?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesUnitsArgs,
			Array<WithTypename<units> | string>
		>;
		units_aggregate?: GraphCacheResolver<
			WithTypename<properties>,
			propertiesUnits_aggregateArgs,
			WithTypename<units_aggregate> | string
		>;
	};
	properties_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<properties_aggregate>,
			Record<string, never>,
			WithTypename<properties_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<properties_aggregate>,
			Record<string, never>,
			Array<WithTypename<properties> | string>
		>;
	};
	properties_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			properties_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<properties_aggregate_fields>,
			Record<string, never>,
			WithTypename<properties_variance_fields> | string
		>;
	};
	properties_avg_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_max_fields?: {
		area?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		avenue?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		block?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		number?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		street?: GraphCacheResolver<
			WithTypename<properties_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	properties_min_fields?: {
		area?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		avenue?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		block?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		number?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		street?: GraphCacheResolver<
			WithTypename<properties_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	properties_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<properties_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<properties_mutation_response>,
			Record<string, never>,
			Array<WithTypename<properties> | string>
		>;
	};
	properties_stddev_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_stddev_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_stddev_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_sum_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	properties_var_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_var_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	properties_variance_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<properties_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<properties_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		dob?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		leases?: GraphCacheResolver<
			WithTypename<tenants>,
			tenantsLeasesArgs,
			Array<WithTypename<leases> | string>
		>;
		leases_aggregate?: GraphCacheResolver<
			WithTypename<tenants>,
			tenantsLeases_aggregateArgs,
			WithTypename<leases_aggregate> | string
		>;
		maintenance_orders?: GraphCacheResolver<
			WithTypename<tenants>,
			tenantsMaintenance_ordersArgs,
			Array<WithTypename<maintenance_orders> | string>
		>;
		maintenance_orders_aggregate?: GraphCacheResolver<
			WithTypename<tenants>,
			tenantsMaintenance_orders_aggregateArgs,
			WithTypename<maintenance_orders_aggregate> | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		user?: GraphCacheResolver<
			WithTypename<tenants>,
			Record<string, never>,
			WithTypename<users> | string
		>;
	};
	tenants_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<tenants_aggregate>,
			Record<string, never>,
			WithTypename<tenants_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<tenants_aggregate>,
			Record<string, never>,
			Array<WithTypename<tenants> | string>
		>;
	};
	tenants_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			tenants_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<tenants_aggregate_fields>,
			Record<string, never>,
			WithTypename<tenants_variance_fields> | string
		>;
	};
	tenants_avg_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_max_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		dob?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<tenants_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	tenants_min_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		dob?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		first_name?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_name?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		second_name?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		third_name?: GraphCacheResolver<
			WithTypename<tenants_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	tenants_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<tenants_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<tenants_mutation_response>,
			Record<string, never>,
			Array<WithTypename<tenants> | string>
		>;
	};
	tenants_stddev_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_stddev_pop_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_stddev_samp_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_sum_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_sum_fields>,
			Record<string, never>,
			Scalars['bigint'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	tenants_var_pop_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_var_samp_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	tenants_variance_fields?: {
		civilid?: GraphCacheResolver<
			WithTypename<tenants_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<tenants_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		due_date?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		is_paid?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		lease?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			WithTypename<leases> | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		receipt_url?: GraphCacheResolver<
			WithTypename<transactions>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	transactions_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<transactions_aggregate>,
			Record<string, never>,
			WithTypename<transactions_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<transactions_aggregate>,
			Record<string, never>,
			Array<WithTypename<transactions> | string>
		>;
	};
	transactions_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			transactions_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<transactions_aggregate_fields>,
			Record<string, never>,
			WithTypename<transactions_variance_fields> | string
		>;
	};
	transactions_avg_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_max_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		due_date?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		receipt_url?: GraphCacheResolver<
			WithTypename<transactions_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	transactions_min_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		due_date?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		memo?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		receipt_url?: GraphCacheResolver<
			WithTypename<transactions_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	transactions_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<transactions_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<transactions_mutation_response>,
			Record<string, never>,
			Array<WithTypename<transactions> | string>
		>;
	};
	transactions_stddev_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_stddev_pop_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_stddev_samp_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_sum_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	transactions_var_pop_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_var_samp_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	transactions_variance_fields?: {
		amount?: GraphCacheResolver<
			WithTypename<transactions_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<transactions_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		lease_id?: GraphCacheResolver<
			WithTypename<transactions_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units?: {
		bath?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		client_id_s?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		expenses?: GraphCacheResolver<
			WithTypename<units>,
			unitsExpensesArgs,
			Array<WithTypename<expenses> | string>
		>;
		expenses_aggregate?: GraphCacheResolver<
			WithTypename<units>,
			unitsExpenses_aggregateArgs,
			WithTypename<expenses_aggregate> | string
		>;
		floor?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		is_vacant?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Boolean'] | string
		>;
		leases?: GraphCacheResolver<
			WithTypename<units>,
			unitsLeasesArgs,
			Array<WithTypename<leases> | string>
		>;
		leases_aggregate?: GraphCacheResolver<
			WithTypename<units>,
			unitsLeases_aggregateArgs,
			WithTypename<leases_aggregate> | string
		>;
		listings?: GraphCacheResolver<
			WithTypename<units>,
			unitsListingsArgs,
			Array<WithTypename<listings> | string>
		>;
		listings_aggregate?: GraphCacheResolver<
			WithTypename<units>,
			unitsListings_aggregateArgs,
			WithTypename<listings_aggregate> | string
		>;
		maintenance_orders?: GraphCacheResolver<
			WithTypename<units>,
			unitsMaintenance_ordersArgs,
			Array<WithTypename<maintenance_orders> | string>
		>;
		maintenance_orders_aggregate?: GraphCacheResolver<
			WithTypename<units>,
			unitsMaintenance_orders_aggregateArgs,
			WithTypename<maintenance_orders_aggregate> | string
		>;
		property?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			WithTypename<properties> | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		type?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_number?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		usage?: GraphCacheResolver<
			WithTypename<units>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	units_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<units_aggregate>,
			Record<string, never>,
			WithTypename<units_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<units_aggregate>,
			Record<string, never>,
			Array<WithTypename<units> | string>
		>;
	};
	units_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			units_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<units_aggregate_fields>,
			Record<string, never>,
			WithTypename<units_variance_fields> | string
		>;
	};
	units_avg_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_max_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		floor?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		type?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_number?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		usage?: GraphCacheResolver<
			WithTypename<units_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	units_min_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		floor?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		type?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		unit_number?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		usage?: GraphCacheResolver<
			WithTypename<units_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
	};
	units_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<units_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<units_mutation_response>,
			Record<string, never>,
			Array<WithTypename<units> | string>
		>;
	};
	units_stddev_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_stddev_pop_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_stddev_samp_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_sum_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['numeric'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	units_var_pop_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_var_samp_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	units_variance_fields?: {
		bath?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		bed?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		property_id?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		rent_market?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		size?: GraphCacheResolver<
			WithTypename<units_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users?: {
		client?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			WithTypename<clients> | string
		>;
		client_id?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_seen?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			WithTypename<tenants> | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	users_aggregate?: {
		aggregate?: GraphCacheResolver<
			WithTypename<users_aggregate>,
			Record<string, never>,
			WithTypename<users_aggregate_fields> | string
		>;
		nodes?: GraphCacheResolver<
			WithTypename<users_aggregate>,
			Record<string, never>,
			Array<WithTypename<users> | string>
		>;
	};
	users_aggregate_fields?: {
		avg?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_avg_fields> | string
		>;
		count?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			users_aggregate_fieldsCountArgs,
			Scalars['Int'] | string
		>;
		max?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_max_fields> | string
		>;
		min?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_min_fields> | string
		>;
		stddev?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_stddev_fields> | string
		>;
		stddev_pop?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_stddev_pop_fields> | string
		>;
		stddev_samp?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_stddev_samp_fields> | string
		>;
		sum?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_sum_fields> | string
		>;
		var_pop?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_var_pop_fields> | string
		>;
		var_samp?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_var_samp_fields> | string
		>;
		variance?: GraphCacheResolver<
			WithTypename<users_aggregate_fields>,
			Record<string, never>,
			WithTypename<users_variance_fields> | string
		>;
	};
	users_avg_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_avg_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_max_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_seen?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_max_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	users_min_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		created_at?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['date'] | string
		>;
		email?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		last_seen?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['timestamptz'] | string
		>;
		phone?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['String'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_min_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	users_mutation_response?: {
		affected_rows?: GraphCacheResolver<
			WithTypename<users_mutation_response>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		returning?: GraphCacheResolver<
			WithTypename<users_mutation_response>,
			Record<string, never>,
			Array<WithTypename<users> | string>
		>;
	};
	users_stddev_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_stddev_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_stddev_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_stddev_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_stddev_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_stddev_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_sum_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_sum_fields>,
			Record<string, never>,
			Scalars['Int'] | string
		>;
	};
	users_var_pop_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_var_pop_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_var_samp_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_var_samp_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
	users_variance_fields?: {
		client_id?: GraphCacheResolver<
			WithTypename<users_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		id?: GraphCacheResolver<
			WithTypename<users_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
		tenant_id?: GraphCacheResolver<
			WithTypename<users_variance_fields>,
			Record<string, never>,
			Scalars['Float'] | string
		>;
	};
};

export type GraphCacheOptimisticUpdaters = {
	delete_clients?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_clientsArgs,
		Maybe<WithTypename<clients_mutation_response>>
	>;
	delete_clients_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_clients_by_pkArgs,
		Maybe<WithTypename<clients>>
	>;
	delete_expenses?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_expensesArgs,
		Maybe<WithTypename<expenses_mutation_response>>
	>;
	delete_expenses_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_expenses_by_pkArgs,
		Maybe<WithTypename<expenses>>
	>;
	delete_expenses_types?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_expenses_typesArgs,
		Maybe<WithTypename<expenses_types_mutation_response>>
	>;
	delete_expenses_types_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_expenses_types_by_pkArgs,
		Maybe<WithTypename<expenses_types>>
	>;
	delete_leases?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_leasesArgs,
		Maybe<WithTypename<leases_mutation_response>>
	>;
	delete_leases_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_leases_by_pkArgs,
		Maybe<WithTypename<leases>>
	>;
	delete_listings?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_listingsArgs,
		Maybe<WithTypename<listings_mutation_response>>
	>;
	delete_listings_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_listings_by_pkArgs,
		Maybe<WithTypename<listings>>
	>;
	delete_maintenance_orders?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_maintenance_ordersArgs,
		Maybe<WithTypename<maintenance_orders_mutation_response>>
	>;
	delete_maintenance_orders_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_maintenance_orders_by_pkArgs,
		Maybe<WithTypename<maintenance_orders>>
	>;
	delete_properties?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_propertiesArgs,
		Maybe<WithTypename<properties_mutation_response>>
	>;
	delete_properties_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_properties_by_pkArgs,
		Maybe<WithTypename<properties>>
	>;
	delete_tenants?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_tenantsArgs,
		Maybe<WithTypename<tenants_mutation_response>>
	>;
	delete_tenants_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_tenants_by_pkArgs,
		Maybe<WithTypename<tenants>>
	>;
	delete_transactions?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_transactionsArgs,
		Maybe<WithTypename<transactions_mutation_response>>
	>;
	delete_transactions_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_transactions_by_pkArgs,
		Maybe<WithTypename<transactions>>
	>;
	delete_units?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_unitsArgs,
		Maybe<WithTypename<units_mutation_response>>
	>;
	delete_units_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_units_by_pkArgs,
		Maybe<WithTypename<units>>
	>;
	delete_users?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_usersArgs,
		Maybe<WithTypename<users_mutation_response>>
	>;
	delete_users_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootDelete_users_by_pkArgs,
		Maybe<WithTypename<users>>
	>;
	insert_clients?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_clientsArgs,
		Maybe<WithTypename<clients_mutation_response>>
	>;
	insert_clients_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_clients_oneArgs,
		Maybe<WithTypename<clients>>
	>;
	insert_expenses?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_expensesArgs,
		Maybe<WithTypename<expenses_mutation_response>>
	>;
	insert_expenses_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_expenses_oneArgs,
		Maybe<WithTypename<expenses>>
	>;
	insert_expenses_types?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_expenses_typesArgs,
		Maybe<WithTypename<expenses_types_mutation_response>>
	>;
	insert_expenses_types_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_expenses_types_oneArgs,
		Maybe<WithTypename<expenses_types>>
	>;
	insert_leases?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_leasesArgs,
		Maybe<WithTypename<leases_mutation_response>>
	>;
	insert_leases_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_leases_oneArgs,
		Maybe<WithTypename<leases>>
	>;
	insert_listings?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_listingsArgs,
		Maybe<WithTypename<listings_mutation_response>>
	>;
	insert_listings_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_listings_oneArgs,
		Maybe<WithTypename<listings>>
	>;
	insert_maintenance_orders?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_maintenance_ordersArgs,
		Maybe<WithTypename<maintenance_orders_mutation_response>>
	>;
	insert_maintenance_orders_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_maintenance_orders_oneArgs,
		Maybe<WithTypename<maintenance_orders>>
	>;
	insert_properties?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_propertiesArgs,
		Maybe<WithTypename<properties_mutation_response>>
	>;
	insert_properties_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_properties_oneArgs,
		Maybe<WithTypename<properties>>
	>;
	insert_tenants?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_tenantsArgs,
		Maybe<WithTypename<tenants_mutation_response>>
	>;
	insert_tenants_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_tenants_oneArgs,
		Maybe<WithTypename<tenants>>
	>;
	insert_transactions?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_transactionsArgs,
		Maybe<WithTypename<transactions_mutation_response>>
	>;
	insert_transactions_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_transactions_oneArgs,
		Maybe<WithTypename<transactions>>
	>;
	insert_units?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_unitsArgs,
		Maybe<WithTypename<units_mutation_response>>
	>;
	insert_units_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_units_oneArgs,
		Maybe<WithTypename<units>>
	>;
	insert_users?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_usersArgs,
		Maybe<WithTypename<users_mutation_response>>
	>;
	insert_users_one?: GraphCacheOptimisticMutationResolver<
		Mutation_rootInsert_users_oneArgs,
		Maybe<WithTypename<users>>
	>;
	update_clients?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_clientsArgs,
		Maybe<WithTypename<clients_mutation_response>>
	>;
	update_clients_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_clients_by_pkArgs,
		Maybe<WithTypename<clients>>
	>;
	update_expenses?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_expensesArgs,
		Maybe<WithTypename<expenses_mutation_response>>
	>;
	update_expenses_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_expenses_by_pkArgs,
		Maybe<WithTypename<expenses>>
	>;
	update_expenses_types?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_expenses_typesArgs,
		Maybe<WithTypename<expenses_types_mutation_response>>
	>;
	update_expenses_types_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_expenses_types_by_pkArgs,
		Maybe<WithTypename<expenses_types>>
	>;
	update_leases?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_leasesArgs,
		Maybe<WithTypename<leases_mutation_response>>
	>;
	update_leases_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_leases_by_pkArgs,
		Maybe<WithTypename<leases>>
	>;
	update_listings?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_listingsArgs,
		Maybe<WithTypename<listings_mutation_response>>
	>;
	update_listings_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_listings_by_pkArgs,
		Maybe<WithTypename<listings>>
	>;
	update_maintenance_orders?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_maintenance_ordersArgs,
		Maybe<WithTypename<maintenance_orders_mutation_response>>
	>;
	update_maintenance_orders_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_maintenance_orders_by_pkArgs,
		Maybe<WithTypename<maintenance_orders>>
	>;
	update_properties?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_propertiesArgs,
		Maybe<WithTypename<properties_mutation_response>>
	>;
	update_properties_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_properties_by_pkArgs,
		Maybe<WithTypename<properties>>
	>;
	update_tenants?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_tenantsArgs,
		Maybe<WithTypename<tenants_mutation_response>>
	>;
	update_tenants_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_tenants_by_pkArgs,
		Maybe<WithTypename<tenants>>
	>;
	update_transactions?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_transactionsArgs,
		Maybe<WithTypename<transactions_mutation_response>>
	>;
	update_transactions_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_transactions_by_pkArgs,
		Maybe<WithTypename<transactions>>
	>;
	update_units?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_unitsArgs,
		Maybe<WithTypename<units_mutation_response>>
	>;
	update_units_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_units_by_pkArgs,
		Maybe<WithTypename<units>>
	>;
	update_users?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_usersArgs,
		Maybe<WithTypename<users_mutation_response>>
	>;
	update_users_by_pk?: GraphCacheOptimisticMutationResolver<
		Mutation_rootUpdate_users_by_pkArgs,
		Maybe<WithTypename<users>>
	>;
};

export type GraphCacheUpdaters = {
	Mutation?: {
		delete_clients?: GraphCacheUpdateResolver<
			{ delete_clients: Maybe<WithTypename<clients_mutation_response>> },
			mutation_rootDelete_clientsArgs
		>;
		delete_clients_by_pk?: GraphCacheUpdateResolver<
			{ delete_clients_by_pk: Maybe<WithTypename<clients>> },
			mutation_rootDelete_clients_by_pkArgs
		>;
		delete_expenses?: GraphCacheUpdateResolver<
			{ delete_expenses: Maybe<WithTypename<expenses_mutation_response>> },
			mutation_rootDelete_expensesArgs
		>;
		delete_expenses_by_pk?: GraphCacheUpdateResolver<
			{ delete_expenses_by_pk: Maybe<WithTypename<expenses>> },
			mutation_rootDelete_expenses_by_pkArgs
		>;
		delete_expenses_types?: GraphCacheUpdateResolver<
			{
				delete_expenses_types: Maybe<
					WithTypename<expenses_types_mutation_response>
				>;
			},
			mutation_rootDelete_expenses_typesArgs
		>;
		delete_expenses_types_by_pk?: GraphCacheUpdateResolver<
			{ delete_expenses_types_by_pk: Maybe<WithTypename<expenses_types>> },
			mutation_rootDelete_expenses_types_by_pkArgs
		>;
		delete_leases?: GraphCacheUpdateResolver<
			{ delete_leases: Maybe<WithTypename<leases_mutation_response>> },
			mutation_rootDelete_leasesArgs
		>;
		delete_leases_by_pk?: GraphCacheUpdateResolver<
			{ delete_leases_by_pk: Maybe<WithTypename<leases>> },
			mutation_rootDelete_leases_by_pkArgs
		>;
		delete_listings?: GraphCacheUpdateResolver<
			{ delete_listings: Maybe<WithTypename<listings_mutation_response>> },
			mutation_rootDelete_listingsArgs
		>;
		delete_listings_by_pk?: GraphCacheUpdateResolver<
			{ delete_listings_by_pk: Maybe<WithTypename<listings>> },
			mutation_rootDelete_listings_by_pkArgs
		>;
		delete_maintenance_orders?: GraphCacheUpdateResolver<
			{
				delete_maintenance_orders: Maybe<
					WithTypename<maintenance_orders_mutation_response>
				>;
			},
			mutation_rootDelete_maintenance_ordersArgs
		>;
		delete_maintenance_orders_by_pk?: GraphCacheUpdateResolver<
			{
				delete_maintenance_orders_by_pk: Maybe<
					WithTypename<maintenance_orders>
				>;
			},
			mutation_rootDelete_maintenance_orders_by_pkArgs
		>;
		delete_properties?: GraphCacheUpdateResolver<
			{ delete_properties: Maybe<WithTypename<properties_mutation_response>> },
			mutation_rootDelete_propertiesArgs
		>;
		delete_properties_by_pk?: GraphCacheUpdateResolver<
			{ delete_properties_by_pk: Maybe<WithTypename<properties>> },
			mutation_rootDelete_properties_by_pkArgs
		>;
		delete_tenants?: GraphCacheUpdateResolver<
			{ delete_tenants: Maybe<WithTypename<tenants_mutation_response>> },
			mutation_rootDelete_tenantsArgs
		>;
		delete_tenants_by_pk?: GraphCacheUpdateResolver<
			{ delete_tenants_by_pk: Maybe<WithTypename<tenants>> },
			mutation_rootDelete_tenants_by_pkArgs
		>;
		delete_transactions?: GraphCacheUpdateResolver<
			{
				delete_transactions: Maybe<
					WithTypename<transactions_mutation_response>
				>;
			},
			mutation_rootDelete_transactionsArgs
		>;
		delete_transactions_by_pk?: GraphCacheUpdateResolver<
			{ delete_transactions_by_pk: Maybe<WithTypename<transactions>> },
			mutation_rootDelete_transactions_by_pkArgs
		>;
		delete_units?: GraphCacheUpdateResolver<
			{ delete_units: Maybe<WithTypename<units_mutation_response>> },
			mutation_rootDelete_unitsArgs
		>;
		delete_units_by_pk?: GraphCacheUpdateResolver<
			{ delete_units_by_pk: Maybe<WithTypename<units>> },
			mutation_rootDelete_units_by_pkArgs
		>;
		delete_users?: GraphCacheUpdateResolver<
			{ delete_users: Maybe<WithTypename<users_mutation_response>> },
			mutation_rootDelete_usersArgs
		>;
		delete_users_by_pk?: GraphCacheUpdateResolver<
			{ delete_users_by_pk: Maybe<WithTypename<users>> },
			mutation_rootDelete_users_by_pkArgs
		>;
		insert_clients?: GraphCacheUpdateResolver<
			{ insert_clients: Maybe<WithTypename<clients_mutation_response>> },
			mutation_rootInsert_clientsArgs
		>;
		insert_clients_one?: GraphCacheUpdateResolver<
			{ insert_clients_one: Maybe<WithTypename<clients>> },
			mutation_rootInsert_clients_oneArgs
		>;
		insert_expenses?: GraphCacheUpdateResolver<
			{ insert_expenses: Maybe<WithTypename<expenses_mutation_response>> },
			mutation_rootInsert_expensesArgs
		>;
		insert_expenses_one?: GraphCacheUpdateResolver<
			{ insert_expenses_one: Maybe<WithTypename<expenses>> },
			mutation_rootInsert_expenses_oneArgs
		>;
		insert_expenses_types?: GraphCacheUpdateResolver<
			{
				insert_expenses_types: Maybe<
					WithTypename<expenses_types_mutation_response>
				>;
			},
			mutation_rootInsert_expenses_typesArgs
		>;
		insert_expenses_types_one?: GraphCacheUpdateResolver<
			{ insert_expenses_types_one: Maybe<WithTypename<expenses_types>> },
			mutation_rootInsert_expenses_types_oneArgs
		>;
		insert_leases?: GraphCacheUpdateResolver<
			{ insert_leases: Maybe<WithTypename<leases_mutation_response>> },
			mutation_rootInsert_leasesArgs
		>;
		insert_leases_one?: GraphCacheUpdateResolver<
			{ insert_leases_one: Maybe<WithTypename<leases>> },
			mutation_rootInsert_leases_oneArgs
		>;
		insert_listings?: GraphCacheUpdateResolver<
			{ insert_listings: Maybe<WithTypename<listings_mutation_response>> },
			mutation_rootInsert_listingsArgs
		>;
		insert_listings_one?: GraphCacheUpdateResolver<
			{ insert_listings_one: Maybe<WithTypename<listings>> },
			mutation_rootInsert_listings_oneArgs
		>;
		insert_maintenance_orders?: GraphCacheUpdateResolver<
			{
				insert_maintenance_orders: Maybe<
					WithTypename<maintenance_orders_mutation_response>
				>;
			},
			mutation_rootInsert_maintenance_ordersArgs
		>;
		insert_maintenance_orders_one?: GraphCacheUpdateResolver<
			{
				insert_maintenance_orders_one: Maybe<WithTypename<maintenance_orders>>;
			},
			mutation_rootInsert_maintenance_orders_oneArgs
		>;
		insert_properties?: GraphCacheUpdateResolver<
			{ insert_properties: Maybe<WithTypename<properties_mutation_response>> },
			mutation_rootInsert_propertiesArgs
		>;
		insert_properties_one?: GraphCacheUpdateResolver<
			{ insert_properties_one: Maybe<WithTypename<properties>> },
			mutation_rootInsert_properties_oneArgs
		>;
		insert_tenants?: GraphCacheUpdateResolver<
			{ insert_tenants: Maybe<WithTypename<tenants_mutation_response>> },
			mutation_rootInsert_tenantsArgs
		>;
		insert_tenants_one?: GraphCacheUpdateResolver<
			{ insert_tenants_one: Maybe<WithTypename<tenants>> },
			mutation_rootInsert_tenants_oneArgs
		>;
		insert_transactions?: GraphCacheUpdateResolver<
			{
				insert_transactions: Maybe<
					WithTypename<transactions_mutation_response>
				>;
			},
			mutation_rootInsert_transactionsArgs
		>;
		insert_transactions_one?: GraphCacheUpdateResolver<
			{ insert_transactions_one: Maybe<WithTypename<transactions>> },
			mutation_rootInsert_transactions_oneArgs
		>;
		insert_units?: GraphCacheUpdateResolver<
			{ insert_units: Maybe<WithTypename<units_mutation_response>> },
			mutation_rootInsert_unitsArgs
		>;
		insert_units_one?: GraphCacheUpdateResolver<
			{ insert_units_one: Maybe<WithTypename<units>> },
			mutation_rootInsert_units_oneArgs
		>;
		insert_users?: GraphCacheUpdateResolver<
			{ insert_users: Maybe<WithTypename<users_mutation_response>> },
			mutation_rootInsert_usersArgs
		>;
		insert_users_one?: GraphCacheUpdateResolver<
			{ insert_users_one: Maybe<WithTypename<users>> },
			mutation_rootInsert_users_oneArgs
		>;
		update_clients?: GraphCacheUpdateResolver<
			{ update_clients: Maybe<WithTypename<clients_mutation_response>> },
			mutation_rootUpdate_clientsArgs
		>;
		update_clients_by_pk?: GraphCacheUpdateResolver<
			{ update_clients_by_pk: Maybe<WithTypename<clients>> },
			mutation_rootUpdate_clients_by_pkArgs
		>;
		update_expenses?: GraphCacheUpdateResolver<
			{ update_expenses: Maybe<WithTypename<expenses_mutation_response>> },
			mutation_rootUpdate_expensesArgs
		>;
		update_expenses_by_pk?: GraphCacheUpdateResolver<
			{ update_expenses_by_pk: Maybe<WithTypename<expenses>> },
			mutation_rootUpdate_expenses_by_pkArgs
		>;
		update_expenses_types?: GraphCacheUpdateResolver<
			{
				update_expenses_types: Maybe<
					WithTypename<expenses_types_mutation_response>
				>;
			},
			mutation_rootUpdate_expenses_typesArgs
		>;
		update_expenses_types_by_pk?: GraphCacheUpdateResolver<
			{ update_expenses_types_by_pk: Maybe<WithTypename<expenses_types>> },
			mutation_rootUpdate_expenses_types_by_pkArgs
		>;
		update_leases?: GraphCacheUpdateResolver<
			{ update_leases: Maybe<WithTypename<leases_mutation_response>> },
			mutation_rootUpdate_leasesArgs
		>;
		update_leases_by_pk?: GraphCacheUpdateResolver<
			{ update_leases_by_pk: Maybe<WithTypename<leases>> },
			mutation_rootUpdate_leases_by_pkArgs
		>;
		update_listings?: GraphCacheUpdateResolver<
			{ update_listings: Maybe<WithTypename<listings_mutation_response>> },
			mutation_rootUpdate_listingsArgs
		>;
		update_listings_by_pk?: GraphCacheUpdateResolver<
			{ update_listings_by_pk: Maybe<WithTypename<listings>> },
			mutation_rootUpdate_listings_by_pkArgs
		>;
		update_maintenance_orders?: GraphCacheUpdateResolver<
			{
				update_maintenance_orders: Maybe<
					WithTypename<maintenance_orders_mutation_response>
				>;
			},
			mutation_rootUpdate_maintenance_ordersArgs
		>;
		update_maintenance_orders_by_pk?: GraphCacheUpdateResolver<
			{
				update_maintenance_orders_by_pk: Maybe<
					WithTypename<maintenance_orders>
				>;
			},
			mutation_rootUpdate_maintenance_orders_by_pkArgs
		>;
		update_properties?: GraphCacheUpdateResolver<
			{ update_properties: Maybe<WithTypename<properties_mutation_response>> },
			mutation_rootUpdate_propertiesArgs
		>;
		update_properties_by_pk?: GraphCacheUpdateResolver<
			{ update_properties_by_pk: Maybe<WithTypename<properties>> },
			mutation_rootUpdate_properties_by_pkArgs
		>;
		update_tenants?: GraphCacheUpdateResolver<
			{ update_tenants: Maybe<WithTypename<tenants_mutation_response>> },
			mutation_rootUpdate_tenantsArgs
		>;
		update_tenants_by_pk?: GraphCacheUpdateResolver<
			{ update_tenants_by_pk: Maybe<WithTypename<tenants>> },
			mutation_rootUpdate_tenants_by_pkArgs
		>;
		update_transactions?: GraphCacheUpdateResolver<
			{
				update_transactions: Maybe<
					WithTypename<transactions_mutation_response>
				>;
			},
			mutation_rootUpdate_transactionsArgs
		>;
		update_transactions_by_pk?: GraphCacheUpdateResolver<
			{ update_transactions_by_pk: Maybe<WithTypename<transactions>> },
			mutation_rootUpdate_transactions_by_pkArgs
		>;
		update_units?: GraphCacheUpdateResolver<
			{ update_units: Maybe<WithTypename<units_mutation_response>> },
			mutation_rootUpdate_unitsArgs
		>;
		update_units_by_pk?: GraphCacheUpdateResolver<
			{ update_units_by_pk: Maybe<WithTypename<units>> },
			mutation_rootUpdate_units_by_pkArgs
		>;
		update_users?: GraphCacheUpdateResolver<
			{ update_users: Maybe<WithTypename<users_mutation_response>> },
			mutation_rootUpdate_usersArgs
		>;
		update_users_by_pk?: GraphCacheUpdateResolver<
			{ update_users_by_pk: Maybe<WithTypename<users>> },
			mutation_rootUpdate_users_by_pkArgs
		>;
	};
	Subscription?: {
		clients?: GraphCacheUpdateResolver<
			{ clients: Array<WithTypename<clients>> },
			subscription_rootClientsArgs
		>;
		clients_aggregate?: GraphCacheUpdateResolver<
			{ clients_aggregate: WithTypename<clients_aggregate> },
			subscription_rootClients_aggregateArgs
		>;
		clients_by_pk?: GraphCacheUpdateResolver<
			{ clients_by_pk: Maybe<WithTypename<clients>> },
			subscription_rootClients_by_pkArgs
		>;
		expenses?: GraphCacheUpdateResolver<
			{ expenses: Array<WithTypename<expenses>> },
			subscription_rootExpensesArgs
		>;
		expenses_aggregate?: GraphCacheUpdateResolver<
			{ expenses_aggregate: WithTypename<expenses_aggregate> },
			subscription_rootExpenses_aggregateArgs
		>;
		expenses_by_pk?: GraphCacheUpdateResolver<
			{ expenses_by_pk: Maybe<WithTypename<expenses>> },
			subscription_rootExpenses_by_pkArgs
		>;
		expenses_types?: GraphCacheUpdateResolver<
			{ expenses_types: Array<WithTypename<expenses_types>> },
			subscription_rootExpenses_typesArgs
		>;
		expenses_types_aggregate?: GraphCacheUpdateResolver<
			{ expenses_types_aggregate: WithTypename<expenses_types_aggregate> },
			subscription_rootExpenses_types_aggregateArgs
		>;
		expenses_types_by_pk?: GraphCacheUpdateResolver<
			{ expenses_types_by_pk: Maybe<WithTypename<expenses_types>> },
			subscription_rootExpenses_types_by_pkArgs
		>;
		leases?: GraphCacheUpdateResolver<
			{ leases: Array<WithTypename<leases>> },
			subscription_rootLeasesArgs
		>;
		leases_aggregate?: GraphCacheUpdateResolver<
			{ leases_aggregate: WithTypename<leases_aggregate> },
			subscription_rootLeases_aggregateArgs
		>;
		leases_by_pk?: GraphCacheUpdateResolver<
			{ leases_by_pk: Maybe<WithTypename<leases>> },
			subscription_rootLeases_by_pkArgs
		>;
		listings?: GraphCacheUpdateResolver<
			{ listings: Array<WithTypename<listings>> },
			subscription_rootListingsArgs
		>;
		listings_aggregate?: GraphCacheUpdateResolver<
			{ listings_aggregate: WithTypename<listings_aggregate> },
			subscription_rootListings_aggregateArgs
		>;
		listings_by_pk?: GraphCacheUpdateResolver<
			{ listings_by_pk: Maybe<WithTypename<listings>> },
			subscription_rootListings_by_pkArgs
		>;
		maintenance_orders?: GraphCacheUpdateResolver<
			{ maintenance_orders: Array<WithTypename<maintenance_orders>> },
			subscription_rootMaintenance_ordersArgs
		>;
		maintenance_orders_aggregate?: GraphCacheUpdateResolver<
			{
				maintenance_orders_aggregate: WithTypename<maintenance_orders_aggregate>;
			},
			subscription_rootMaintenance_orders_aggregateArgs
		>;
		maintenance_orders_by_pk?: GraphCacheUpdateResolver<
			{ maintenance_orders_by_pk: Maybe<WithTypename<maintenance_orders>> },
			subscription_rootMaintenance_orders_by_pkArgs
		>;
		properties?: GraphCacheUpdateResolver<
			{ properties: Array<WithTypename<properties>> },
			subscription_rootPropertiesArgs
		>;
		properties_aggregate?: GraphCacheUpdateResolver<
			{ properties_aggregate: WithTypename<properties_aggregate> },
			subscription_rootProperties_aggregateArgs
		>;
		properties_by_pk?: GraphCacheUpdateResolver<
			{ properties_by_pk: Maybe<WithTypename<properties>> },
			subscription_rootProperties_by_pkArgs
		>;
		tenants?: GraphCacheUpdateResolver<
			{ tenants: Array<WithTypename<tenants>> },
			subscription_rootTenantsArgs
		>;
		tenants_aggregate?: GraphCacheUpdateResolver<
			{ tenants_aggregate: WithTypename<tenants_aggregate> },
			subscription_rootTenants_aggregateArgs
		>;
		tenants_by_pk?: GraphCacheUpdateResolver<
			{ tenants_by_pk: Maybe<WithTypename<tenants>> },
			subscription_rootTenants_by_pkArgs
		>;
		transactions?: GraphCacheUpdateResolver<
			{ transactions: Array<WithTypename<transactions>> },
			subscription_rootTransactionsArgs
		>;
		transactions_aggregate?: GraphCacheUpdateResolver<
			{ transactions_aggregate: WithTypename<transactions_aggregate> },
			subscription_rootTransactions_aggregateArgs
		>;
		transactions_by_pk?: GraphCacheUpdateResolver<
			{ transactions_by_pk: Maybe<WithTypename<transactions>> },
			subscription_rootTransactions_by_pkArgs
		>;
		units?: GraphCacheUpdateResolver<
			{ units: Array<WithTypename<units>> },
			subscription_rootUnitsArgs
		>;
		units_aggregate?: GraphCacheUpdateResolver<
			{ units_aggregate: WithTypename<units_aggregate> },
			subscription_rootUnits_aggregateArgs
		>;
		units_by_pk?: GraphCacheUpdateResolver<
			{ units_by_pk: Maybe<WithTypename<units>> },
			subscription_rootUnits_by_pkArgs
		>;
		users?: GraphCacheUpdateResolver<
			{ users: Array<WithTypename<users>> },
			subscription_rootUsersArgs
		>;
		users_aggregate?: GraphCacheUpdateResolver<
			{ users_aggregate: WithTypename<users_aggregate> },
			subscription_rootUsers_aggregateArgs
		>;
		users_by_pk?: GraphCacheUpdateResolver<
			{ users_by_pk: Maybe<WithTypename<users>> },
			subscription_rootUsers_by_pkArgs
		>;
	};
};

export type GraphCacheConfig = {
	schema?: IntrospectionData;
	updates?: GraphCacheUpdaters;
	keys?: GraphCacheKeysConfig;
	optimistic?: GraphCacheOptimisticUpdaters;
	resolvers?: GraphCacheResolvers;
	storage?: GraphCacheStorageAdapter;
};
export const detailsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'details' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'clients' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
				],
			},
		},
	],
} as unknown as DocumentNode<detailsFragment, unknown>;
export const leasesDetailsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'leasesDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'leases' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_expired' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_signed' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'license' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'monthly_rent' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'tenant_id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'unit_id' } },
				],
			},
		},
	],
} as unknown as DocumentNode<leasesDetailsFragment, unknown>;
export const propertiesDetailsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'propertiesDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'properties' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
				],
			},
		},
	],
} as unknown as DocumentNode<propertiesDetailsFragment, unknown>;
export const tenantsDetailsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'tenantsDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'tenants' },
			},
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
} as unknown as DocumentNode<tenantsDetailsFragment, unknown>;
export const unitsDetailsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'unitsDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'units' },
			},
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
} as unknown as DocumentNode<unitsDetailsFragment, unknown>;
export const ClientsInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'ClientsInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'clients_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_clients_one' },
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
									name: { kind: 'Name', value: 'details' },
								},
							],
						},
					},
				],
			},
		},
		...detailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	ClientsInsertMutation,
	ClientsInsertMutationVariables
>;
export const ClientsUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'ClientsUpdate' },
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
						name: { kind: 'Name', value: 'clients_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_clients_by_pk' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'details' },
								},
							],
						},
					},
				],
			},
		},
		...detailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	ClientsUpdateMutation,
	ClientsUpdateMutationVariables
>;
export const DeleteClientsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteClients' },
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
						name: { kind: 'Name', value: 'delete_clients_by_pk' },
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
} as unknown as DocumentNode<
	DeleteClientsMutation,
	DeleteClientsMutationVariables
>;
export const ClientsByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientsById' },
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
						name: { kind: 'Name', value: 'clients_by_pk' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'details' },
								},
							],
						},
					},
				],
			},
		},
		...detailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<ClientsByIdQuery, ClientsByIdQueryVariables>;
export const ClientsListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientsList' },
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
								name: { kind: 'Name', value: 'clients_order_by' },
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
						name: { kind: 'Name', value: 'clients' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'details' },
								},
							],
						},
					},
				],
			},
		},
		...detailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<ClientsListQuery, ClientsListQueryVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'leasesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...leasesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	LeasesInsertMutation,
	LeasesInsertMutationVariables
>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'leasesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...leasesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	LeasesUpdateMutation,
	LeasesUpdateMutationVariables
>;
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
} as unknown as DocumentNode<
	DeleteLeasesMutation,
	DeleteLeasesMutationVariables
>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'leasesDetails' },
								},
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
		...leasesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<LeasesByIdQuery, LeasesByIdQueryVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'leasesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...leasesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<LeasesListQuery, LeasesListQueryVariables>;
export const PropertiesInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'PropertiesInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'properties_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_properties_one' },
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
									name: { kind: 'Name', value: 'propertiesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...propertiesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	PropertiesInsertMutation,
	PropertiesInsertMutationVariables
>;
export const PropertiesUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'PropertiesUpdate' },
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
						name: { kind: 'Name', value: 'properties_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_properties_by_pk' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'propertiesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...propertiesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	PropertiesUpdateMutation,
	PropertiesUpdateMutationVariables
>;
export const DeletePropertiesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteProperties' },
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
						name: { kind: 'Name', value: 'delete_properties_by_pk' },
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
} as unknown as DocumentNode<
	DeletePropertiesMutation,
	DeletePropertiesMutationVariables
>;
export const PropertiesByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertiesById' },
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
						name: { kind: 'Name', value: 'properties_by_pk' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'propertiesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...propertiesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<PropertiesByIdQuery, PropertiesByIdQueryVariables>;
export const PropertiesListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertiesList' },
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
								name: { kind: 'Name', value: 'properties_order_by' },
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
						name: { kind: 'Name', value: 'properties' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'propertiesDetails' },
								},
							],
						},
					},
				],
			},
		},
		...propertiesDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<PropertiesListQuery, PropertiesListQueryVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'tenantsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...tenantsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	TenantsInsertMutation,
	TenantsInsertMutationVariables
>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'tenantsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...tenantsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<
	TenantsUpdateMutation,
	TenantsUpdateMutationVariables
>;
export const DeleteTenantsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteTenants' },
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
} as unknown as DocumentNode<
	DeleteTenantsMutation,
	DeleteTenantsMutationVariables
>;
export const TenantsByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TenantsById' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'tenantsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...tenantsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<TenantsByIdQuery, TenantsByIdQueryVariables>;
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
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'tenantsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...tenantsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<TenantsListQuery, TenantsListQueryVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'unitsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...unitsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<UnitsInsertMutation, UnitsInsertMutationVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'unitsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...unitsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<UnitsUpdateMutation, UnitsUpdateMutationVariables>;
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
} as unknown as DocumentNode<DeleteUnitsMutation, DeleteUnitsMutationVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'unitsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...unitsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<UnitsByIdQuery, UnitsByIdQueryVariables>;
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'unitsDetails' },
								},
							],
						},
					},
				],
			},
		},
		...unitsDetailsFragmentDoc.definitions,
	],
} as unknown as DocumentNode<UnitsListQuery, UnitsListQueryVariables>;
export const TrxByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TrxById' },
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
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TrxByIdQuery, TrxByIdQueryVariables>;
export const Trx2ByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Trx2ById' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'memo' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<Trx2ByIdQuery, Trx2ByIdQueryVariables>;
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
} as unknown as DocumentNode<
	TenantsByIdLocalQuery,
	TenantsByIdLocalQueryVariables
>;
