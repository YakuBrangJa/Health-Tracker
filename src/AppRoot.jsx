import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppLoader2 from "./components/Loaders/AppLoader2";

const App = lazy(() => import("./App"));

function AppRoot() {
  return (
    <Suspense fallback={<AppLoader2 />}>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/not-found" element={<AppLoader2 />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoot;
