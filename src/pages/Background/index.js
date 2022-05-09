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
    authToken: null,
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

// Listener: Check Closed Windows and Update Storage
chrome.tabs.onRemoved.addListener((id) => {
  getStoredTabIdLogin().then((tabIdLogin) => {
    if (tabIdLogin === id) setStoredTabIdLogin(null);
  });
});

// Listener: Check Login popup page
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  const changeInfoUrl = new URL(changeInfo.url);
  if (
    changeInfo.url &&
    changeInfoUrl.pathname.includes('/ext-auth-callback/')
  ) {
    const authToken = changeInfoUrl.pathname.replace('/ext-auth-callback/', '');
    const isLoggedIn = !!authToken;

    setStoredOptions({
      authToken,
      isLoggedIn,
    }).then(
      getStoredTabIdLogin().then((tabIdLogin) => {
        if (tabIdLogin === id) {
          chrome.tabs.remove(id);
        }
      })
    );
  }
});
