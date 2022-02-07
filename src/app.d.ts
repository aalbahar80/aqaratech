/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		hasura: string;
		user: string;
		userId: string;
	}

	interface Platform {}

	interface Session {
		hasura: string;
		user: string;
		userId: string;
	}

	interface Stuff {}
}

type FormType = 'create' | 'update';
