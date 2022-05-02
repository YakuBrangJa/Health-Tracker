import React, { useState } from "react";

function useHttps(requestConfig, firstRun) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (applyData) => {
    if (!firstRun) return;
    setIsLoading(true);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
      setIsLoading(false);
    } catch {
      setError(true);
    }
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttps;
