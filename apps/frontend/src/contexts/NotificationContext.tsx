import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface INotification {
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface NotificationProviderProps {
  children: ReactNode
}

interface NotificationContextProps {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
