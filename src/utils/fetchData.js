// src/utils/fetchData.js - Updated to use your local API
export const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Local API base URL
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Exercise API functions
export const exerciseAPI = {
  // Get all exercises with filtering and pagination
  getExercises: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/exercises${
      queryParams ? `?${queryParams}` : ""
    }`;
    return fetchData(url);
  },

  // Get exercise by ID
  getExerciseById: async (id) => {
    return fetchData(`${API_BASE_URL}/api/exercises/${id}`);
  },

  // Get exercises by body part
  getExercisesByBodyPart: async (bodyPart, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/exercises/bodyPart/${bodyPart}${
      queryParams ? `?${queryParams}` : ""
    }`;
    return fetchData(url);
  },

  // Get exercises by target muscle
  getExercisesByTarget: async (target, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/exercises/target/${target}${
      queryParams ? `?${queryParams}` : ""
    }`;
    return fetchData(url);
  },

  // Get exercises by equipment
  getExercisesByEquipment: async (equipment, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/exercises/equipment/${equipment}${
      queryParams ? `?${queryParams}` : ""
    }`;
    return fetchData(url);
  },

  // Get all body parts
  getBodyParts: async () => {
    return fetchData(`${API_BASE_URL}/api/exercises/bodyParts`);
  },

  // Get all target muscles
  getTargets: async () => {
    return fetchData(`${API_BASE_URL}/api/exercises/targets`);
  },

  // Get all equipment types
  getEquipment: async () => {
    return fetchData(`${API_BASE_URL}/api/exercises/equipment`);
  },

  // Search exercises
  searchExercises: async (searchTerm, params = {}) => {
    const allParams = { ...params, search: searchTerm };
    return exerciseAPI.getExercises(allParams);
  },
};

// Legacy support - keep the YouTube API functions if you're still using them
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_YOUTUBE_API_HOST,
  },
};
