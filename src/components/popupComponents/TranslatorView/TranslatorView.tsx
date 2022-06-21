import cn from 'classnames';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { useCallback, useState } from 'react';
import { createDocumentApi } from '../../../lib/api';
import { useTranslator } from '../../../lib/hooks';
import { numToFa } from '../../../lib/utils';
import { setStoredDefaultCollection } from '../../../lib/work-with-api/storage';
import { Text } from '../../ui';

interface Props {
  translatorData: TScrapeResponse;
  collections?: ICollections;
  itemSchemas?: IItemSchemas;
  defaultCollection?: ICollectionData;
}

interface IGetSchemaId {
  itemSchemas: IItemSchemas | undefined;
  item: IScrapeData;
}

const getSchemaId = ({ itemSchemas, item }: IGetSchemaId) =>
  itemSchemas?.data.find((schema) => schema.csl_slug === item.type)?.id;

const TranslatorView = (props: Props) => {
  const { translatorData, collections, itemSchemas, defaultCollection } = props;

  const [collectionId, setCollectionId] = useState<number | undefined>(
    defaultCollection?.id
  );

  const [loading, setLoading] = useState<boolean>(false);

  const {
    selectedItems,
    addToItems,
    removeFromItems,
    resetItems,
    selectAllItems,
  } = useTranslator();

  nprogress.configure({
    showSpinner: false,
  });

  const canSave = selectedItems.length && collectionId && !loading;

  const setCollectionIdHandler = useCallback(
    (collectionId: number | undefined) => {
      setStoredDefaultCollection(
        collections?.data.find((item) => item.id === collectionId)
      ).then(() => setCollectionId(collectionId));
    },
    [collections?.data]
  );

  const triggerItem = useCallback(
    (item: IScrapeData) => {
      const isExistInItems = selectedItems.some(
        (value) => value.id === item.id
      );
      if (isExistInItems) removeFromItems(item.id);
      else addToItems(item);
    },
    [addToItems, removeFromItems, selectedItems]
  );

  const handleSave = useCallback(() => {
    setLoading(true);
    nprogress.start();

    if (selectedItems.length && collectionId) {
      const promises = selectedItems.map(async (item) => {
        const itemSchemaId = getSchemaId({ itemSchemas, item });
        if (itemSchemaId) {
          return await createDocumentApi({
            collectionId,
            itemSchemaId,
            scrapeData: item,
          });
        }
      });
      Promise.all(promises).finally(() => {
        setLoading(false);
        nprogress.done();
      });
    }
  }, [collectionId, itemSchemas, selectedItems]);

  const saveBtnCn = cn('btn btn-block btn-primary', {
    'btn-disabled': !selectedItems.length,
    loading,
  });

  return (
    <div className="overflow-x-auto">
      <div className="fixed z-10 flex items-center justify-between w-full px-2 py-2 space-x-4 space-x-reverse cursor-default text-base-100 bg-accent">
        {collections?.data.length ? (
          <select
            className="flex-1 select select-ghost select-sm"
            onChange={(e) => setCollectionIdHandler(+e.target.value)}
            defaultValue={String(collectionId)}
          >
            {collections?.data.map((collection) => (
              <option value={collection.id} key={collection.id}>
                {collection.title}
              </option>
            ))}
          </select>
        ) : null}

        <div className="d-flex">
          <button
            className="btn btn-secondary btn-xs"
            onClick={() => selectAllItems(translatorData?.result)}
          >
            <Text variant="p">all</Text>
          </button>
          <button
            className="mx-2 btn btn-secondary btn-xs"
            onClick={resetItems}
          >
            <Text variant="p">reset</Text>
          </button>
        </div>
      </div>
      <div className="mt-12 mb-16">
        {translatorData?.result?.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-start px-2 py-2 my-1 text-gray-700 cursor-pointer hover:text-slate-600 hover:bg-slate-300"
            onClick={() => triggerItem(item)}
          >
            <input
              dir="ltr"
              type="checkbox"
              checked={selectedItems.some((value) => value.id === item.id)}
              className="mx-1 border-gray-400 checkbox flip-vertical checkbox-sm checkbox-secondary"
              readOnly
            />
            {translatorData?.result?.length &&
            translatorData.result.length > 1 ? (
              <Text
                isTranslationDisabled
                variant="tr-resp"
                className="w-6 px-1"
              >
                {numToFa(index + 1)}
              </Text>
            ) : null}

            <Text isTranslationDisabled variant="tr-resp">
              {item.title}
            </Text>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full p-2 bg-white">
        <button className={saveBtnCn} disabled={!canSave} onClick={handleSave}>
          <Text variant="p">save</Text>
        </button>
      </div>
    </div>
  );
};

export default TranslatorView;
