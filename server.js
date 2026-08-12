const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
const { Server } = require("socket.io");
const io = new Server(server);
const players = {};
const fruits = {};
const screen = { width: 800, height: 600 };

app.use(express.static('public'));

io.on('connection', (socket) => {

    socket.on("getNickname", (data) => {

        players[socket.id] = { 
        nickname: data.nickname,
        x: Math.floor(Math.random() * screen.width),
        y: Math.floor(Math.random() * screen.height),
        size: 15,
        speed: 2,
        color: "yellow",
        score: 0
        };

        io.emit('updatePlayers', players);
        socket.emit('addFruits', fruits);
    });

    socket.on('movePlayer', (data) => {
        const {playerId, keyPressed} = data;

        if (!players[playerId]) return;

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

        for (const fruitId in fruits) {
            if (players[playerId].x < fruits[fruitId].x + fruits[fruitId].size &&
                players[playerId].x + players[playerId].size > fruits[fruitId].x &&
                players[playerId].y < fruits[fruitId].y + fruits[fruitId].size &&
                players[playerId].y + players[playerId].size > fruits[fruitId].y
            ) {
                players[playerId].score += 1;
                delete fruits[fruitId];
                io.emit("updatePlayers", players);
                io.emit("addFruits", fruits);
            };
        };

        io.emit('updatePlayers', players);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
});

let checkPosition = (fruitId) => {

    let x = 0;
    let y = 0;
    let valid = false;
    const size = 15

    while (!valid) {
        x = Math.floor(Math.random() * (screen.width - size))
        y = Math.floor(Math.random() * (screen.height - size))

        valid = true
        for (const fruit in fruits) {
            if (Math.sqrt((fruits[fruit].x - x) ** 2 + (fruits[fruit].y - y) ** 2) < size * 3) {
                valid = false;
            };
        };
    };
    return {x, y };
};

setInterval(() => {
    if (Object.keys(fruits).length < 5) {
        const fruitId = Date.now();
        const position = checkPosition(fruitId);

        fruits[fruitId] = {
        x: position.x,
        y: position.y,
        size: 15,
        color: "green"
        };

        io.emit("addFruits", fruits);
    }
}, 3000);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
