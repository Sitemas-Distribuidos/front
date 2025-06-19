// Get user's list in start of connection
import { createWebSocket } from '../utils/websocket';

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    const socket = createWebSocket('/user');

    socket.onopen = () => {
      socket.send(JSON.stringify({ method: 'GET-all' }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data.users || []);
      socket.close(); // Close after receiving
    };

    socket.onerror = (error) => {
      reject(error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };
  });
}