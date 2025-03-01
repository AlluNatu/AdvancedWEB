describe('Makes account, then logs in ', () => {
  before(() => {
    cy.task('clearDatabase');
  });
    it('passes', () => {
      cy.visit('http://localhost:3002/signup')

    cy.get('input[name="email"]').type("test1Login.test@test.com")
    cy.get('input[name="password"]').type("testWord123!")
    cy.get('button[name="signupButton"]').click()

    cy.wait(2000)
    cy.get('input[name="email"]').type("test1Login.test@test.com")
    cy.get('input[name="password"]').type("testWord123!")
    cy.get('button[id="loginButton"]').click()
  })
})