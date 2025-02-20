import { useCallback, useState } from "react";
import { Api } from "../api/Api";
import { useAuth } from "../contexts/AuthProvider";

export const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const saveUser = useCallback(async ({ url = "", data }) => {
    setLoading(true);

    let response;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      response = await Api.post(url, data, config);
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
    saveUser,
  };
};
