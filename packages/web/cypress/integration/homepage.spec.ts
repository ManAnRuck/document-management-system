/// <reference types="cypress"/>

describe('open Website', () => {
  it('open home', () => {
    cy.visit('http://localhost:3000');
  });
  it('open work', () => {
    cy.visit('http://localhost:3000/work');
  });
  it('open documents', () => {
    cy.visit('http://localhost:3000/documents');
  });
  it('click open Home', () => {
    cy.visit('http://localhost:3000/work');
    cy.get('[data-testid=menu-link-work]').click();
    cy.wait(1000);
  });
  it('click open work', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=menu-link-work]').click();
    cy.wait(1000);
  });
  it('click open documents', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid=menu-link-documents]').click();
    cy.wait(1000);
  });
});
