import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useDarkMode from "./hooks/useDarkMode";
import { uiStateActions } from "./store/ui-state";

import AppLoader2 from "./Loaders/AppLoader2";

const App = lazy(() => import("./App"));

function AppRoot() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.uiState.darkTheme);

  const [theme, setTheme] = useDarkMode(darkTheme);
  useEffect(() => {
    dispatch(uiStateActions.setDarkTheme(theme));
  }, [theme]);

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
