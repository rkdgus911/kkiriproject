import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { tempSetMember, check } from "./modules/member";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const loadMember = () => {
  try {
    const member = localStorage.getItem("member");

    if (!member) {
      return;
    }
    store.dispatch(tempSetMember(member));
    store.dispatch(check());
  } catch (e) {
    console.log("localStorage error!");
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
loadMember();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
