import React, { useEffect } from "react";

import { bodyMeasurementsActions } from "../store/body-measurements";
import { heartActions } from "../store/heart";
import { respiratoryActions } from "../store/respiratory";
import { otherDataActions } from "../store/other-data";

function useActionSelector(route) {
  const [action, setAction] = React.useState();

  const actionObj = {
    bodyMeasurementsActions,
    heartActions,
    respiratoryActions,
    otherDataActions,
  };

  const targetData =
    route &&
    route
      .split("-")
      .reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1))
      .replace("/", "") + "Actions";

  useEffect(() => {
    setAction(actionObj[targetData]);
  }, [targetData]);

  return {
    action,
  };
}

export default useActionSelector;
