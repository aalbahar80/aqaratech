import {
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	PortfoliosApi,
	PropertiesApi,
	TenantsApi,
	UnitsApi,
} from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

const token =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJodHRwczovL2xldGFuZC5iZS91c2VyU3R1ZmYiOnsiY3JlYXRlZEF0IjoiMjAxOS0xMC0wM1QxODo1OTo0NC44NTNaIiwiZW1haWwiOiJhZG1pbi5kZXZAbWFpbHRoaW5rLm5ldCIsImZ1bGxOYW1lIjoi2YXYtdi32YHZiSDYp9mE2YbYrNin2LEiLCJpZCI6ImozYTUwMGJxczRkaiIsInJvbGVzIjpbeyJjcmVhdGVkQXQiOiIyMDIxLTAxLTI0VDE2OjEzOjA4LjQ2MVoiLCJpZCI6Imw4cjZobmZ3a3MyYSIsIm9yZ2FuaXphdGlvbklkIjoiaGRtcDVwamUxYTdvIiwicGVybWlzc2lvbnMiOm51bGwsInBvcnRmb2xpb0lkIjpudWxsLCJ0ZW5hbnRJZCI6bnVsbCwidXBkYXRlZEF0IjoiMjAyMS0wMS0wN1QwMTo0OToyOS41NjRaIiwidXNlcklkIjoiajNhNTAwYnFzNGRqIn0seyJjcmVhdGVkQXQiOiIyMDIyLTA0LTI3VDAzOjA0OjQxLjYyMVoiLCJpZCI6InFudWlsYmhsdDQ1bSIsIm9yZ2FuaXphdGlvbklkIjoiaGRtcDVwamUxYTdvIiwicGVybWlzc2lvbnMiOm51bGwsInBvcnRmb2xpb0lkIjpudWxsLCJ0ZW5hbnRJZCI6bnVsbCwidXBkYXRlZEF0IjoiMjAyMS0wMy0wOVQxNzo0NDoxNi4xMjhaIiwidXNlcklkIjoiajNhNTAwYnFzNGRqIn1dLCJ1cGRhdGVkQXQiOiIyMDIwLTA5LTE2VDIxOjE0OjQ3LjYzN1oifSwiaHR0cHM6Ly9sZXRhbmQuYmUvcm9sZXMiOlsiYWRtaW4iXSwiaHR0cHM6Ly9sZXRhbmQuYmUvYXBwTWV0YWRhdGEiOnt9LCJpc3MiOiJodHRwczovL2Rldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI1ZWI2ZmU3YzExZTIwMDY4OTRiNzQ4IiwiYXVkIjpbImxldGFuZC5iZS9hcGkiLCJodHRwczovL2Rldi1lZWh2aGRwMi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjU2NTQwODk2LCJleHAiOjE2NTY2MjcyOTYsImF6cCI6Ino2b3F5T3VQTGFvNlhoSmVDamU5dFo4WmJpSmE1emN0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.ssOF-ZvIWMjqdEt2PAH8K7VM6x83UDnet1rRnoSd1EQsL2mEVtegsoaJmmEmgZXVJtk9cwrnlviNMzjQoO6HpgltGBIZpbj6g0Nm_bOpboHX2f6PI96MLxUUs9xi0f8LQvSYkKmaD1jsvHiTtulpKfaBVvizG3PdBHiOExKBxfH9zhYPgmKn03JVdvPVhuMg0gH2XZ0lhiJLmYNNQ76b5IcS-FQ0ok_ZttBkY4-rae_ZC8JKhyc_xfl9ePbjgzSlwAAoUO38NsbYPWu9-O3GsbSnIoh8t1QzPmwFjxcYJiwwRa-_GX8fesc7QhT8JDbe0WkmEE2OnDEeQ0qhFxkalw';

export const api = (loadFetch?: LoadEvent['fetch']) => {
	let config: Configuration;

	const basePath = import.meta.env.VITE_VERCEL_ENV
		? import.meta.env.VITE_API_URL
		: 'http://localhost:3002';

	const headers = { Authorization: `Bearer ${token}` };

	if (loadFetch) {
		config = new Configuration({
			fetchApi: loadFetch,
			headers,
			basePath,
		});
	} else {
		config = new Configuration({ headers, basePath });
	}

	return {
		tenants: new TenantsApi(config),
		portfolios: new PortfoliosApi(config),
		properties: new PropertiesApi(config),
		units: new UnitsApi(config),
		leases: new LeasesApi(config),
		leaseInvoices: new LeaseInvoicesApi(config),
		expenses: new ExpensesApi(config),
	};
};
