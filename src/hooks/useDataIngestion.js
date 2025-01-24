import { useCallback, useState } from "react";
import { Api } from "../api/Api";
import { useAuth } from "../contexts/AuthProvider";

export const useDataIngestion = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const saveDataIngestion = useCallback(
    async ({ url = "", method = "get", data = null }) => {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      try {
        if (method == "get") {
          response = await Api.get(url, config);
        } else {
          response = await Api.post(url, data, config);
        }
      } catch (error) {
        console.log({ error });
        setLoading(false);
        throw error;
      }

      setLoading(false);
      return response;
    },
    []
  );

  return {
    loading,
    saveDataIngestion,
  };
};
