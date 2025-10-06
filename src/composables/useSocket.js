// /src/composables/useSocket.js
import { ref } from 'vue';
import { io } from 'socket.io-client';

export const useSocket = (baseURL, token) => {
  const socket = ref(null);

  const connect = (userId) => {
    socket.value = io(baseURL, { auth: { token }, transports: ['websocket'] });
    socket.value.emit('join', userId);
    return socket;
  };

  const disconnect = () => socket.value?.disconnect();

  return { socket, connect, disconnect };
};
