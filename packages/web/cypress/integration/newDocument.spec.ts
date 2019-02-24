/// <reference types="cypress"/>

Cypress.Cookies.debug(true);

describe('documents', () => {
  it('new document', () => {
    const newDocument = {
      title: `new doc`,
    };
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=menu-link-documents]').click();

    cy.get('[data-testid=newDocument-form]').within(() => {
      cy.get('[name=title]').type(newDocument.title);
    });
    cy.get('[data-testid=newDocument-form]').submit();
    cy.get('[data-testid=docuemts-list] > .item > .content > .header')
      .first()
      .invoke('text')
      .should($title => {
        expect($title).eq(newDocument.title);
      });
  });
});
