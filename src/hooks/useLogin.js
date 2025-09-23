import { useCallback, useState } from "react";
import Api from "../api/Api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Generic function for login or signup
   * @param {Object} data - { email, password }
   * @param {String} type - "login" or "signup"
   */
  const saveLogin = useCallback(async (data, type = "login") => {
    setLoading(true);

    let responseData = {
      status: "failed",
      message: "Unknown error",
    };

    if (!data.email || !data.password) {
      setLoading(false);
      return { status: "failed", message: "Email and password are required" };
    }

    const endpoint = type === "signup" ? "/signup" : "/login";

    try {
      const response = await Api.post(endpoint, {
        email: data.email,
        password: data.password,
      });

      // Assuming backend returns { status: "OK", data: { userData, auth_token } }
      responseData = response.data;

      // For signup, backend may just return message, so normalize
      if (!responseData.status) {
        responseData.status = "OK";
      }
    } catch (error) {
      console.error("Login error:", {
        message: error.message,
        response: error.response?.data,
      });

      if (error.response?.data) {
        responseData = {
          status: "failed",
          ...error.response.data,
        };
      } else {
        responseData.message = error.message;
      }
    }

    setLoading(false);
    return responseData;
  }, []);

  return { loading, saveLogin };
};
