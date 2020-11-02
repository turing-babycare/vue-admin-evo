import io from 'socket.io-client';

export let socket: any;

export function connectSocket(token: string) {
  socket = io(process.env.VUE_APP_WS_URL, {
    query: {
      ns: 'fd/dataview/ask/develop',
      token
    },
    transports: ['websocket'],
    secure: true
  });
  return socket;
}

export function closeSocket() {
  socket.close();
  socket = null;
}
