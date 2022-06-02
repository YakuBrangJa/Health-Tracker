import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import AppLoader2 from "./components/Loaders/AppLoader2";
import App from "./App";
import store from "./store/store-index";

// const App = lazy(() => import("./App"));

function AppRoot() {
  return (
    // <Suspense fallback={<AppLoader2 />}>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/not-found" element={<AppLoader2 />} />
      </Routes>
    </Provider>
    // </Suspense>
  );
}

export default AppRoot;
