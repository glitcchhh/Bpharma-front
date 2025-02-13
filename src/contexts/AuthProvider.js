import { useContext, createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("super-admin");
  const [token, setToken] = useState(sessionStorage.getItem("site") || "");

  const logOut = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider value={{ token, user, logOut, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
