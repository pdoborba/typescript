import faker from 'faker';
import * as FormHelper from '../support/form-helper.cypress';
import * as Http from '../support/signup-mocks.cypress';

const PopulateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.firstName(5));
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simutaleValidSubmit = (): void => {
  PopulateFields();
  cy.getByTestId('submit').click();
};

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo Obrigatório');

    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo Obrigatório');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo Obrigatório');

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Obrigatório');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('name', 'Campo Inválido');

    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Campo Inválido');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('password', 'Campo Inválido');

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Inválido');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.firstName(5));
    FormHelper.testInputStatus('name');

    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.random.alphaNumeric(7);
    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');

    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present mockEmailInUseError on 403', () => {
    Http.mockEmailInUseError();
    simutaleValidSubmit();
    FormHelper.testMainError('Esse e-mail já está em uso!');
    FormHelper.testUrl('/signup');
  });

  it('Should present unexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simutaleValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu, tente novamente!');
    FormHelper.testUrl('/signup');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    simutaleValidSubmit();
    FormHelper.testMainError('Algo de errado aconteceu, tente novamente!');
    FormHelper.testUrl('/signup');
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
