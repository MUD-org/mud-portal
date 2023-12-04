import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../models/User';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    // Perform login logic, set user on success
    setUser({ username });
  };

  const logout = (): void => {
    setUser(null);
  };

  return { user, login, logout };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return (
      <UserContext.Provider value={auth}>
        {children}
      </UserContext.Provider>
    );
};