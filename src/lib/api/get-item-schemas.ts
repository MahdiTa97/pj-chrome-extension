import { apiClient } from '../utils';

const getItemSchemasApi = async (authToken: string): Promise<IItemSchemas> => {
  try {
    const res = await apiClient('item-schemas', {
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

export default getItemSchemasApi;
