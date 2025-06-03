export function fetchUsersWebSocket() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:8080/user');

    socket.onopen = () => {
      const messageBody = {
        method: 'GET-all',
      };
      socket.send(JSON.stringify(messageBody));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        resolve(Array.isArray(data.users) ? data.users : []);

        socket.close();
      } catch (err) {
        reject(err);
      }
    };

    socket.onerror = (err) => {
      reject(err);
    };
  });
}