import { useState, useEffect } from 'react';

const API_URL = 'https://script.google.com/macros/s/AKfycbzjkzuwdnXyGBLa9QZox4x2lwN6Vgx6Oh1rYv0Ogqfwn1F_8HO-pGv-HPh_BLil5uyb4Q/exec';
const CACHE_KEY = 'urja_data_cache';

let globalData = null;
try {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) globalData = JSON.parse(cached);
} catch (e) {
  // Ignore localStorage errors
}

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
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(json));
        } catch (e) {}
        return json;
      })
      .catch(err => {
        console.error('Google Sheets API Fetch Error:', err);
        globalError = err.message || 'Error fetching data';
        throw err;
      });
  }
  return fetchPromise;
};

// Start fetching immediately as soon as this file is loaded
prefetchData().catch(() => {});

export const useGoogleAppsScript = () => {
  const [data, setData] = useState(globalData || {
    people: { active: [], alumni: [] },
    publications: [],
    opportunities: [],
    collaborations: []
  });
  
  // If we have cached data, we are technically not "loading" from a user perspective,
  // but we still fetch silently in the background.
  const [loading, setLoading] = useState(!globalData && !globalError);
  const [error, setError] = useState(globalError);

  useEffect(() => {
    let isMounted = true;
    
    // Always attach to the fetch promise to update with fresh data (stale-while-revalidate)
    prefetchData()
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted && !globalData) {
          // Only show error if we don't even have cached data
          setError(globalError);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
};
