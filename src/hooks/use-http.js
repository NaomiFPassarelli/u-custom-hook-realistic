import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestParams, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      // como lo hizo el
      const response = await fetch(
        requestParams.url, {
          method: requestParams.method ? requestParams.method : 'GET',
          header: requestParams.header ? requestParams.header : {},
          body: requestParams.body ? JSON.stringify(requestParams.body) : null
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return { isLoading: isLoading, error: error, sendRequest: sendRequest };
};

export default useHttp;
