import {
  LocalStorageOptions,
  setStoredOptions,
} from '../../../lib/work-with-api/storage';

const logout = (): Promise<LocalStorageOptions> =>
  new Promise((resolve, reject) => {
    setStoredOptions({
      isLoggedIn: false,
      authToken: null,
      profile: undefined,
    })
      .then((res) => resolve(res))
      .catch(() => reject());
  });

export default logout;
