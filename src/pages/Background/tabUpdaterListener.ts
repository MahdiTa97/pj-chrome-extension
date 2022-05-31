export function tabUpdaterListener() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // status is more reliable (in my case)
    if (changeInfo.status === 'complete')
      chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated',
      });
  });
}
