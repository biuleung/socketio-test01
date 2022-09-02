import path from 'path';
// 系統目錄設定

import express from 'express';


import SocketIO from './socket-io';

// Create Express server
const app = express();

const socketServer = new SocketIO(app);

setInterval(() => {
  const time = new Date().toLocaleTimeString();
  console.log('broadcasting... ', time);
  socketServer.broadcast(time);
}, 7000);

// setInterval(() => {
//   const randomClientId = socketServer.getSocketIds().sort((a, b) => 0.5 - Math.random())[0];
//   socketServer.sendMsgToSpecificSocketId(randomClientId);
// }, 10000);

setInterval(() => {
  const randomClientId = socketServer.getSocketIds().sort((a, b) => 0.5 - Math.random())[0];
  socketServer.disconnectSpecificSocketById(randomClientId);
}, 7000);


export default app;
