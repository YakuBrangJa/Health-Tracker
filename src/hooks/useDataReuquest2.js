import useHttps from "./useHttps";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

import { uiStateActions } from "../store/ui-state";

function useDataRequest2() {
  const dispatch = useDispatch();

  const applyActions = (actions) => {
    return function applyData(data) {
      dispatch(actions.populateData(data));
    };
  };

  // https://clone-demo-c5cc6-default-rtdb.firebaseio.com/

  const { isLoading, error, sendRequest } = useHttps();
  const fetchData = useCallback(
    (branch, actions) => {
      sendRequest(
        {
          url: `https://clone-demo-c5cc6-default-rtdb.firebaseio.com/health-tracker/${branch}/.json`,
        },
        applyActions(actions)
      );
      dispatch(uiStateActions.updateFirstRunState(false));
    },
    [uiStateActions, sendRequest]
  );

  return {
    isLoading,
    error,
    fetchData,
  };
}

export default useDataRequest2;
