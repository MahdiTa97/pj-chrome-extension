export interface LocalStorage {
  windowIdLogin?: number | null;
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  lang: 'fa' | 'en';
  isLoggedIn: boolean;
}

export type LocalStorageKeys = keyof LocalStorage;

// ======== Window Options ========
export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const values: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions | null> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options ?? null);
    });
  });
}

// ======== Window Login ========
export function setStoredWindowIdLogin(
  windowIdLogin: number | null
): Promise<void> {
  const values: LocalStorage = {
    windowIdLogin,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoredWindowIdLogin(): Promise<number | null> {
  const keys: LocalStorageKeys[] = ['windowIdLogin'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.windowIdLogin ?? null);
    });
  });
}
