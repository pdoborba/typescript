import faker from 'faker';
import * as FormHelper from '../support/form-helper.cypress';
import * as Http from '../support/login-mocks.cypress';

const PopulateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6));
};

const simutaleValidSubmit = (): void => {
  PopulateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo Obrigatório');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo Obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo Inválido');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Campo Inválido');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(7));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredencialsError on 401', () => {
    Http.mockInvalidCredencialsError();
    simutaleValidSubmit();
    FormHelper.testMainError('Credenciais Inválidas');
    FormHelper.testUrl('/login');
  });

  it('Should present unexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simutaleValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu, tente novamente!');
    FormHelper.testUrl('/login');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    simutaleValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu, tente novamente!');
    FormHelper.testUrl('/login');
  });

  it('Should present save accessToken if valid credencials are provided', () => {
    Http.mockOk();
    simutaleValidSubmit();
    cy.getByTestId('error-wrap').should('not.have.descendants');
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('accessToken');
  });

  it('Should prevent multiple submits', () => {
    Http.mockOk();
    PopulateFields();
    cy.getByTestId('submit').dblclick();
    FormHelper.testHtppCallsCount(1);
  });

  it('Should not call submit if form is invalid ', () => {
    Http.mockOk();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    FormHelper.testHtppCallsCount(0);
  });
});
