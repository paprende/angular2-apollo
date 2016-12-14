import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PostActions } from './actions/post.actions';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-post-upvoter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="upvote()">
      Upvote
    </button>
  `
})
export class PostUpvoterComponent {
  @Input() postId: number;

  constructor(private _postActions: PostActions) {}

  upvote() {
    this._postActions.upvotePost(this.postId);
  }
}
