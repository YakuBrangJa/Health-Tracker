import { lazy, Suspense, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import AppLoader2 from "./components/Loaders/AppLoader2";
import { uiStateActions } from "./store/ui-state";
import useDarkMode from "./hooks/useDarkMode";
// import App from "./App";
import store from "./store/store-index";

const App = lazy(() => import("./App"));

function AppRoot() {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => state.uiState);

  // SETTING INITIAL THEME
  const [theme, setTheme] = useDarkMode(darkTheme);
  useEffect(() => {
    dispatch(uiStateActions.setDarkTheme(theme));
  }, [theme]);

  // READING DEVICE WIDTH
  useEffect(() => {
    dispatch(uiStateActions.setWindowWidth(window.innerWidth));
  }, [window.innerWidth]);

  return (
    <Suspense fallback={<AppLoader2 />}>
      {/* <Provider store={store}> */}
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/not-found" element={<AppLoader2 />} />
      </Routes>
      {/* </Provider> */}
    </Suspense>
  );
}

export default AppRoot;
