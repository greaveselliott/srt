import * as CONSTANTS from './constants';

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', complete: false, display: true },
    { id: 2, content: 'Buy cat food', complete: false, display: true },
    { id: 3, content: 'Water the plants', complete: false, display: true },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
        complete: false,
        display: true
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    
    case CONSTANTS.REMOVE_ITEM:      
      return {
        ...state,
        items: [...state.items.filter(function(item){
          return item.id !== action.content.id
        })]
      }

    
    case CONSTANTS.TOGGLE_COMPLETE_ITEM:
      return {
        ...state,
        items: [...state.items.map(function(item){
          
          if (item.id === action.content.id) {
            item.complete = item.complete ? false : true;
            item.display = !(state.filtering && item.complete); 
          }

           return item;
        })]
      }

    case CONSTANTS.FILTER_UNCOMPLETE_ITEMS:

      let isFiltering = state.filtering ? false : true;

      return {
        ...state,
        filtering: isFiltering,
        items: [...state.items.map(function(item){
          
           item.display = isFiltering && item.complete ? false : true ;

           return item;
        })]
      }
    default:
      return state;
  }
};

export default reducer;
