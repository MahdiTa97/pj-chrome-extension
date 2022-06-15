import { useReducer } from 'react';

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
const useTranslator = () => {
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

  return {
    selectedItems,
    addToItems,
    removeFromItems,
    selectAllItems,
    resetItems,
  };
};

export default useTranslator;
