import React, { useContext } from 'react';
import Styles from './status-login-styles.scss';
import { Spinner } from '@/presentation/components/index.components';
import Context from '@/presentation/contexts/form/form-context';

const StatusLogin: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};
export default StatusLogin;
