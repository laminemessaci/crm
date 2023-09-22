import { useState, useEffect } from "react";

// Create a custom hook to make API calls
function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`API request error - Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useApi;
