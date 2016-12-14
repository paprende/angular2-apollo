import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from 'ng2-redux';

import { PostMap } from './models/post.model';
import { PostActions } from './actions/post.actions';

@Component({
  selector: 'app-post-list',
  template: `
    <ul>
      <li *ngFor="let post of (_posts | async | toJS)">
        {{ post.title }} by {{ post.author.firstName  }} {{post.author.lastName}} ({{post.votes}} votes)
        <app-post-upvoter [postId]="post.id"></app-post-upvoter>
      </li>
    </ul>
  `
})
export class PostListComponent implements OnInit, OnDestroy {

  @select('posts') _posts: Observable<PostMap>;
  _postUpvotedSub: Subscription;

  constructor(private _postActions: PostActions) { }

  ngOnInit() {
    this._postActions.queryAllPosts();
    this._postUpvotedSub = this._postActions.subscibeToPostUpvoted();
  }

  ngOnDestroy() {
    this._postUpvotedSub.unsubscribe();
  }
}
