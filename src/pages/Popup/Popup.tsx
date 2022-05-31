import React, { useEffect, useState } from 'react';
import { Login, LogoutAlert, Panel } from '../../components/popupComponents';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../../lib/work-with-api/storage';
import './Popup.css';

const Popup = () => {
  const [alert, setAlert] = useState(false);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  function logoutHandler() {
    setOptions({
      isLoggedIn: false,
      authToken: null,
    });
    setStoredOptions({
      isLoggedIn: false,
      authToken: null,
    });
    setAlert(true);
  }

  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
    });
  }, []);

  // useEffect(() => {
  //   chrome.runtime.sendMessage({ type: 'RUN_TRANSLATOR' }, (res) => {
  //     console.log('=====> res in popup <=====', res);
  //   });

  //   return () => {};
  // }, []);

  return (
    <div dir={options?.lang === 'fa' ? 'rtl' : 'ltr'}>
      {options?.isLoggedIn ? (
        <>
          <Panel profile={options.profile} logoutHandler={logoutHandler} />
        </>
      ) : alert ? (
        <LogoutAlert message="logout_message" setAlert={setAlert} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Popup;
