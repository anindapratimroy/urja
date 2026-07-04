import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

let globalData = null;
let fetchPromise = null;

export const prefetchData = () => {
  if (!globalData && !fetchPromise) {
    fetchPromise = fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(jsonData => {
        globalData = jsonData;
        return jsonData;
      })
      .catch(err => {
        console.error('Prefetch error:', err);
        fetchPromise = null; // allow retry
      });
  }
  return fetchPromise;
};

export const useGoogleAppsScript = () => {
  const [data, setData] = useState(globalData || {
    people: { active: [], alumni: [] },
    publications: [],
    opportunities: [],
    collaborations: []
  });
  const [loading, setLoading] = useState(!globalData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (globalData) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        if (!fetchPromise) {
          prefetchData();
        }
        await fetchPromise;
        if (globalData) {
          setData(globalData);
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
