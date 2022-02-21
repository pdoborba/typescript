import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/index.usecases.domain';
import { AccountModel } from '@/domain/models/index.models.domain';
import { mockAccountModel } from '@/domain/test/index.mocks.domain';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
