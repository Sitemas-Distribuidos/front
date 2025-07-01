import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

export function useGetChatID(username1, username2) {
  const [chatID, setChatID] = useState(null);

  const {
    sendMessage,
    socketData,
    connectionStatus,
  } = useSocket('');

  useEffect(() => {
    if (connectionStatus === 'Conectado') {
      const msg = {
        channel: 'chat',
        method: 'GET',
        type: 'private',
        members: [username1, username2],
      };
      sendMessage(JSON.stringify(msg));
    }
  }, [connectionStatus, username1, username2]);

  useEffect(() => {
    if (socketData?.chat_id) {
      setChatID(socketData.chat_id);
    }
  }, [socketData]);

  return chatID;
}
