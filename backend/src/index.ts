import { server } from './server';
import { io as ioClient } from 'socket.io-client';

server.listen(3000, () => {
  console.log(`servidor Online - acesse: http://localhost:3000/`);
});
