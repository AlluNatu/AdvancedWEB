describe('Makes account, then logs in and makes a note and checks that its there', () => {
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

        cy.get('button[id="addNote"]').contains('Add Note').click()

        cy.get('input[id="title"]').type("testNote")
        cy.get('input[id="content"]').type("testContent")

        cy.get('#demo-simple-select').click();
        cy.get('li').contains('testColumn').click(); // Click on the specific option
        cy.get('button[type="submit"]').click();

        cy.contains('testNote').should('exist');
        cy.contains('testContent').should('exist');
        cy.contains('testColumn').should('exist');
        
        // cy.intercept('DELETE', '**/api/deleteColumn').as('deleteColumn')
        // cy.get('button[id="deleteColumn"]').click()
        // cy.wait('@deleteColumn')
        // cy.wait(500)
        // cy.get('h3').should('not.exist')
      })
    })