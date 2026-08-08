export var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

export function renderScreen(players, currentPlayerId) {
    // Clear all 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const playerId in players) {
        if (currentPlayerId === playerId) {
            ctx.fillStyle = players[playerId].color;
        } else {
            ctx.fillStyle = '#444';
        }
        ctx.fillRect(players[playerId].x, players[playerId].y, players[playerId].size, players[playerId].size);

    };
};