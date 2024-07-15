// https://on.cypress.io/api

describe('Tree viewer', () => {
  it('disaplys details of selected node', () => {
    cy.visit('/')
    cy.contains('g.node', 'A').click()

    cy.contains('g.node[data-selected="true"]', 'A').should('exist')
    cy.contains('g.node', 'A').find('rect').should('have.css', 'fill', 'rgb(60, 96, 133)')
  
    cy.contains('.node-card h1', 'A').should('exist')
    cy.contains('.node-card p', 'This is a description of A').should('exist')
  })

  it('deselects by clicking close button in detail card', () => {
    cy.visit('/')
    cy.contains('g.node', 'A').click()

    cy.get('.node-card').find('button[title="Close"]').click()

    cy.contains('g.node[data-selected="true"]', 'A').should('not.exist')
    cy.contains('g.node', 'A').find('rect').should('have.css', 'fill', 'rgb(255, 255, 255)')
  
    cy.get('.node-card').should('not.exist')
  })

  it('deselects by clicking the node again', () => {
    cy.visit('/')
    cy.contains('g.node', 'A').click()
    cy.contains('g.node', 'A').click()
    
    cy.contains('g.node[data-selected="true"]', 'A').should('not.exist')
    cy.contains('g.node', 'A').find('rect').should('have.css', 'fill', 'rgb(255, 255, 255)')
  
    cy.get('.node-card').should('not.exist')
  })

  it('selected node stays selected after toggling tree direction', () => {
    cy.visit('/')
    cy.contains('g.node', 'A').click()
  
    cy.contains('button', 'Toggle tree direction').click()
    
    cy.contains('g.node[data-selected="true"]', 'A').should('exist')
    cy.contains('g.node', 'A').find('rect').should('have.css', 'fill', 'rgb(60, 96, 133)')
  
    cy.get('.node-card').should('exist')
  })
})
