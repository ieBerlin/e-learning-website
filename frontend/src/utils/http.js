import { useEffect, useRef, useState } from "react";
import dummyCourses from "../dummy_data/dummyCourses";

export function getCourses() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(dummyCourses);
    }, 2000)
  );
}
export function useFetch(initialData, fetchedData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setData(fetchedData);
          setIsLoading(false);
        }, 3000);
      } catch (err) {
        setError(error);
        setData(undefined);
        setIsLoading(false);
      }
    };

    getData();
  }, [error, fetchedData]);
  function handleResetData() {
    setData(null);
  }
  return {
    onRestData: handleResetData,
    isFetching: isLoading,
    data,
    error,
  };
}
