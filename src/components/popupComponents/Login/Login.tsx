import cn from 'classnames';
import React from 'react';
import { useChromeStorageLocal } from '../../../lib/hooks';
import { Text } from '../../ui';

const Login = () => {
  const [value, setValue] = useChromeStorageLocal('tabIdLogin', null);

  function handleClick() {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const width = 500;
    const height = 500;

    chrome.windows
      .create({
        url: 'https://core.pajoohyar.ir/inoor/login?context=4',
        width: width,
        height: height,
        left: Math.round((screenWidth - width) / 2),
        top: Math.round((screenHeight - height) / 2),
        type: 'popup',
      })
      .then((event) => {
        if (event?.tabs?.[0].id) {
          setValue(event?.tabs?.[0].id);
        }
      });
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
