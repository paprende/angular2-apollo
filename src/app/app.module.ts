import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule, isDevMode } from '@angular/core';
import { ApolloModule } from 'angular2-apollo';

import { client } from './client';

import { BootstrapComponent, DECLARATIONS, PROVIDERS } from './index';

import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { rootReducer, initialState } from './shared/store/app.store';

const createLogger = require('redux-logger');

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    ApolloModule.withClient(client)
  ],
  providers: [
    NgRedux,
    DevToolsExtension,
    ...PROVIDERS
  ],
  bootstrap: [
    BootstrapComponent
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      initialState,
      [ createLogger() ],
      [ isDevMode() && devTools.isEnabled() ? devTools.enhancer() : f => f ]
    );
  }


}
