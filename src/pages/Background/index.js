import {
  getStoredWindowIdLogin,
  setStoredWindowIdLogin,
  setStoredOptions,
} from '../../lib/work-with-api/storage';

console.log('This is the background page.');

chrome.runtime.onInstalled.addListener(() => {
  setStoredWindowIdLogin(null);
  setStoredOptions({
    isLoggedIn: false,
    lang: 'fa',
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

// Check Closed Windows and Update Storage
chrome.windows.onRemoved.addListener((id) => {
  getStoredWindowIdLogin().then((windowIdLogin) => {
    if (windowIdLogin === id) setStoredWindowIdLogin(null);
  });
});

// function scanTabs() {
//   chrome.windows.getAll({ populate: true }, (windows) => {
//   });
// }

// chrome.tabs.onUpdated.addListener(()=>{
//   chrome.windows.getAll({ populate: true }, (windows) => {
//     // if(windows.find(item=>item.id===))
//   });
// });
