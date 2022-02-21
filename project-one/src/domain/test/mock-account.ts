import { AuthenticationParams } from '@/domain/usecases/index.usecases.domain';
import { AccountModel } from '../models/index.models.domain';
import faker from 'faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
