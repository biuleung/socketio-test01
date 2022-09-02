const { io } = require("socket.io-client");

const socket = io.connect('http://localhost:3012/');
let socketId;

socket.on('connect', () => {
    socketId = socket.id;

    setInterval(() => {
        socket.emit('fromClient', {data: socketId});
    }, 8000)
})

socket.on("broadcast", (msg) => {
    console.log(`(${socketId}) From Server: ${msg.time}`);
})

socket.on('private', (msg) => {
    console.log(`\u001b[1;32m= (${socketId}) Private msg from Server: ${msg.message} \u001b[0m`);

});
