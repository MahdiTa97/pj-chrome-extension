import {
  getStoredTabIdLogin,
  setStoredTabIdLogin,
  setStoredOptions,
} from '../../lib/work-with-api/storage';

import { getTokenFromCookies } from '../../lib/work-with-api/cookies';

console.log('This is the background page.');

chrome.runtime.onInstalled.addListener(() => {
  let isLoggedIn = false;
  setStoredTabIdLogin(null);

  getTokenFromCookies().then((token) => {
    isLoggedIn = !!token;
    setStoredOptions({
      isLoggedIn,
      lang: 'fa',
    });
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

// Check Closed Windows and Update Storage
chrome.tabs.onRemoved.addListener((id) => {
  getStoredTabIdLogin().then((tabIdLogin) => {
    if (tabIdLogin === id) setStoredTabIdLogin(null);
  });
});

// Check Login popup page
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  const changeInfoUrl = new URL(changeInfo.url);
  if (
    changeInfo.url &&
    changeInfoUrl.pathname.includes('/ext-auth-callback/')
  ) {
    getStoredTabIdLogin().then((tabIdLogin) => {
      if (tabIdLogin === id) {
        chrome.tabs.remove(id);
      }
    });
  }
});

// Check Token
chrome.cookies.onChanged.addListener((e) => {
  if (e.cookie.domain === 'core.pajoohyar.ir') {
    console.log('=====> e <=====', e);
  }
});
