import { MessageStatus, MessageType } from '../../../lib/constants';
import { getStoredOptions } from '../../../lib/work-with-api/storage';
import translators from '../../../translators';

const scrapesHandler = (url: string, document: Document) =>
  translators
    .find((item) => item.target.test(url))
    ?.scrape(document, new URL(document.location.href));

const extensionEnabler = () =>
  chrome.runtime.sendMessage({ type: MessageType.MAKE_ENABLE }, (res) =>
    console.log('=====> res <=====', res)
  );

export function messagesHandler() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
      case MessageType.TAB_UPDATED:
        // Check if the user logged-in can enable extension
        getStoredOptions().then((res) => {
          if (res?.isLoggedIn) {
            extensionEnabler();
            sendResponse({ status: MessageStatus.SUCCESS });
          }
        });

        break;
      case MessageType.POPUP_OPENED:
        // Check if the user logged-in can enable extension
        getStoredOptions().then((res) => {
          if (res?.isLoggedIn) {
            const translatorResponse = scrapesHandler(
              window.location.href,
              document
            );
            sendResponse(translatorResponse);
          }
        });

        break;

      default:
        sendResponse({ status: MessageStatus.SUCCESS });
    }
    return true;
  });
}
