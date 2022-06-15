import { apiClient } from '../utils';

interface Props {
  collectionId: number;
  itemSchemaId: number;
  scrapeData: IScrapeData;
}

const createDocumentApi = async (props: Props): Promise<any> => {
  try {
    const { scrapeData, collectionId, itemSchemaId } = props;
    const res = await apiClient('online-library/documents/create', {
      method: 'POST',
      body: {
        collection_id: collectionId,
        item_schema_id: itemSchemaId,
        ...scrapeData,
      },
    });
    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export default createDocumentApi;
