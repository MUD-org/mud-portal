import React from 'react';
import Alert from '@mui/material/Alert';
import { useNotification } from '../contexts/NotificationContext';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <>
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          severity={notification.type}
          onClose={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </>
  );
};

export default Notifications;
