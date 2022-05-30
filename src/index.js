import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import store from "./store/store-index";
import AppLoader from "./Loaders/AppLoader";
import AppLoader2 from "./Loaders/AppLoader2";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader2 />}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/not-found" element={<h2>Page Not Found</h2>} />
          </Routes>
          {/* <App /> */}
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
