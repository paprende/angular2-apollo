import { map } from 'ramda';
import { fromJS, List } from 'immutable';

import { PostMap } from '../models/post.model';
import { immLens, setWithIfEq } from '../../shared/helpers/lens';
import createReducer from '../../shared/helpers/create-reducer';

// lens
const idLens = immLens('id');
const votesLens = immLens('votes');
const setVotesIfIdEq = setWithIfEq(idLens, votesLens);

// actions
const allPosts = (state, { payload }) => payload;
const postUpvoted = (state, { payload }) => map(setVotesIfIdEq(payload), state);

const initialState: List<PostMap> = fromJS([]);

export const postReducer = createReducer(initialState, {
  allPosts,
  postUpvoted
});
