import { AccountModel } from '@/domain/models/index.models.domain';

export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>;
}
