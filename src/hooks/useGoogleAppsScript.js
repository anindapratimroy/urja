import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

let globalData = null;
let globalError = null;
let fetchPromise = null;

export const prefetchData = () => {
  if (!fetchPromise) {
    fetchPromise = fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        globalData = json;
        return json;
      })
      .catch(err => {
        globalError = err.message || 'Error fetching data';
        throw err;
      });
  }
  return fetchPromise;
};

// Start fetching immediately as soon as this file is loaded (while preloader runs)
prefetchData().catch(() => {});

export const useGoogleAppsScript = () => {
  const [data, setData] = useState(globalData || {
    people: { active: [], alumni: [] },
    publications: [],
    opportunities: [],
    collaborations: []
  });
  const [loading, setLoading] = useState(!globalData && !globalError);
  const [error, setError] = useState(globalError);

  useEffect(() => {
    // If data is already fetched by the time the component mounts, we are done.
    if (globalData || globalError) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    
    prefetchData()
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(globalError);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
};
