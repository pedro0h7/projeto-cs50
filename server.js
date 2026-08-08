const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
const { Server } = require("socket.io");
const io = new Server(server);
const players = {};
const screen = { width: 800, height: 600 };

app.use(express.static('public'));

io.on('connection', (socket) => {
    players[socket.id] = { 
        x: 0,
        y: 0,
        size: 15,
        speed: 3,
        color: "yellow"
    }

    io.emit('updatePlayers', players);

    socket.on('movePlayer', (data) => {
        const {playerId, keyPressed} = data;

        if (keyPressed === "ArrowUp") {
            if (players[playerId].y - players[playerId].speed >= 0){
                players[playerId].y -= players[playerId].speed;
            };
        };

        if (keyPressed === "ArrowDown") {
            if (players[playerId].y + players[playerId].speed <= screen.height - players[playerId].size) {
                players[playerId].y += players[playerId].speed;
            };
        };
        
        if (keyPressed === "ArrowRight") {
            if (players[playerId].x + players[playerId].speed <= screen.width - players[playerId].size) {
                players[playerId].x += players[playerId].speed;
            };
        };

        if (keyPressed === "ArrowLeft") {
            if (players[playerId].x - players[playerId].speed >= 0) {
                players[playerId].x -= players[playerId].speed;
            }
        }

        io.emit('updatePlayers', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
