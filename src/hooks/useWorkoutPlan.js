import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useWorkoutPlan = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const createWorkoutPlan = async (text) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/planner/workout-plan`,
        { text },
        {
          headers,
        }
      );

      return response.data.text;
    } catch (error) {
      setError(error.response.data.error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createWorkoutPlan, isLoading, error };
};
