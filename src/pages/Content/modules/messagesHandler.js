import { googleRun } from '../../../translators/google_scholar';

export function messagesHandler() {
  let prevUrl = window.location.href;

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.message) {
      case 'TabUpdated':
        chrome.runtime.sendMessage({ isEnabled: true }, (res) => {
          console.log('=====> res <=====', res);
        });
        if (
          new RegExp('^https://scholar.google.com/scholar?.*$').test(prevUrl)
        ) {
          console.log('=====> GOOGLE <=====', googleRun(document, prevUrl));
        } else {
          console.log('=====> ANY THING ELSE <=====');
        }
        if (document.location.href !== prevUrl) {
          prevUrl = document.location.href;
        }

        break;

      default:
        break;
    }
  });
}
