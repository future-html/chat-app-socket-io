// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');


import express from 'express'; 
import http from 'http'; 
import {Server} from 'socket.io'; 


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow frontend to connect
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  },
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from the client
  socket.on('send_message', (data) => {
    console.log('Message received:', data);

    // Broadcast the message to all clients
    io.emit('receive_message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});