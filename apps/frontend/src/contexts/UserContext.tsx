import React, { createContext, useContext, useState } from 'react';
import UserSession from '../models/UserSession';
import {AxiosInstance} from 'axios';

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: UserSession | null;
  login: (api: AxiosInstance, data: FormData) => Promise<void>;
  register: (api: AxiosInstance, data: FormData) => Promise<void>;
}

// Create context
const UserContext = createContext<UserContextProps>({} as UserContextProps);

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  const login = async (api: AxiosInstance, data: FormData) => {
    api.post("http://localhost:3000/users/login", {
      email: data.get('email'),
      password: data.get('password')
    }).then(result => {
      const newUser = {
        id: 1,
        username: 'Testeroni',
        token: result.data.token,
        profilePicture: ''
      };
      setUser(newUser);
    })
  };

  const register = async () => {
  };

  return (
    <UserContext.Provider value={{ user, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
