import { useLayoutEffect, useRef } from "react";

function useOnClickOutside(ref, handler, active) {
  const callbackRef = useRef();
  callbackRef.current = handler;

  useLayoutEffect(() => {
    // if (!active) return;
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // handler(event);
      callbackRef.current(event);
    };
    document.addEventListener("mouseup", listener);

    return () => {
      document.removeEventListener("mouseup", listener);
    };
  }, [ref, callbackRef]);
}

export default useOnClickOutside;
