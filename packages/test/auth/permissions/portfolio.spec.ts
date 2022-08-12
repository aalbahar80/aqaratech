import { expect, test } from "@playwright/test";
import { testPortfolioRoleId } from "@self/seed";

const TOKEN =
	"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJodHRwczovL2xldGFuZC5iZS9lbWFpbCI6Im9yZy5kZW1vQG1haWx0aGluay5uZXQiLCJodHRwczovL2xldGFuZC5iZS9yb2xlcyI6W10sImh0dHBzOi8vbGV0YW5kLmJlL2FwcE1ldGFkYXRhIjp7fSwiaXNzIjoiaHR0cHM6Ly9kZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyZTE0MzkyYTE0OWIyNzZkZDE3N2QzZiIsImF1ZCI6ImxldGFuZC5iZS9hcGkiLCJpYXQiOjE2NjAzMjIxODYsImV4cCI6MTY2MDQwODU4NiwiYXpwIjoiejZvcXlPdVBMYW82WGhKZUNqZTl0WjhaYmlKYTV6Y3QifQ.ixtV8QEikRGRNqIURy_m1PVRd3DIM74x8Zqetag3gbvMNDaoUhBwU6qxtIZAF2d6A-sjafgTVHbEM95iGX1ATmBnmvo0AoplyZc4QVqr2Ez5L4jlWMFByg5Ao1VqShPsasXpKX0EaRyIdMSZrJm1u6XclD7lBqyE7p3nsOm6Yfnj2KFF-q5MkI72TKZiAtbu_7IJjDqBSUqHOrn0i1aNuI1OPZnU6tqkOrZE1NR2pxeOBY4J39d97lH1E69SQ_jxh0nVFrn4gYNWFmw4pFsdjghtzCCYG4DfxVu4garsGaZjTGZV8GZEjuyZi54RDH07GOz2kTLLKliPZtLNbMj2RQ";

test.use({
	baseURL: "http://localhost:3002",
	extraHTTPHeaders: {
		Authorization: `Bearer ${TOKEN}`,
		"x-role-id": testPortfolioRoleId,
	},
});

test("should be able to get expenses", async ({ request }) => {
	const res = await request.get("/expenses");
	await expect(res).toBeOK();
});

test("should be able to get units", async ({ request }) => {
	const res = await request.get("/units");
	await expect(res).toBeOK();
});
