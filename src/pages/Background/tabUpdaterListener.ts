import { getStoredOptions } from '../../lib/work-with-api/storage';

export function tabUpdaterListener() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // status is more reliable (in my case)
    getStoredOptions().then((res) => {
      if (res?.isLoggedIn && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(
          tabId,
          {
            message: 'TabUpdated',
          },
          (res) => {
            console.log('=====> res <=====', res);
          }
        );
      }
    });
  });
}
