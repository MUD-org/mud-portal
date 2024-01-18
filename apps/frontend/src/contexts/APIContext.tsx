import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Import your UserContext

const APIContext = createContext(axios.create());

interface APIContextProps {
  children: React.ReactNode;
}

export const APIProvider: React.FC<APIContextProps> = ({ children }) => {
  const { user } = useUser();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000', // Your API base URL
    });

    instance.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    return instance;
  }, [user?.token]); // Recreate the instance only when the token changes

  return (
    <APIContext.Provider value={axiosInstance}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
