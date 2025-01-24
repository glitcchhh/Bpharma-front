import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
