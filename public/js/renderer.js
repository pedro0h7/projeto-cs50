var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

export function renderScreen(players, currentPlayerId, fruits) {
    // Clear all 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const playerId in players) {
        if (currentPlayerId === playerId) {
            ctx.fillStyle = players[playerId].color;
        } else {
            ctx.fillStyle = '#a855f7';
        }
        ctx.fillRect(players[playerId].x, players[playerId].y, players[playerId].size, players[playerId].size);

    };

    for (const fruitId in fruits) {
        ctx.fillStyle = fruits[fruitId].color;
        ctx.fillRect(fruits[fruitId].x, fruits[fruitId].y, fruits[fruitId].size, fruits[fruitId].size);
    }
};