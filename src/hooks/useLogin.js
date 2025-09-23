import { useCallback, useState } from "react";
import Api from "../api/Api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const saveLogin = useCallback(async (data) => {
    setLoading(true);

    let response;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      response = await Api.post("/api/login", data, config);
    } catch (error) {
      console.log({ error });
      setLoading(false);
      return {
        data: {
          status: "failed",
        },
      };
    }

    setLoading(false);
    return response;
  }, []);

  return {
    loading,
    saveLogin,
  };
};
