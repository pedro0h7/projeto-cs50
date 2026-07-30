import { renderScreen, canvas } from "./renderer.js";
import { keys } from "./input.js";

// Create a player
const player = {
    x: 0,
    y: 0,
    size: 15,
    speed: 3,
    color: "yellow"
}

// Create animation loop 
function gameLoop() {
    
    renderScreen(player);
    
    // Update the postion
    if (keys["ArrowUp"]) {
        player.y -= player.speed;
    }
    if (keys["ArrowDown"]) {
        player.y += player.speed;
    }
    if (keys["ArrowRight"]) {
        player.x += player.speed;
    }
    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    // Limit the rectangle
    if (player.x < 0) {
        player.x = 0
    }

    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;
    }

    if (player.y < 0) {
        player.y = 0
    }

    if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size;
    }

    // Repeat Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();

