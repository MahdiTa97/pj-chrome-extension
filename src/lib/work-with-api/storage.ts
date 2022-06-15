export interface LocalStorage {
  tabIdLogin?: number | null;
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  lang?: 'fa' | 'en';
  isLoggedIn: boolean;
  authToken: string | null;
  profile?: Profile;
  collections?: ICollections;
  itemSchemas?: IItemSchemas;
}

export type LocalStorageKeys = keyof LocalStorage;

// ======== Options ========
export function setStoredOptions(
  options: LocalStorageOptions
): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      let values = { options: { ...res.options, ...options } };
      chrome.storage.local.set(values, () => {
        resolve(values.options);
      });
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

// ======== tabIdLogin ========
export function setStoredTabIdLogin(tabIdLogin: number | null): Promise<void> {
  const values: LocalStorage = {
    tabIdLogin,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoredTabIdLogin(): Promise<number | null> {
  const keys: LocalStorageKeys[] = ['tabIdLogin'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.tabIdLogin ?? null);
    });
  });
}
