describe('Makes account, goes to login page checks that text is there, clicks button to change language, checks new language', () => {
    before(() => {
      cy.task('clearDatabase');
    });
      it('passes', () => {
        cy.visit('http://localhost:3002/signup')
  
      cy.get('input[name="email"]').type("test1Login.test@test.com")
      cy.get('input[name="password"]').type("testWord123!")
      cy.get('button[name="signupButton"]').click()

      cy.wait(600)

      cy.get('h4').contains("login")
      cy.get('div').contains("Notes app")
      cy.get('a').contains("Don't have an account? Sign Up")

      cy.wait(500)
      cy.get('button[id="fi"]').click()

      cy.get('div').contains("Muistio sovellus")
      cy.get('h4').contains("Kirjaudu")
      cy.get('a').contains("Ei löydy käyttäjää? Tee sellainen!")
    })
  })