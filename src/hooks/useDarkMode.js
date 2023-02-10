import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";
// import useMedia from "./useMedia";

function useDarkMode(defaultValue) {
  // set theme to user's previous choice
  const [enabledState, setEnabledState] = useLocalStorage(
    "dark-theme",
    defaultValue
  );

  // const prefersDarkMode = useMedia(
  //   ["(prefers-color-scheme: dark)"],
  //   [true],
  //   false
  // );

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : defaultValue;

  // Fire off effect that add/removes dark mode class
  useEffect(() => {
    const className = "dark-mode";
    const element = window.document.body;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);

  useEffect(() => {
    setEnabledState(defaultValue);
  }, [defaultValue]);

  return [enabled, setEnabledState];
}

export default useDarkMode;
