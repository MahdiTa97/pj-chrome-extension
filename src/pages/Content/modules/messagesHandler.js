import { detectWeb } from '../../../translators/noor_digital_library';

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
          console.log('=====> status <=====', res);
        });

        const res = detectWeb(document, document.location.href);

        console.log('=====> res====! <=====', res);
        if (document.location.href !== prevUrl) {
          prevUrl = document.location.href;
        }
        console.log('=====> prevUrl <=====', prevUrl);
        break;

      default:
        break;
    }
  });
}
