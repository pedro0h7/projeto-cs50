var socket = io();

export let playerId; 

socket.on('connect', () => {
    playerId = socket.id;
});

export function movePlayer(playerId, keyPressed) {
    socket.emit('movePlayer', { playerId, keyPressed });
};

export function onUpdatePlayers(callback) {
    socket.on('updatePlayers', (players) => {
        callback(players);
    });
};
