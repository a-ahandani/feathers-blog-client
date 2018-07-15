import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import blogReducer from "./containers/Blog/Posts/store/reducers/blog";
import adminReducer from "./store/admin/reducers/reducers-index";
import authReducer from "./containers/Auth/store/reducers/auth";

import { watchAuth } from "./containers/Auth/store/sagas";
import { watchBlog } from "./containers/Blog/Posts/store/sagas/index";
import { watchAdmin } from "./store/admin/sagas/sagas-index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  blog: blogReducer,
  admin: adminReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBlog);
sagaMiddleware.run(watchAdmin);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
