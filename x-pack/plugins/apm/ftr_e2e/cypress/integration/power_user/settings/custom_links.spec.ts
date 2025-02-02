/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

const basePath = '/app/apm/settings/custom-links';

describe('Custom links', () => {
  beforeEach(() => {
    cy.loginAsEditorUser();
  });

  it('shows empty message and create button', () => {
    cy.visitKibana(basePath);
    cy.contains('No links found');
    cy.contains('Create custom link');
  });

  it('creates custom link', () => {
    cy.visitKibana(basePath);
    const emptyPrompt = cy.get('[data-test-subj="customLinksEmptyPrompt"]');
    cy.contains('Create custom link').click();
    cy.contains('Create link');
    cy.contains('Save').should('be.disabled');
    cy.get('input[name="label"]').type('foo');
    cy.get('input[name="url"]').type('https://foo.com');
    cy.contains('Save').should('not.be.disabled');
    cy.contains('Save').click();
    emptyPrompt.should('not.exist');
    cy.contains('foo');
    cy.contains('https://foo.com');
    cy.get('[data-test-subj="editCustomLink"]').click();
    cy.contains('Delete').click();
  });

  it('clears filter values when field is selected', () => {
    cy.visitKibana(basePath);

    // wait for empty prompt
    cy.get('[data-test-subj="customLinksEmptyPrompt"]').should('be.visible');

    cy.contains('Create custom link').click();
    cy.get('[data-test-subj="filter-0"]').select('service.name');
    cy.get(
      '[data-test-subj="service.name.value"] [data-test-subj="comboBoxSearchInput"]'
    ).type('foo');
    cy.get('[data-test-subj="filter-0"]').select('service.environment');
    cy.get(
      '[data-test-subj="service.environment.value"] [data-test-subj="comboBoxInput"]'
    ).should('not.contain', 'foo');
  });
});
