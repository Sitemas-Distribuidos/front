import React, { createContext, useContext, useRef, useEffect } from 'react';
import { createWebSocket } from '../utils/websocket';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ path, children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = createWebSocket('/');
        socketRef.current = socket;

        return () => {
        socket.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(message));
        } else {
        console.warn("WebSocket is not open");
        }
    };

    const value = {
        socket: socketRef.current,
        sendMessage,
    };

    return (
        <WebSocketContext.Provider value={value}>
        {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);