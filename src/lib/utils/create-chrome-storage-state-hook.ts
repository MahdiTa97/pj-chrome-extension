import { useCallback, useEffect } from 'react';
import { useChromeStorage } from '../hooks';

const createChromeStorageStateHook = (
  key: string,
  initialValue: any,
  storageArea: storageAreaType
) => {
  const consumers: any = [];

  return function useCreateChromeStorageHook() {
    const [value, setValue, isPersistent, error] = useChromeStorage(
      key,
      initialValue,
      storageArea
    );

    const setValueAll = useCallback((newValue: any) => {
      for (const consumer of consumers) {
        consumer(newValue);
      }
    }, []);

    useEffect(() => {
      consumers.push(setValue);
      return () => {
        consumers.splice(consumers.indexOf(setValue), 1);
      };
    }, [setValue]);

    return [value, setValueAll, isPersistent, error];
  };
};

const createChromeStorageStateHookLocal = (key: string, initialValue: any) =>
  createChromeStorageStateHook(key, initialValue, 'local');

const createChromeStorageStateHookSync = (key: string, initialValue: any) =>
  createChromeStorageStateHook(key, initialValue, 'sync');

export { createChromeStorageStateHookLocal, createChromeStorageStateHookSync };

export default createChromeStorageStateHook;
