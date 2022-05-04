import React from "react";
import { useSelector } from "react-redux";

import { bodyMeasurementsActions } from "../store/body-measurements";
import { heartActions } from "../store/heart";

function useActionSelector() {
  const [action, setAction] = React.useState();

  const sidebarState = useSelector((state) => state.formState.sidebarState);

  const select = () => {
    switch (sidebarState) {
      case "/body-measurements":
        setAction(bodyMeasurementsActions);
        break;
      case "/heart":
        setAction(heartActions);
        break;
      default:
        break;
    }
  };

  return {
    action,
    select,
  };
}

export default useActionSelector;
