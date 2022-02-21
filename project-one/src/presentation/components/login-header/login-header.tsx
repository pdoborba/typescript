import React from 'react';
import Styles from './login-header-styles.scss';
import { Logo } from '@/presentation/components/index.components';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Olá!</h1>
      <h2>Sou sua nova ferramenta de venda a partir de agora.</h2>
    </header>
  );
};
export default LoginHeader;
