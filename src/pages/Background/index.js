import {
  getStoredTabIdLogin,
  setStoredTabIdLogin,
  setStoredOptions,
} from '../../lib/work-with-api/storage';

console.log('This is the background page.');

chrome.runtime.onInstalled.addListener(() => {
  setStoredTabIdLogin(null);
  setStoredOptions({
    isLoggedIn: false,
    lang: 'fa',
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
  if (
    changeInfo.url &&
    new URL(changeInfo.url).pathname.includes('/ext-auth-callback/')
  ) {
    getStoredTabIdLogin().then((tabIdLogin) => {
      if (tabIdLogin === id) {
        chrome.tabs.remove(id);
      }
    });
  }
});
