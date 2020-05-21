import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from 'redux-logger'

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import collectionReducer from "./store/reducers/collection";
import photoReducer from "./store/reducers/photo";
import { watchCollection } from "./store/sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  collection: collectionReducer,
  photo: photoReducer
});

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(watchCollection);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
