import { Server } from 'socket.io';
import http from 'http';

class SocketIO {
    io: any;
    socketIds: string[] = [];
    constructor(expressApp: any) {
        let httpServer = http.createServer(expressApp);
        this.io = new Server(httpServer);

        this.io.on("connection", (socket: any) => {
            this.socketIds.push(socket.id);
            console.log('client connecting: ', socket.id);

            socket.on('disconnect', async () => {
                console.log("disconnect: ", socket.id);
                this.removeSocketId(socket.id);
            });

            socket.on('fromClient', (msg: any) => {
                console.log("\u001b[1;33m msg from client: ", msg.data, " \u001b[0m")
            })
        });
        httpServer.listen(3012);
    }

    broadcast(data: any) {
        if (this.socketIds.length) {
            this.io.emit('broadcast', { time: data });
        }
    }

    getSocketIds() {
        return this.socketIds;
    }

    sendMsgToSpecificSocketId(id: string) {
        this.io.to(id).emit('private', { message: id + ' only' });
    }

    disconnectSpecificSocketById(id: string) {
        if (!id || !id.trim()) {
            return;
        }
        this.io.sockets.sockets.forEach((socket: any) => {
            if (socket.id === id) {
                socket.disconnect(true);
                // console.log("disconnect: ", id);
                this.removeSocketId(id);
                // console.log("current socketIds: ", this.socketIds);
            }
        })
    }

    removeSocketId(id: string) {
        const index = this.socketIds.indexOf(id);
        if (index !== -1) {
            this.socketIds.splice(index, 1);
            console.log("current socketIds: ", this.socketIds);
        }
    }

}

export default SocketIO;