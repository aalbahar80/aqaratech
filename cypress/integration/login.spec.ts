describe('The login process', () => {
	beforeEach(() => {
		cy.viewport('macbook-16');
		Cypress.Cookies.preserveOnce('user', 'hasura');
	});

	it('starts with a logged out state', () => {
		cy.request('/auth/logout');
		['user', 'hasura'].forEach((cookie) => {
			cy.getCookie(cookie).should('exist').its('value').should('be.empty');
		});
	});

	it('enables logging in from /landing', () => {
		cy.visit('/landing');
		cy.contains('Login').click();
		cy.get('#username').type('dev.tester.3@mailthink.net');
		cy.get('#password').type('HVuc1C8Ls9CN');
		cy.contains('Continue').click();
	});

	it('redirects to home page', () => {
		cy.location('pathname').should('eq', '/');
	});

	describe('persists the user and hasura cookies', () => {
		afterEach(() => {
			cy.reload();
		});

		it('upon redirection', () => {
			['user', 'hasura'].forEach((cookie) => {
				cy.getCookies();
				cy.getCookie(cookie)
					.should('exist')
					.its('value')
					.should('exist')
					.and('not.be.undefined')
					.and('not.be.null')
					.and('not.eq', '');
			});
		});

		it('through reloading', () => {
			['user', 'hasura'].forEach((cookie) => {
				cy.getCookie(cookie)
					.should('exist')
					.and('have.property', 'value')
					.and('not.be.undefined')
					.and('not.be.null')
					.and('not.eq', '');
			});
		});
	});

	it('goes to the tenants page', () => {
		cy.get('button.bx--header__action:nth-child(2)').click();
		cy.contains('Tenants').click();
		cy.location('pathname').should('eq', '/tenants');
	});
});
