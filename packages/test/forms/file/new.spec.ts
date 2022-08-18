import { expect } from "@playwright/test";
import { sample, testOrgRoleId } from "@self/seed";
import { entitiesMap } from "@self/utils";
import { test } from "../../config";

const fileEntity = entitiesMap.file;
const portfolioEntity = entitiesMap.portfolio;
const portfolio = sample.portfolios[0];

const params = new URLSearchParams({
	relationKey: portfolioEntity.title,
	relationValue: portfolio.id,
});

const url = `/${fileEntity.urlName}/new?${params.toString()}`;
test("files can be uploaded", async ({ page, request, token }, info) => {
	const fileName = "myfile";

	// upload file
	await page.goto(url);
	await page.locator('input[name="fileName"]').fill(fileName);
	await page
		.locator('input[name="file"]')
		.setInputFiles("./forms/file/upload-test.png");
	await page.locator("text=Save").click();

	await expect(page).toHaveURL(`/${portfolioEntity.urlName}/${portfolio.id}`);

	const key = `${portfolioEntity.title}/${portfolio.id}/${fileName}`;
	const response = await request.get(
		`http://localhost:3002/${
			fileEntity.urlName
		}/find-one?key=${encodeURIComponent(key)}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"x-role-id": testOrgRoleId,
			},
		}
	);

	expect(response.status()).toBe(200);
});
