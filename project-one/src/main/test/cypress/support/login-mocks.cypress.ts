import faker from 'faker';
import * as Helper from './http-mocks.cypress';

export const mockInvalidCredencialsError = (): void =>
  Helper.mockInvalidCredencialsError(/login/);

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/login/, 'POST');

export const mockOk = (): void =>
  Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid() });

export const mockInvalidData = (): void =>
  Helper.mockOk(/login/, 'POST', { invalid: faker.datatype.uuid() });
