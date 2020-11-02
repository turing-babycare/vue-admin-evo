import io from 'socket.io-client';

export let socket: any;

export function connectSocket({
  ns,
  token,
  url
}: {
  ns: string;
  token: string;
  url: string;
}) {
  socket = io(url, {
    query: { ns, token },
    transports: ['websocket'],
    secure: true
  });
  return socket;
}

export function closeSocket() {
  socket.close();
  socket = null;
}
