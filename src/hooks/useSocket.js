import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const SOCKET_URL = import.meta.env.VITE_BACKEND_WS;

export const useSocket = (path = '') => {
  const [socketData, setSocketData] = useState(null);

  const { sendMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(
    `${SOCKET_URL}${path}`,
    {
      onOpen: () => console.log(`Connected to App WS 🚀`),
      onMessage: (message) => {
        if(!message) return;
        const data = JSON.parse(message.data);
        if (data) {
          // console.log(data);
          setSocketData(data);
        }
      },
      onError: (event) => { console.error(event); },
      onClose: (close) => { console.log(close); },
      shouldReconnect: () => true, // reconecta automaticamente
      reconnectAttempts: 10,
      reconnectInterval: 2000,
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Conectando...',
    [ReadyState.OPEN]: 'Conectado',
    [ReadyState.CLOSING]: 'Fechando...',
    [ReadyState.CLOSED]: 'Desconectado',
    [ReadyState.UNINSTANTIATED]: 'Não iniciado',
  }[readyState];

  return {
    sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    connectionStatus,
    socketData,
  };
};
