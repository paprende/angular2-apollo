import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { postReducer } from '../../post/index';

export const initialState = fromJS({
  posts: []
});

export const rootReducer = combineReducers({
  posts: postReducer
});
