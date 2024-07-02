import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";

// const URL = "http://localhost:5000/api/auth/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  //   tackling logout

  const LogoutUser = () => {
    setToken("");
    setUser({});
    toast.success("Logout successful");
    return localStorage.removeItem("token");
  };

  // JWT Autuhentication - to get the currently logged in user data

  const userAuthentication = async () => {
    try {
      console.log("Starting user authentication");
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if(response.ok){
        const data = await response.json();
        console.log('user data', data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };
  
  useEffect( () => {
    console.log("token changed or on mount, token:", token);
    if(token)
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, user, authorizationToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
