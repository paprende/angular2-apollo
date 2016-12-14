import { fromJS } from 'immutable';

export default function(initialState, handlers) {
  return function(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, {
        type: action.type,
        payload: fromJS(action.payload)
      });
    } else {
      return state;
    }
  };
};
