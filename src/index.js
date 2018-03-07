import React from "react";
import { Provider } from "react-redux";
import { init } from '@rematch/core'
import * as models from './models'

import App from "./containers/App";

const store = init({
  models,
})

export default (ProviderApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
