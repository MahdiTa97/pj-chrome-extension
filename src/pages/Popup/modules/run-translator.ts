import { MessageType } from '../../../lib/constants';
import { lastErrorHandler } from '../../../lib/utils';

const runTranslator = (): Promise<TScrapeResponse> =>
  new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs?.[0]?.id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: MessageType.POPUP_OPENED },
            (res) => {
              if (res) {
                resolve(res);
              } else {
                lastErrorHandler();
                reject();
              }
            }
          );
        }
      }
    );
  });

export default runTranslator;
