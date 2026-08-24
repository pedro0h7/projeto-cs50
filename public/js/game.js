import { renderScreen } from "./renderer.js";
import { keys } from "./input.js";
import { movePlayer, playerId, onUpdatePlayers, onAddFruits, getNickname } from "./network.js";

let gameStarted = false;
let currentPlayers = {};
let currentFruits = {};
const canvas = document.querySelector("#gameCanvas");
const form = document.querySelector("#formUser");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nickname = document.querySelector("#nickname").value;
    if (nickname) {
        gameStarted = true;
        form.style.display = "none";
        getNickname(nickname);
    }
});


const scorePlayer = document.querySelector("#scorePlayers");

let updateScoreBoard = (players) => {
    scorePlayer.innerHTML = '';

    const playersSorted = Object.values(players).sort((a,b) => b.score - a.score);

    for (const player of playersSorted) {
        const li = document.createElement("li");
        li.textContent = `${player.nickname}: ${player.score}`;
        scorePlayer.appendChild(li);
    };
};

onUpdatePlayers((players) => {
    currentPlayers = players;
    renderScreen(currentPlayers, playerId, currentFruits);
    updateScoreBoard(players);
});

onAddFruits((fruits) => {
    currentFruits = fruits;
    renderScreen(currentPlayers, playerId, currentFruits);
});

// Create animation loop 
function gameLoop() {
    if (gameStarted) {
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
    }
    
    // Repeat Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();

