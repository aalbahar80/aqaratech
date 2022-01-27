Cypress.Cookies.debug(true);
const logoutUrl =
	'https://dev-eehvhdp2.eu.auth0.com/v2/logout?client_id=z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct&returnTo=http://localhost:3000';

describe('A successful login', () => {
	before(() => {
		cy.viewport('macbook-16');
		cy.request('/auth/logout');
		cy.getCookies();
		cy.visit('/landing');
		cy.contains('Login').click();
		cy.get('#username').type('dev.tester.3@mailthink.net');
		cy.get('#password').type('HVuc1C8Ls9CN');
		cy.contains('Continue').click();
		cy.getCookies();
	});
	beforeEach(() => {
		cy.viewport('macbook-16');
		Cypress.Cookies.preserveOnce('user', 'hasura');
	});

	it('redirects to home page', () => {
		cy.getCookies();
		cy.location('pathname').should('eq', '/');
		cy.getCookies();
	});

	it('has the user and hasura cookies', () => {
		cy.getCookies();
	});

	describe('persists the user and hasura cookies', () => {
		// afterEach(() => {
		// 	cy.reload();
		// });

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
