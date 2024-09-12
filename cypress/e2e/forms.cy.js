describe('form test', () => {
    beforeEach(() => {
        cy.visit('/forms')  
    })  
    it('Test subscribe form', () => {
        cy.contains(/testing forms/i)
        cy.getDataTestId('email-input').find('input').as('subscribeInput')
        cy.get('@subscribeInput').type('a@a.com')
        cy.contains(/Successfully subbed: a@a.com!/i).should('not.exist')
        cy.getDataTestId('subscribe-button').click(
            // () => cy.get('.MuiAlert-message').should('contain.text', 'Successfully subbed: a@a.com!')
        )
        cy.contains(/Successfully subbed: a@a.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: a@a.com!/i).should('not.exist')

        cy.get('@subscribeInput').type('a@a.io')
        cy.contains(/Invalid email: a@a.io/i).should('not.exist')
        cy.getDataTestId('subscribe-button').click()
        cy.contains(/Invalid email: a@a.io/i).should('exist')
        cy.wait(3000)
        cy.contains(/fail!/i).should('not.exist')
        cy.getDataTestId('subscribe-button').click()
        cy.contains(/fail!/i).should('exist')
    })
})