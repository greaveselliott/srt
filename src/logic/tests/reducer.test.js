import reducer, { initialState } from '../reducer';
import { addItem, removeItem, filterUncompleteItem, toggleCompleteItem } from '../actions';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', complete: false, display: true },
        { id: 2, content: 'second', complete: false, display: true }
      ]
    };
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
    expect(result.items[2].complete).toEqual(false);
    expect(result.items[2].display).toEqual(true);
  });

  it('should remove an item on REMOVE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', complete: false, display: true },
        { id: 2, content: 'second', complete: false, display: true }
      ]
    }

    const mockAction = removeItem(state.items[1])
    const result = reducer(state, mockAction);

    expect(result.items.length).toEqual(1);
    expect(result.items[0].id).toEqual(1);
  });

  it('should set an *uncomplete* item as *complete* on TOGGLE_COMPLETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', complete: false, display: true },
        { id: 2, content: 'second', complete: false, display: true }
      ]
    };

    const targetItem = 1;
    const mockAction = toggleCompleteItem(state.items[targetItem]);
    const result = reducer(state, mockAction);

    expect(result.items[targetItem].complete).toEqual(true);
  });

  it('should set an *complete* item as *uncomplete* on TOGGLE_COMPLETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', complete: false, display: true },
        { id: 2, content: 'second', complete: true, display: true }
      ]
    };

    const targetItem = 1;
    const mockAction = toggleCompleteItem(state.items[targetItem]);
    const result = reducer(state, mockAction);

    expect(result.items[targetItem].complete).toEqual(false);
  });

  it('should toggle a filtering of uncomplete items on FILTER_UNCOMPLETE_ITEMS', () => {
    const state = {
      items: [
        { id: 1, content: 'first', complete: false, display: true },
        { id: 2, content: 'second', complete: true, display: true },
        { id: 3, content: 'third', complete: false, display: true },
        { id: 4, content: 'fourth', complete: true, display: true }
      ]
    };

    const mockAction = filterUncompleteItem();
    let result = reducer(state, mockAction);

    expect(result.items[0].display).toEqual(true);
    expect(result.items[1].display).toEqual(false);
    expect(result.items[2].display).toEqual(true);
    expect(result.items[3].display).toEqual(false);
  });

  it('Should filter newly completed items if filtering is currently toggled', () => {
    const state = {
      filtering: true,
      items: [
        { id: 1, content: 'first', complete: false, display: true }
      ]
    };

    const targetItem = 0;
    const mockAction = toggleCompleteItem(state.items[targetItem]);
    const result = reducer(state, mockAction);

    expect(result.items[targetItem].display).toEqual(false);
  });
});
