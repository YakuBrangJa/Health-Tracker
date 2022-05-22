import useHttps from "./useHttps";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

function useDataRequest(actions) {
  const dispatch = useDispatch();

  const applyData = (data) => {
    dispatch(actions.populateData(data));
  };

  const { isLoading, error, sendRequest } = useHttps();
  // console.log(isLoading);
  const fetchData = useCallback(
    (branch) => {
      sendRequest(
        {
          url: `https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/${branch}/.json`,
        },
        applyData
      );
      dispatch(actions.updateFirstRunState(false));
    },
    [actions, sendRequest, applyData]
  );

  return {
    isLoading,
    error,
    fetchData,
  };
}

export default useDataRequest;
