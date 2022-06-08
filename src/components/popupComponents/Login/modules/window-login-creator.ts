import { setStoredTabIdLogin } from '../../../../lib/work-with-api/storage';

const width = 500;
const height = 500;

const windowOptions: chrome.windows.CreateData = {
  url: 'https://core.pajoohyar.ir/inoor/login?context=4',
  width,
  height,
  left: Math.round((window.screen.availWidth - width) / 2),
  top: Math.round((window.screen.availHeight - height) / 2),
  type: 'popup',
};

const windowLoginCreator = (): Promise<number> =>
  new Promise((resolve, reject) => {
    chrome.windows
      .create(windowOptions)
      .then((event) => {
        if (event.tabs?.[0].id) {
          setStoredTabIdLogin(event.tabs?.[0].id);
          resolve(event.tabs?.[0].id);
        }
      })
      .catch((err) => reject(err));
  });

export default windowLoginCreator;
