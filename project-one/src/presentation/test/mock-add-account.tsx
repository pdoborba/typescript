import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/index.usecases.domain';
import { AccountModel } from '@/domain/models/index.models.domain';
import { mockAccountModel } from '@/domain/test/index.mocks.domain';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccountParams;
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
