import React, { useState } from 'react';
import { Login, LogoutAlert, Panel } from '../../components/popupComponents';
import { useChromeStorageLocal } from '../../lib/hooks';
import { setStoredOptions } from '../../lib/work-with-api/storage';
import './Popup.css';

const Popup = () => {
  const [options] = useChromeStorageLocal('options', null);
  const [alert, setAlert] = useState(false);

  function logoutHandler() {
    setStoredOptions({
      isLoggedIn: false,
      authToken: null,
    });
    setAlert(true);
  }

  return (
    <div dir={options?.lang === 'fa' ? 'rtl' : 'ltr'}>
      {alert ? (
        <LogoutAlert message="logout_message" setAlert={setAlert} />
      ) : null}
      {options?.isLoggedIn ? (
        <Panel logoutHandler={logoutHandler} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Popup;
