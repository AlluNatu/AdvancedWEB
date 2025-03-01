describe('Makes account, then logs in and makes a column and checks that its there then deletes it and checks that there is nothing', () => {
  before(() => {
    cy.task('clearDatabase');
  });
    it('passes', () => {
      cy.visit('http://localhost:3002/signup')
  
      cy.get('input[name="email"]').type("test1Column.test@test.com")
      cy.get('input[name="password"]').type("testWord123!")
      cy.get('button[name="signupButton"]').click()
  
      cy.wait(2000)
      cy.get('input[name="email"]').type("test1Column.test@test.com")
      cy.get('input[name="password"]').type("testWord123!")
      cy.get('button[id="loginButton"]').click()

      cy.wait(2000)
      cy.get('button[id="addColumn"]').contains('Add Column').click()
      cy.get('input[id="columName"]').type("testColumn")
      cy.get('button[id="addButton"]').click()
      cy.wait(1000)
      cy.get('h3').contains("testColumn").should('exist')
      cy.wait(1000)
      
      cy.intercept('DELETE', '**/api/deleteColumn').as('deleteColumn')
      cy.get('button[id="deleteColumn"]').click()
      cy.wait('@deleteColumn')
      cy.wait(500)
      cy.get('h3').should('not.exist')
    })
  })