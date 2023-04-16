describe('NFTs Page', () => {
  it('loads NFTs hot collections', () => {
    cy.visit('/nfts')
    cy.getBySel('nfts-hot-collections').should('be.visible')
    cy.getBySel('hot-collection-card').should('have.length.at.least', 1)
  })

  it('loads newest NFTs', () => {
    cy.visit('/nfts')
    cy.getBySel('nfts-newest').should('be.visible')
    cy.getBySel('newest-nft-card').should('have.length.at.least', 10)
  })

  it.skip('shows subgraph health indicator', () => {
    cy.visit('/nfts')
    cy.get('#open-settings-dialog-button').click()
    cy.get('#toggle-subgraph-health-button').click({ force: true })
    cy.get(`[aria-label="Close the dialog"]`).click({ force: true })
    cy.getBySel('subgraph-health-indicator').should('be.visible')
  })

  // collections
  it('loads NFTs collections', () => {
    cy.visit('/nfts/collections')
    cy.getBySel('nft-collections-title').should('be.visible')
    cy.getBySel('hot-collection-card').should('have.length.at.least', 9)
  })
  // collections details
  it('loads NFTs collections details page', () => {
    cy.visit('/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA') // Pancake Squad
    cy.getBySel('collection-detail-page-title').should('be.visible')
    cy.getBySel('collection-detail-page-card').should('have.length.at.least', 9)
  })

  // activity
  it('loads NFTs Activity', () => {
    cy.visit('/nfts/activity')
    cy.getBySel('nft-activity-title').should('be.visible')
    cy.getBySel('nft-activity-row').should('have.length.at.least', 7)
  })
})
