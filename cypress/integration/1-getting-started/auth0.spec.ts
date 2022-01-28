describe('Auth0', function () {
	beforeEach(function () {
		// cy.task('db:seed');
		cy.loginByAuth0Api(
			Cypress.env('dev.tester.3@mailthink.net'),
			Cypress.env('HVuc1C8Ls9CN'),
		);
	});

	it('shows onboarding', function () {
		cy.contains('Get Started').should('be.visible');
	});
});
