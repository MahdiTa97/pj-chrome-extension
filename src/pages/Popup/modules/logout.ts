import {
  LocalStorageOptions,
  setStoredOptions,
} from '../../../lib/work-with-api/storage';

const logout = () =>
  new Promise((resolve: (value: LocalStorageOptions) => void, reject) => {
    setStoredOptions({
      isLoggedIn: false,
      authToken: null,
      profile: undefined,
    })
      .then((res) => resolve(res))
      .catch(() => reject());
  });

export default logout;
