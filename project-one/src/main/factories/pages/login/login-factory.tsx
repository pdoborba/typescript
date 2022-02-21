import React from 'react';
import { Login } from '@/presentation/pages/index.pages';
import { makeLoginValidation } from './login-validation-factory';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/save-access-token-factory';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
