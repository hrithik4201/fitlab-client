export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": import.meta.env.REACT_APP_EXERCISE_API_HOST,
    "X-RapidAPI-Key": import.meta.env.REACT_APP_EXERCISE_API_KEY,
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.REACT_APP_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": import.meta.env.REACT_APP_YOUTUBE_API_HOST,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
