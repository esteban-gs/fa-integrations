// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBatch(): typeof getBatch;
  }
}

function getBatch(): void {
  const apiUrl = Cypress.env("apiUrl");
  cy.request({
    method: "GET",
    url: apiUrl,
    headers: {
        "Content-Type": "application/json",
        "x-apikey": "1234"
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.not.be.null.and.not.be.undefined;
    const data = response.body[0].payload as Object[];
    Cypress.env("auto-entry-batches", data);
    cy.intercept(`${apiUrl}/**`);
  });
}

// NOTE: You can use it like so:
Cypress.Commands.add("getBatch", getBatch);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
