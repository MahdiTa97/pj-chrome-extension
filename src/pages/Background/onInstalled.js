import {
  setStoredOptions,
  setStoredTabIdLogin,
} from '../../lib/work-with-api/storage';

export function onInstalled() {
  chrome.runtime.onInstalled.addListener(() => {
    setStoredTabIdLogin(null);

    setStoredOptions({
      isLoggedIn: false,
      lang: 'fa',
      authToken: null,
    });

    chrome.alarms.create({
      periodInMinutes: 60,
    });

    chrome.tabs.create({
      url: 'https://pajoohyar.ir/extensions/',
    });
  });
}
