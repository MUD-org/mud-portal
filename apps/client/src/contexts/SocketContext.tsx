import React, { createContext, useContext, useEffect, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';
import { useUser } from '@mud-portal/frontend/src/contexts/UserContext';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = (): SocketContextType => {
    return useContext(SocketContext);
};

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { user } = useUser();

    const socket: Socket | null = useMemo(() => {
        if (!user || !user.token) {
            console.log("No user or token, not creating socket");
            return null;
        }

        console.log("Creating new socket instance");

        // Create the new socket instance
        const newSocket = io('localhost:3000', {
            auth: {
                token: user.token,
            },
            autoConnect: false
        });

        return newSocket;
    }, [user?.token]);

    useEffect(() => {
        if (socket) {
            console.log("Connecting to socket");

            // Establish socket connection
            socket.connect();

            socket.on('connect', () => {
                console.log('Connected to socket server');
            });

            // Clean up on unmount or token change
            return () => {
                console.log("Disconnecting socket");
                socket.disconnect();
            };
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
