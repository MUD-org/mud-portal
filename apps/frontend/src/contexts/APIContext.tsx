import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNotification } from './NotificationContext';
import { useUser } from './UserContext';

const APIContext = createContext(axios.create());

interface APIContextProps {
  children: React.ReactNode;
}

export const APIProvider: React.FC<APIContextProps> = ({ children }) => {
  const { addNotification } = useNotification();
  const { getUserInfo } = useUser();
  const [loading, setLoading] = useState(false);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000', // Your API base URL
      withCredentials: true
    });

    /**
     * This is an error interceptor; instead of every API call handling its own errors
     * we instead make one interceptor that catches non-200 status codes
     * and posts them to the notifications provider.
     */
    instance.interceptors.response.use(
      (response: AxiosResponse) => response, // Return response for successful requests
      (error: AxiosError) => {
        // Handle Axios error
        if (error.response) {
          if (error.response.status === 401)
            return; // We dump unauthenticated flows
          // Add a notification for non-200 response
          addNotification({
            id: Date.now(),
            type: 'error',
            message: error.response.data.message
          });
        } else {
          // Handle other errors (e.g., network error)
          addNotification({
            id: Date.now(),
            type: 'error',
            message: `Network error: ${error.message}`
          });
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }, [addNotification]); // Recreate the instance only when the token changes

  useEffect(() => {
    const fetchSession = async() => {
      await getUserInfo(axiosInstance);
      setLoading(false);
    };

    if (!loading)
      setLoading(true);
    else if (loading)
      return;

    fetchSession();
  });

  return (
    <APIContext.Provider value={axiosInstance}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
