import useHttps from "./useHttps";
import { useDispatch } from "react-redux";

function useDataRequest(branch, actions) {
  const dispatch = useDispatch();
  const applyData = (data) => {
    dispatch(actions.populateData(data));
  };

  const { isLoading, error, sendRequest } = useHttps({
    url: `https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker/${branch}.json`,
  });

  const fetchData = () => {
    sendRequest(applyData);
    dispatch(actions.updateComponentState(false));
  };
  return {
    isLoading,
    error,
    fetchData,
  };
}

export default useDataRequest;
