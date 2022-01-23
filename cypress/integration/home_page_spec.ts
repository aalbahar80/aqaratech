describe('The Home Page', () => {
	it('Redirects to home page after', () => {
		cy.visit('/auth/logout');
		cy.visit('/landing');

		cy.contains('Login').click();

		cy.get('#username').type('dev.tester.3@mailthink.net');
		cy.get('#password').type('HVuc1C8Ls9CN');
		cy.contains('Continue').click();

		cy.location('pathname').should('eq', '/');

		cy.getCookie('user');

		it('should not be an empty string', () => {
			cy.getCookie('user').its('value').should('not.eq', '');
		});

		// cy.getCookie('user').should('not.be.empty');
		// cy.getCookie('user').should('have.property', 'value');
		// cy.getCookie('hasura').should('not.be.empty');
	});
	context('after getting signing in', () => {
		it('have a value property', () => {
			cy.getCookie('user').should('have.property', 'value');
		});
	});
});
