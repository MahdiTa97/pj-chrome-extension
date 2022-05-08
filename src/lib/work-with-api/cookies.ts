export type TokenType = string | undefined;

export function getTokenFromCookies(): Promise<TokenType> {
  return new Promise((resolve) => {
    chrome.cookies.get(
      {
        url: 'https://pajoohyar.ir',
        name: 'pajoohyar_extention_access_token',
      },
      (token) => {
        resolve(token?.value);
      }
    );
  });
}

export function removeTokenFromCookies(): Promise<void> {
  return new Promise((resolve) => {
    chrome.cookies.remove(
      {
        url: 'https://pajoohyar.ir',
        name: 'pajoohyar_extention_access_token',
      },
      () => {
        resolve();
      }
    );
  });
}
