import { apiClient } from '../utils';

const getPrivateCollectionsApi = async (authToken: string): Promise<any> => {
  try {
    const res = await apiClient('online-library/collections/search', {
      method: 'POST',
      body: { parent_id: 0, mine: true },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export default getPrivateCollectionsApi;
