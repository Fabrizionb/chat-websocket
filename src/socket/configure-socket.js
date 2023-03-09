import { Server } from 'socket.io';

const message = []

export default function configureSocket(httpServer) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    console.log('new connection:', socket.id);
    socket.on('message', data => {
      message.push(data)
      io.emit('messageLogs', message)
    })

    socket.on('new_user', (data)=>{
    socket.emit('messageLogs', message)
    socket.broadcast.emit('user_connected', data )
  })
  });

 

}

