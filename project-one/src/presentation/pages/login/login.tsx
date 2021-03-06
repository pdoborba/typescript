import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from './login-styles.scss';
import {
  Header,
  Input,
  StatusLogin,
  SubmitButton,
} from '@/presentation/components/index.components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import {
  Authentication,
  SaveAccessToken,
} from '@/domain/usecases/index.usecases.domain';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}: Props) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          autoComplete="off"
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton text="Fazer Login" />
          <Link data-testid="signup-link" to="/signup"></Link>
          <StatusLogin />
        </form>
      </Context.Provider>
    </div>
  );
};

export default Login;
