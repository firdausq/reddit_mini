// cypress/e2e/app.cy.js

describe('Reddit Mini App', () => {
    it('loads the homepage', () => {
      cy.visit('http://localhost:3000'); // Passe ggf. die URL an
      cy.contains('Reddit Mini'); // Prüft, ob Titel sichtbar ist
    });
  
    it('searches for a term', () => {
      cy.get('input[placeholder="Search..."]').type('react');
      cy.get('button').click();
      // Du kannst hier weitere Erwartungen ergänzen, z. B.:
      // cy.contains('React').should('exist');
    });
  });
  