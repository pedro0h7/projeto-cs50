const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log("Player connected: " + socket.id);

    socket.on('disconnect', () => {
        console.log("Player disconnected: " + socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});