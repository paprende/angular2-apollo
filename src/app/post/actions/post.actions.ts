import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

import { Post } from '../models/post.model';

export const allPosts = 'allPosts';
export const postUpvoted = 'postUpvoted';

export const allPostsAction = (posts: Array<Post>) => ({
  type: allPosts,
  payload: posts
});

export const postUpvotedAction = (post: Post) => ({
  type: postUpvoted,
  payload: post
});

@Injectable()
export class PostActions {

  constructor(private _redux: NgRedux<any>, private _apollo: Angular2Apollo) { }

  queryAllPosts() {
    this._apollo.query({
      query: gql`
        query allPosts {
          posts {
            id
            title
            votes
            author {
              id
              firstName
              lastName
            }
          }
        }
      `,
    })
    .first()
    .subscribe(response => {
      this._redux.dispatch(allPostsAction(response.data.posts));
    });
  }

  upvotePost(postId: number) {
    this._apollo.mutate({
      mutation: gql`
        mutation upvotePost($postId: Int!) {
          upvotePost(postId: $postId) {
            id
            votes
          }
        }
      `,
      variables: {
        postId
      },
    }).toPromise();
  }

  subscibeToPostUpvoted() {
    return this._apollo.subscribe({
      query: gql`
        subscription postUpvoted {
          postUpvoted {
            id,
            votes
          }
        }
      `,
    })
    .map((response) => response.postUpvoted)
    .subscribe((post) => {
      this._redux.dispatch(postUpvotedAction(post));
    });
  }

};
