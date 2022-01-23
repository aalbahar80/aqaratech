describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/');

		cy.contains('Login').click();

		cy.get('#username').type('dev.tester.3@mailthink.net');
		cy.get('#password').type('HVuc1C8Ls9CN');
		cy.contains('Continue').click();
	});
});
