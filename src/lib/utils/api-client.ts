import { getStoredOptions, setStoredOptions } from '../work-with-api/storage';

const BASE_URL = 'https://core.pajoohyar.ir/api';

type Props = Omit<RequestInit, 'body'> & { body?: Object };

async function apiClient(
  endpoint: string,
  { body, ...customConfig }: Props = {}
) {
  const res = await getStoredOptions();

  const headers: HeadersInit = { 'content-type': 'application/json' };

  if (res?.authToken) {
    headers.Authorization = `Bearer ${res.authToken}`;
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);

  if (response.status === 401) {
    logout();
    return;
  }

  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
}

function logout() {
  setStoredOptions({
    authToken: null,
    isLoggedIn: false,
  });
}

export default apiClient;
