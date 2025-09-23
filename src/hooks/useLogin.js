import { useCallback, useState } from "react";
import Api from "../api/Api"; // Axios instance

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const saveLogin = useCallback(async (loginData) => {
    setLoading(true);
    let responseData = { status: "failed", message: "Unknown error" };

    try {
      const response = await Api.post("/login", loginData);
      responseData = response.data; // Use backend response directly
    } catch (error) {
      console.error("Login error:", { message: error.message, response: error.response?.data });
      responseData = {
        status: "failed",
        message: error.response?.data?.message || error.message,
      };
    }

    setLoading(false);
    return responseData;
  }, []);

  return { loading, saveLogin };
};
