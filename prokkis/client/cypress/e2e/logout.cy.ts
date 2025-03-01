describe('Makes account, then logs in and then logsout then there should be login again as we are on the login page', () => {
    before(() => {
      cy.task('clearDatabase');
    });
      it('passes', () => {
        cy.visit('http://localhost:3002/signup')
  
      cy.get('input[name="email"]').type("test1Login.test@test.com")
      cy.get('input[name="password"]').type("testWord123!")
      cy.get('button[name="signupButton"]').click()
  
      cy.wait(1000)
      cy.get('input[name="email"]').type("test1Login.test@test.com")
      cy.get('input[name="password"]').type("testWord123!")
      cy.get('button[id="loginButton"]').click()

      cy.wait(1500)

      cy.get('button').contains("logout").click()
      cy.wait(1000)
      cy.get('h4').contains("login").should('exist')
    })
  })