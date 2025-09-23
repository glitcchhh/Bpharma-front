import React, { useEffect, useState } from "react";
import API from "../api/Api"; // axios wrapper we created earlier

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/test")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default Dashboard;
