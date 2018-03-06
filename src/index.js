require('react-devtools-core').connectToDevTools({host: '169.254.187.227'})

import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from "./reducers";
import App from "./containers/App";

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default (ProviderApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
