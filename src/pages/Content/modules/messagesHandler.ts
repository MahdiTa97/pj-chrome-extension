import { getStoredOptions } from '../../../lib/work-with-api/storage';
import translators from '../../../translators';

const scrapesHandler = (url: string, document: Document) =>
  translators
    .find((item) => item.target.test(url))
    ?.scrape(document, new URL(document.location.href));

function extensionEnabler() {
  chrome.runtime.sendMessage({ isEnabled: true }, (res) => {
    console.log('=====> res <=====', res);
    return;
  });
}

export function messagesHandler() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.message) {
      case 'TabUpdated':
        // Check if the user logged-in can enable extension
        getStoredOptions().then((res) => {
          if (res?.isLoggedIn) {
            extensionEnabler();
            const translatorResponse = scrapesHandler(
              window.location.href,
              document
            );
            console.log('=====> translatorResponse <=====', translatorResponse);
          }
        });

        break;

      default:
        break;
    }
    sendResponse({ status: 'success' });
    return;
  });
}
