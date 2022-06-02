import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store-index";

import "./index.css";
import AppLoader2 from "./components/Loaders/AppLoader2";
// import AppRoot from "./AppRoot";
const AppRoot = lazy(() => import("./AppRoot"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader2 />}>
      <BrowserRouter>
        {/* <Provider store={store}> */}
        <AppRoot />
        {/* </Provider> */}
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
