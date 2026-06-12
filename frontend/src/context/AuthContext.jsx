import {
  createContext,
  useEffect,
  useState,
  useCallback
} from "react";

import api from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [initialized, setInitialized] =
    useState(false);

  const fetchProfile = useCallback(
    async () => {

      try {

        const res =
          await api.get("/profile");

        setUser(res.data.user);

        return res.data.user;

      } catch (error) {

        setUser(null);

        return null;

      }

    },
    []
  );

  useEffect(() => {

    const initAuth = async () => {

      setLoading(true);

      await fetchProfile();

      setLoading(false);

      setInitialized(true);

    };

    initAuth();

  }, [fetchProfile]);

  const syncUser = async () => {

    return await fetchProfile();

  };

  const logout = async () => {

    try {

      await api.post("/logout");

    } catch (error) {

      console.error(error);

    }

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        initialized,
        syncUser,
        logout,
        refreshProfile: fetchProfile
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};