import { PostListComponent } from './post-list.component';
import { PostUpvoterComponent } from './post-upvoter.component';
import { PostActions } from './actions/post.actions';
import { postReducer as reducer } from './reducers/post.reducer';

export const postReducer = reducer;

export const POST_DECLARATIONS = [
  PostListComponent,
  PostUpvoterComponent
];

export const POST_PROVIDERS = [
  PostActions
];
