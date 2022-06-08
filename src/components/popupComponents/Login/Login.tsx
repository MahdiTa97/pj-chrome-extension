import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { getStoredTabIdLogin } from '../../../lib/work-with-api/storage';
import { Text } from '../../ui';
import { windowLoginCreator } from './modules';

const Login = () => {
  const [value, setValue] = useState<number | null>();

  useEffect(() => {
    getStoredTabIdLogin().then((res) => setValue(res));
  }, []);

  function handleClick() {
    windowLoginCreator().then((res) => setValue(res));
  }

  const isLoading = value !== null;

  const btnCn = cn(
    'btn btn-primary',
    { 'loading btn-ghost': isLoading },
    { 'btn-wide': !isLoading }
  );

  return (
    <div className="card bg-slate-800 text-primary-content rounded-none">
      <div className="card-body">
        <Text variant="h2" className="card-title">
          app_name
        </Text>
        <Text variant="p">login_message</Text>
        <div className="card-actions justify-end ">
          <div className="card-body">
            <div className="flex items-center justify-center">
              <button className={btnCn} onClick={handleClick}>
                <Text variant="p">{isLoading ? 'loading' : 'login'}</Text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
