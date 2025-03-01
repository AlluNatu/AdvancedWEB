describe('Makes account, then logs in and makes a column and checks that its there then makes two notes checks they are there then moves them and checks that they have moved then moves again and then checks that they are back to their original places', () => {
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
      cy.get('li').contains('testColumn').click();
      cy.get('button[type="submit"]').click();

      cy.contains('testNote').should('exist');
      cy.contains('testContent').should('exist');
      cy.contains('testColumn').should('exist');

      cy.wait(1000)

      cy.get('button[id="addNote"]').contains('Add Note').click()

      cy.get('input[id="title"]').type("testNote2")
      cy.get('input[id="content"]').type("testContent2")

      cy.get('#demo-simple-select').click();
      cy.get('li').contains('testColumn').click(); // Click on the specific option
      cy.get('button[type="submit"]').click();

      cy.contains('testNote2').should('exist');
      cy.contains('testContent2').should('exist');
      
      cy.get('[id="cardDiv"]').first().within(() => {
        cy.get('button[id="noteDown"]').click();
      });

      cy.wait(500)
  

      cy.get('[id="cardDiv"]').eq(0).should('contain', 'testNote2');
      cy.get('[id="cardDiv"]').eq(1).should('contain', 'testNote');

      cy.wait(500)

      cy.get('[id="cardDiv"]').eq(1).within(() => {
        cy.get('button[id="noteUp"]').click();
      });

      cy.get('[id="cardDiv"]').eq(0).should('contain', 'testNote');
      cy.get('[id="cardDiv"]').eq(1).should('contain', 'testNote2');
    });
  });
  