import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'app-post-list',
  template: `
    <ul>
      <li *ngFor="let post of _posts">
        {{post.title}} by {{post.author.firstName}} {{post.author.lastName}}
        ({{post.votes}} votes)

        <app-post-upvoter [postId]="post.id"></app-post-upvoter>
      </li>
    </ul>
  `
})
export class PostListComponent implements OnInit, OnDestroy {

  _postUpvotedSub: Subscription;
  _postsSub: Subscription;
  _posts: Array<any>;

  constructor(private _apollo: Angular2Apollo, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.detach();

    this._postsSub = this._apollo.watchQuery({
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
    }).subscribe((response) => {
      this._posts = response.data.posts;
      this.cdr.detectChanges();
    });

    this._postUpvotedSub = this._apollo.subscribe({
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
    .subscribe((postUpvoted) => {
      this._posts = this._posts.map(post => {
        if (post.id === postUpvoted.id) {
          return Object.assign(post, postUpvoted);
        }
        return post;
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this._postsSub.unsubscribe();
    this._postUpvotedSub.unsubscribe();
  }
}
