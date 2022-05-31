import { apiClient } from '../../lib/utils';
import {
  getStoredTabIdLogin,
  setStoredOptions,
} from '../../lib/work-with-api/storage';

export const jwtRegex = /([\w-]{10,}\.){2}[\w-]{10,}/g;

export function loginPopupListener() {
  chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    if (tab.url && tab.url.includes('/ext-auth-callback/')) {
      const regexExec = jwtRegex.exec(new URL(tab.url).pathname);
      const authToken = regexExec?.[0] ?? null;
      if (regexExec && authToken) {
        const isLoggedIn = !!authToken;

        (async function () {
          try {
            // Request to get user profile data
            const profile = await apiClient('api/auth/me', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });

            // Set data in the chrome storage options-field
            await setStoredOptions({
              authToken,
              isLoggedIn,
              profile: profile,
            });

            // Get opened tab id from chrome storage
            const tabIdLogin = await getStoredTabIdLogin();

            // Check and close tab
            if (tabIdLogin === id) await chrome.tabs.remove(id);
          } catch (error) {
            console.log('=====> error <=====', error);
          }
        })();
      }
    }
  });
}
