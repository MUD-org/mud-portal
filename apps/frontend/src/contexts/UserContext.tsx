import React, { createContext, useContext, useState } from 'react';
import UserSession from '../models/UserSession';
import {AxiosInstance} from 'axios';
import { AuthenticationResponse, UserInfoResponse } from '@mud-portal/backend/src/controllers/UserController';

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: UserSession | null;
  login: (api: AxiosInstance, data: FormData) => Promise<AuthenticationResponse>;
  register: (api: AxiosInstance, data: FormData) => Promise<AuthenticationResponse>;
}

// Create context
const UserContext = createContext<UserContextProps>({} as UserContextProps);

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  const login = async (api: AxiosInstance, data: FormData): Promise<AuthenticationResponse> => {
    const loginResponse = await api.post<AuthenticationResponse>("http://localhost:3000/users/login", {
      emailOrUsername: data.get('email'),
      password: data.get('password'),
      ssoRequest: data.get('sso') === "true"
    });

    if (data.get('sso') === "true") {
      return loginResponse.data as AuthenticationResponse;
    }
    
    // Now that we've logged in; let's fetch user information and assign it to our state.
    const userId = 1;
    const infoResponse = await api.get<UserInfoResponse>(`http://localhost:3000/users/info/${userId}`);
    const newUser = {
      id: userId,
      username: infoResponse.data.username,
      profilePicture: infoResponse.data.profilePicture
    };
    setUser(newUser);
    console.log(newUser);
    return loginResponse.data as AuthenticationResponse;
  };

  const register = async (api: AxiosInstance, data: FormData): Promise<AuthenticationResponse> => {
    const registerResponse = await api.post<AuthenticationResponse>("http://localhost:3000/users/register", {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      ssoRequest: data.get('sso') === "true",
      birthday: new Date(Number(data.get('age-year')), Number(data.get('age-month')) - 1, Number(data.get('age-day'))).valueOf() / 1000
    });

    if (data.get('sso') === "true") {
      return registerResponse.data as AuthenticationResponse;
    }

    return await login(api, data);
  };

  return (
    <UserContext.Provider value={{ user, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
