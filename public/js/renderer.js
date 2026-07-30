export var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

export function renderScreen(player) {
    // Clear all 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the rectangle
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

}