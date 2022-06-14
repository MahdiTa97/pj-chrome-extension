import React, { useCallback, useReducer, useState } from 'react';
import { Text } from '../../ui';
import cn from 'classnames';
import { numToFa } from '../../../lib/utils';

interface Props {
  translatorData: TScrapeResponse;
  collections?: ICollections;
}

const headersNames = [
  '',
  'tr_title',
  // 'tr_publisher',
  // 'tr_abstracts',
  // 'tr_collectionTitle',
];

// <td>{item.creators?.map((item) => item.literal + ', ')}</td>
// <td>{item.abstracts}</td>
// <td>{item.collectionTitle}</td>

const initialState = { selectedItems: [] };

type TActionTypes = 'ADD_ITEM' | 'REMOVE_ITEM' | 'RESET' | 'SELECT_ALL';
interface IAction {
  type: TActionTypes;
  payload?: {
    item?: IScrapeData;
    id?: string;
    items?: IScrapeData[];
  };
}
interface IState {
  selectedItems: Array<IScrapeData> | [];
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (action.payload?.item) {
        const selectedItems = [...state.selectedItems, action.payload.item];
        return { ...state, selectedItems };
      }
      return state;
    case 'REMOVE_ITEM':
      if (action.payload?.id) {
        const selectedItems = state.selectedItems.filter(
          (obj) => obj.id !== action.payload?.id
        );
        return { ...state, selectedItems };
      }
      return state;
    case 'SELECT_ALL':
      if (action.payload?.items) {
        return { ...state, selectedItems: action.payload?.items };
      }
      return state;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const TranslatorView = (props: Props) => {
  const { translatorData, collections } = props;
  const [{ selectedItems }, dispatch] = useReducer(reducer, initialState);

  function addToItems(item: IScrapeData) {
    return dispatch({ type: 'ADD_ITEM', payload: { item } });
  }
  function removeFromItems(id: string) {
    return dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }
  function selectAllItems(items?: TScrapeResult) {
    return dispatch({ type: 'SELECT_ALL', payload: { items } });
  }
  function resetItems() {
    return dispatch({ type: 'RESET' });
  }

  const triggerItem = useCallback(
    (item: IScrapeData) => {
      const isExistInItems = selectedItems.some(
        (value) => value.id === item.id
      );
      if (isExistInItems) removeFromItems(item.id);
      else addToItems(item);
    },
    [selectedItems]
  );

  const saveBtnCn = cn('btn btn-block btn-primary', {
    'btn-disabled': !selectedItems.length,
  });

  return (
    <div className="overflow-x-auto">
      <div className="fixed z-10 flex justify-between w-full px-2 py-2 cursor-default text-base-100 bg-accent">
        <Text variant="h4" className="mx-5">
          tr_title
        </Text>
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
            <Text isTranslationDisabled variant="tr-resp" className="w-6 px-1">
              {numToFa(index + 1)}
            </Text>
            <Text isTranslationDisabled variant="tr-resp">
              {item.title}
            </Text>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full p-2 bg-white">
        <button className={saveBtnCn} disabled={!selectedItems.length}>
          <Text variant="p">save</Text>
        </button>
        {/* <select className="select select-bordered w-full max-w-xs select-sm">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select> */}
      </div>
    </div>
  );
};

export default TranslatorView;
