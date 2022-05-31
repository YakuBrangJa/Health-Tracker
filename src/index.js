import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store-index";

import "./index.css";
import AppRoot from "./AppRoot";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
