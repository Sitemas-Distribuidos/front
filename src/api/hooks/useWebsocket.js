// Manage Websocket connection reactively inside React Components.
// It keeps the socket connection lifecycle clean and hancles messages easily.

import { useEffect, useRef } from 'react';
import { createWebSocket } from '../utils/websocket';

export function useWebSocket(path = '/', { onMessage, onOpen, onClose, onError } = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = createWebSocket(path);
    socketRef.current = socket;

    if (onOpen) socket.onopen = onOpen;
    if (onMessage) socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('JSON parse error:', error);
      }
    };
    if (onError) socket.onerror = onError;
    if (onClose) socket.onclose = onClose;

    return () => {
      socket.close();
    };
  }, [path, onMessage, onOpen, onClose, onError]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Message not sent:', message);
    }
  };

  return { sendMessage, socket: socketRef.current };
}
