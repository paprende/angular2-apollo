import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostUpvoterComponent } from './post/post-upvoter.component';
import { client } from './client';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostUpvoterComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.withClient(client)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
