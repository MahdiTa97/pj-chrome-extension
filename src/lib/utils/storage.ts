const storage = {
  get: (key: string, defaultValue: string, storageArea: storageAreaType) => {
    const keyObj = defaultValue === undefined ? key : { [key]: defaultValue };
    return new Promise((resolve, reject) => {
      chrome.storage[storageArea].get(
        keyObj,
        (items: { [x: string]: unknown }) => {
          const error = chrome.runtime.lastError;
          if (error) return reject(error);
          resolve(items[key]);
        }
      );
    });
  },

  set: (key: string, value: any, storageArea: storageAreaType) => {
    return new Promise((resolve, reject) => {
      chrome.storage[storageArea].set({ [key]: value }, () => {
        const error = chrome.runtime.lastError;
        error ? reject(error) : resolve({});
      });
    });
  },
};

export default storage;
