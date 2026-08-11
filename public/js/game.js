import { renderScreen } from "./renderer.js";
import { keys } from "./input.js";
import { movePlayer, playerId, onUpdatePlayers, onAddFruits } from "./network.js";

let currentPlayers = {};
let currentFruits = {};

onUpdatePlayers((players) => {
    currentPlayers = players;
    renderScreen(currentPlayers, playerId, currentFruits);
});

onAddFruits((fruits) => {
    currentFruits = fruits;
    renderScreen(currentPlayers, playerId, currentFruits);
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

