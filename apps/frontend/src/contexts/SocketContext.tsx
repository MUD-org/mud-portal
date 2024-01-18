import React, { createContext, useContext, useEffect, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';
import { useUser } from './UserContext';

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
        // Ensure the user and the JWT token are present
        if (!user || !user.token) return null;

        const newSocket = io('localhost:3000', {
            auth: {
                token: user.token,
            },
            // additional options if needed
        });

        newSocket.on("connection", () => {
            console.log("connection established");
        });

        return newSocket;
    }, [user?.token]); // Depend on jwtToken

    useEffect(() => {
        if (socket) {
            // Establish socket connection
            socket.connect();

            // Clean up on unmount or token change
            return () => {
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
