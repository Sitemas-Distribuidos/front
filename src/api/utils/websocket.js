


/**
 * Create a WebSocket connection.
 * @param {string} path - Example: '/user' or '/message or /chat'
 * @returns {WebSocket} - The WebSocket instance
 */

export function createWebSocket(path = '/') {
  const WS_URL = import.meta.env.VITE_BACKEND_WS;
  const socket = new WebSocket(`${WS_URL}${path}`);
  console.log("WS URL: ", WS_URL);

  socket.onopen = () => {
    console.log(`WebSocket connected to ${path}`);
  };

  socket.onclose = (event) => {
    console.log(`WebSocket disconnected from ${path}`, event.reason);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
}