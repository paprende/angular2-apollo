import { AppComponent } from './app.component';

import { POST_DECLARATIONS, POST_PROVIDERS  } from './post/index';
import { SHARED_DECLARATIONS  } from './shared/index';

export const BootstrapComponent = AppComponent;

export const DECLARATIONS = [
  AppComponent,
  ...SHARED_DECLARATIONS,
  ...POST_DECLARATIONS
];

export const PROVIDERS = [
  ...POST_PROVIDERS
];
