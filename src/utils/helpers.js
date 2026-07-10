export const getDirectImageUrl = (url) => {
  if (!url) return '';
  
  // Extract Google Drive ID
  const matchId = url.match(/[-\w]{25,}/);
  if (matchId && url.includes('drive.google.com')) {
    return `https://drive.google.com/uc?export=view&id=${matchId[0]}`;
  }
  
  return url;
};
