import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducers";
import App from "./containers/App";

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default (ProviderApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
