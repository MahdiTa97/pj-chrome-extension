import { useCallback, useState, useLayoutEffect } from 'react';
import { storage } from '../utils';

const useChromeStorage = (
  key: string,
  initialValue: any,
  storageArea: storageAreaType
) => {
  const [INITIAL_VALUE] = useState(() => {
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });
  const [STORAGE_AREA] = useState(storageArea);
  const [state, setState] = useState(INITIAL_VALUE);
  const [isPersistent, setIsPersistent] = useState(true);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    storage
      .get(key, INITIAL_VALUE, STORAGE_AREA)
      .then((res) => {
        setState(res);
        setIsPersistent(true);
        setError('');
      })
      .catch((error) => {
        setIsPersistent(false);
        setError(error);
      });
  }, [key, INITIAL_VALUE, STORAGE_AREA]);

  const updateValue = useCallback(
    (newValue: any) => {
      const toStore =
        typeof newValue === 'function' ? newValue(state) : newValue;
      storage
        .set(key, toStore, STORAGE_AREA)
        .then(() => {
          setIsPersistent(true);
          setError('');
        })
        .catch((error) => {
          // set newValue to local state because chrome.storage.onChanged won't be fired in error case
          setState(toStore);
          setIsPersistent(false);
          setError(error);
        });
    },
    [STORAGE_AREA, key, state]
  );

  useLayoutEffect(() => {
    const onChange = (changes: any, areaName: storageAreaType) => {
      if (areaName === STORAGE_AREA && key in changes) {
        setState(changes[key].newValue);
        setIsPersistent(true);
        setError('');
      }
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, [key, STORAGE_AREA]);

  return [state, updateValue, isPersistent, error];
};

const useChromeStorageLocal = (key: string, initialValue: any) =>
  useChromeStorage(key, initialValue, 'local');

const useChromeStorageSync = (key: string, initialValue: any) =>
  useChromeStorage(key, initialValue, 'sync');

export { useChromeStorageLocal, useChromeStorageSync };

export default useChromeStorage;
