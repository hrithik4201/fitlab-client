import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let json = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        json = await response.json();
      } catch (_) {
        json = null;
      }
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json?.error || `Login failed (${response.status})`);
    }
    if (response.ok) {
      // save the user to local storage
      if (json) {
        localStorage.setItem("user", JSON.stringify(json));
      }

      // update the auth context
      if (json) {
        dispatch({ type: "LOGIN", payload: json });
      }

      // update loading state
      setIsLoading(false);

      navigate("/");
    }
  };

  return { login, isLoading, error };
};
