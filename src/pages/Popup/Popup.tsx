import React, { useEffect, useState } from 'react';
import { Login, LogoutAlert, Panel } from '../../components/popupComponents';
import {
  getStoredOptions,
  LocalStorageOptions,
} from '../../lib/work-with-api/storage';
import { logout, runTranslator } from './modules';
import './Popup.css';

const Popup = () => {
  const [alert, setAlert] = useState(false);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [data, setData] = useState<TScrapeResponse | undefined>();

  function logoutHandler() {
    logout()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err));
    setAlert(true);
  }

  useEffect(() => {
    getStoredOptions()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err));

    runTranslator()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

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
