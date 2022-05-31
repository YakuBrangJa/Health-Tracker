import React from "react";

function getSavedValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);

  if (savedValue) return JSON.parse(savedValue);

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

function useLocalStorage(key, initial) {
  const [value, setValue] = React.useState(() => {
    return getSavedValue(key, initial);
  });

  React.useEffect(() => {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
