import axios from 'axios';
import { apiClient } from '../utils';

const getProfileApi = async (authToken: string): Promise<Profile> => {
  try {
    const res = await apiClient('auth/me', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export default getProfileApi;
