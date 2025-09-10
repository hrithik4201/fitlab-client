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

const API_BASE_URL = "https://www.exercisedb.dev/api/v1";

// Exercise API functions using the new v1 endpoints
export const exerciseAPI = {
  // Get all exercises with optional search and pagination
  getExercises: async (params = {}) => {
    const {
      offset = 0,
      limit = 12,
      search = "",
      sortBy = "name",
      sortOrder = "asc",
    } = params;

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      sortBy,
      sortOrder,
    });

    const url = `${API_BASE_URL}/exercises?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Search exercises with fuzzy matching
  searchExercises: async (query, params = {}) => {
    const { offset = 0, limit = 12, threshold = 0.3 } = params;

    const queryParams = new URLSearchParams({
      q: query,
      offset: offset.toString(),
      limit: limit.toString(),
      threshold: threshold.toString(),
    });

    const url = `${API_BASE_URL}/exercises/search?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Advanced filtering
  filterExercises: async (filters = {}) => {
    const {
      offset = 0,
      limit = 12,
      search = "",
      muscles = "",
      equipment = "",
      bodyParts = "",
      sortBy = "name",
      sortOrder = "asc",
    } = filters;

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...(search && { search }),
      ...(muscles && { muscles }),
      ...(equipment && { equipment }),
      ...(bodyParts && { bodyParts }),
    });

    const url = `${API_BASE_URL}/exercises/filter?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Get exercise by ID
  getExerciseById: async (exerciseId) => {
    const url = `${API_BASE_URL}/exercises/${exerciseId}`;
    const response = await fetchData(url);
    return response.data;
  },

  // Get exercises by body part
  getExercisesByBodyPart: async (bodyPartName, params = {}) => {
    const { offset = 0, limit = 12 } = params;

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    const url = `${API_BASE_URL}/bodyparts/${encodeURIComponent(
      bodyPartName
    )}/exercises?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Get exercises by target muscle
  getExercisesByMuscle: async (muscleName, params = {}) => {
    const { offset = 0, limit = 12, includeSecondary = false } = params;

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      includeSecondary: includeSecondary.toString(),
    });

    const url = `${API_BASE_URL}/muscles/${encodeURIComponent(
      muscleName
    )}/exercises?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Get exercises by equipment
  getExercisesByEquipment: async (equipmentName, params = {}) => {
    const { offset = 0, limit = 12 } = params;

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    const url = `${API_BASE_URL}/equipments/${encodeURIComponent(
      equipmentName
    )}/exercises?${queryParams}`;
    const response = await fetchData(url);

    return {
      exercises: response.data || [],
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: response.metadata?.totalPages || 1,
        totalExercises: response.metadata?.totalExercises || 0,
        exercisesPerPage: limit,
        hasNextPage: response.metadata?.nextPage ? true : false,
        hasPrevPage: response.metadata?.previousPage ? true : false,
      },
    };
  },

  // Get all body parts
  getBodyParts: async () => {
    const url = `${API_BASE_URL}/bodyparts`;
    const response = await fetchData(url);
    // Add "all" option at the beginning for UI
    const bodyParts = response.data?.map((item) => item.name) || [];
    return ["all", ...bodyParts];
  },

  // Get all target muscles
  getMuscles: async () => {
    const url = `${API_BASE_URL}/muscles`;
    const response = await fetchData(url);
    return response.data?.map((item) => item.name) || [];
  },

  // Get all equipment types
  getEquipments: async () => {
    const url = `${API_BASE_URL}/equipments`;
    const response = await fetchData(url);
    return response.data?.map((item) => item.name) || [];
  },
};

// Helper function to build pagination parameters
export const buildPaginationParams = (page = 1, limit = 12) => {
  const offset = (page - 1) * limit;
  return { offset, limit };
};

// Helper function to normalize exercise data for consistent UI
export const normalizeExerciseData = (exercise) => {
  return {
    id: exercise.exerciseId,
    exerciseId: exercise.exerciseId,
    name: exercise.name,
    bodyPart: exercise.bodyParts?.[0] || "unknown",
    target: exercise.targetMuscles?.[0] || "unknown",
    equipment: exercise.equipments?.[0] || "body weight",
    secondaryMuscles: exercise.secondaryMuscles || [],
    instructions: exercise.instructions || [],
    gifUrl: exercise.gifUrl,
    bodyParts: exercise.bodyParts,
    targetMuscles: exercise.targetMuscles,
    equipments: exercise.equipments,
  };
};

// Export for backward compatibility (if you still use YouTube API)
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_YOUTUBE_API_KEY || "",
    "X-RapidAPI-Host": import.meta.env.VITE_YOUTUBE_API_HOST || "",
  },
};
