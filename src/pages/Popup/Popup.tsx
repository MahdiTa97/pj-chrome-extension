import React, { useEffect, useState } from 'react';
import {
  Login,
  LogoutAlert,
  NotSupport,
  Panel,
  TranslatorView,
} from '../../components/popupComponents';
import {
  getStoredOptions,
  LocalStorageOptions,
} from '../../lib/work-with-api/storage';
import { logout, runTranslator } from './modules';
import './Popup.css';

const Popup = () => {
  const [alert, setAlert] = useState(false);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [translatorData, setTranslatorData] = useState<
    TScrapeResponse | undefined
  >();

  function logoutHandler() {
    logout()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err));
    setAlert(true);
  }

  useEffect(() => {
    function storageListenerCallback(
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: 'sync' | 'local' | 'managed'
    ) {
      if (
        areaName === 'local' &&
        changes?.options?.oldValue.isLoggedIn === false &&
        changes?.options?.newValue.isLoggedIn
      ) {
        setOptions(changes?.options?.newValue);
        runTranslator()
          .then((res) => setTranslatorData(res))
          .catch((err) => console.log(err));
      }
    }

    chrome.storage.onChanged.addListener(storageListenerCallback);

    getStoredOptions()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err));

    runTranslator()
      .then((res) => setTranslatorData(res))
      .catch((err) => console.log(err));

    return () => {
      chrome.storage.onChanged.removeListener(storageListenerCallback);
    };
  }, []);

  return (
    <div dir={options?.lang === 'fa' ? 'rtl' : 'ltr'}>
      {options?.isLoggedIn ? (
        <>
          <Panel
            profile={options.profile}
            logoutHandler={logoutHandler}
            className="sticky top-0 z-20"
          />
          {translatorData ? (
            <TranslatorView
              translatorData={translatorData}
              collections={options.collections}
              itemSchemas={options.itemSchemas}
              defaultCollection={options?.defaultCollection}
            />
          ) : (
            <NotSupport />
          )}
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
