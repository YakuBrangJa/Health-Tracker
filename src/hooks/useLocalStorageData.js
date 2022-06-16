import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "./useLocalStorage";

function useLocalStorageData(key, action, defaultValue) {
  const [value, setValue] = useLocalStorage(key, defaultValue);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.populateData(value));
    // setValue(value);
  }, [value]);

  return;
}

export default useLocalStorageData;
