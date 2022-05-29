import translators from '../../../translators';

const scrapesHandler = (url, document) =>
  translators.find((item) => item.target.test(url)).scrape(document);

function extensionEnabler() {
  chrome.runtime.sendMessage({ isEnabled: true }, (res) => {
    console.log('=====> res <=====', res);
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
        extensionEnabler();
        console.log(
          '=====> scrapesHandler <=====',
          scrapesHandler(window.location.href, document)
        );

        break;

      default:
        break;
    }
  });
}
