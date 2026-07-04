import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export const useGoogleAppsScript = () => {
  const [data, setData] = useState({
    people: { active: [], alumni: [] },
    publications: [],
    opportunities: [],
    collaborations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
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
