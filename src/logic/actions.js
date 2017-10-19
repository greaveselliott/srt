import * as CONSTANTS from './constants';

export const addItem = content => {
  return { type: CONSTANTS.ADD_ITEM, content };
};

export const removeItem = content => {
  return { type: CONSTANTS.REMOVE_ITEM, content };
}

export const toggleCompleteItem = content => {
  return { type: CONSTANTS.TOGGLE_COMPLETE_ITEM, content };
};

export const filterUncompleteItem = content => {
  return { type: CONSTANTS.FILTER_UNCOMPLETE_ITEMS };
};