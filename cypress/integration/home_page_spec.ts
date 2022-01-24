Cypress.Cookies.debug(true);

describe('A successful login', () => {
	beforeEach(() => {
		cy.viewport('macbook-16');
		Cypress.Cookies.preserveOnce('user', 'hasura');
	});
	before(() => {
		cy.viewport('macbook-16');
		cy.visit('/auth/logout');
		cy.visit('/landing');
		cy.contains('Login').click();
		cy.get('#username').type('dev.tester.3@mailthink.net');
		cy.get('#password').type('HVuc1C8Ls9CN');
		cy.contains('Continue').click();
	});

	it('redirects to home page', () => {
		cy.getCookies();
		cy.location('pathname').should('eq', '/');
	});

	describe('persists the user cookie', () => {
		afterEach(() => {
			cy.reload();
		});

		it('upon redirection', () => {
			cy.getCookies();
			cy.getCookie('user')
				.should('have.property', 'value')
				// .its('value')
				.should('not.be.undefined')
				.should('not.be.null')
				.should('not.eq', '');
		});

		it('after reloading', () => {
			cy.getCookies();
			cy.getCookie('user')
				.should('have.property', 'value')
				// .its('value')
				.should('not.be.undefined')
				.should('not.be.null')
				.should('not.eq', '');
		});
	});

	it('goes to the tenants page', () => {
		cy.getCookies();
		cy.get('button.bx--header__action:nth-child(2)').click();
		cy.contains('Tenants').click();
		cy.location('pathname').should('eq', '/tenants');
	});
	// it('successfully sets the hasura cookie', () => {
	// 	cy.getCookies();
	// 	cy.getCookie('hasura')
	// 		.should('have.property', 'value')
	// 		.its('value')
	// 		.should('not.be.undefined')
	// 		.should('not.be.null')
	// 		.should('not.eq', '');
	// });

	// check that user cookie persists after refresh
	it('successfully persists the user cookie after refresh', () => {
		cy.getCookies();
		cy.reload();
		cy.getCookies();
		cy.getCookie('user')
			.should('have.property', 'value')
			// .its('value')
			.should('not.be.undefined')
			.should('not.be.null')
			.should('not.eq', '');
	});

	// // check that hasura cookie persists after refresh
	// it('successfully persists the hasura cookie after refresh', () => {
	// 	cy.getCookies();
	// 	cy.reload();
	// 	cy.getCookies();
	// 	cy.getCookie('hasura')
	// 		.should('have.property', 'value')
	// 		.its('value')
	// 		.should('not.be.undefined')
	// 		.should('not.be.null')
	// 		.should('not.eq', '');
	// });
});
