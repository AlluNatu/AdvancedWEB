describe('Makes account', () => {
  before(() => {
    cy.task('clearDatabase');
  });
    it('passes', () => {
      cy.visit('http://localhost:3002/signup')

    cy.get('input[name="email"]').type("test1Register.test@test.com")
    cy.get('input[name="password"]').type("testWord123!")
    cy.get('button[name="signupButton"]').click()
  })
})