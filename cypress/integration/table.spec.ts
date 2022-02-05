// Test pagination in table
describe('The tenants table', () => {
	before(() => {
		cy.visit('/tenants');
	});

	it('starts on the first page', () => {
		cy.get('.bx--pagination__left > span').then(($span) => {
			if ($span.text()[0] !== '1') {
				throw new Error('Expected to be on the first page');
			}
		});
	});

	it('goes to the next page', () => {
		// check table contents change after clicking next page
		['2', '3', '4'].forEach((n) => {
			cy.get('.bx--pagination__button--forward').click();
			cy.location('search').should('have.string', `page=${n}`);
		});
	});

	it('goes back to the previous page', () => {
		// check table contents change after clicking next page
		cy.location('search').then((search) => {
			// get the page number from the query string
			const page = Number(search.split('=')[1]);
			console.log(page);
			cy.get('.bx--pagination__button--backward').click();
			cy.location('search').should('not.have.string', `page=${page}`);
		});
	});
});
