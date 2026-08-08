import { renderScreen } from "./renderer.js";
import { keys } from "./input.js";
import { movePlayer, playerId, onUpdatePlayers } from "./network.js";

// Create a player
export const player = {
    x: 0,
    y: 0,
    size: 15,
    speed: 3,
    color: "yellow"
}

onUpdatePlayers((players) => {
    renderScreen(players, playerId);
});

// Create animation loop 
function gameLoop() {
    // Update the postion
    if (keys["ArrowUp"]) {
        movePlayer(playerId, "ArrowUp");
    }
    if (keys["ArrowDown"]) {
        movePlayer(playerId, "ArrowDown");
    }
    if (keys["ArrowRight"]) {
        movePlayer(playerId, "ArrowRight");
    }
    if (keys["ArrowLeft"]) {
        movePlayer(playerId, "ArrowLeft");
    }

    // Repeat Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();

