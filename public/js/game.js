import { renderScreen } from "./renderer.js";
import { keys } from "./input.js";
import { movePlayer, playerId, onUpdatePlayers, onAddFruits, getNickname } from "./network.js";

let gameStarted = false;
let mute = false;
let currentPlayers = {};
let currentFruits = {};
let oldFruits = {};

const form = document.querySelector("#formUser");
const leaveBtn = document.querySelector("#leaveBtn");
const muteBtn = document.querySelector("#muteBtn");
const musicThema = new Audio("sounds/arcade.mp3");
const collectFruit = new Audio("sounds/fruit_collect.wav");
 

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nickname = document.querySelector("#nickname").value;
    if (nickname) {
        gameStarted = true;
        form.style.display = "none";
        leaveBtn.style.display = "block";
        muteBtn.style.display = "block";
        getNickname(nickname);
        musicThema.loop = true;
        musicThema.volume = 0.2;
        musicThema.play();
    }
});

leaveBtn.addEventListener("click", () => {
    gameStarted = false;
    location.reload();
});

muteBtn.addEventListener("click", () => {
    if (!mute) {
        mute = true
        muteBtn.textContent = '🔇';
        musicThema.muted = true;
        collectFruit.muted = true;
    } else {
        mute = false
        muteBtn.textContent = '🔊';
        musicThema.muted = false;
        collectFruit.muted = false;
    };
});

window.addEventListener("beforeunload", (e) => {
    if (gameStarted) {
        e.preventDefault();
        return "";
    };
});

const scorePlayer = document.querySelector("#scorePlayers");

let updateScoreBoard = (players) => {
    scorePlayer.innerHTML = '';

    const playersSorted = Object.values(players).sort((a,b) => b.score - a.score);
    let numberPlayers = 0;

    for (const player of playersSorted) {
        if (player.nickname) {
            const li = document.createElement("li");
            li.textContent = `${player.nickname}: ${player.score}`;
            scorePlayer.appendChild(li);
            numberPlayers += 1;
        };
    };

    document.getElementById("numberPlayers").textContent = `Number of Players - ${numberPlayers}`;


    if (scorePlayer.children.length === 0) {
        scorePlayer.style.display = "none";
    } else {
        scorePlayer.style.display = "block";
    }
};

onUpdatePlayers((players) => {
    currentPlayers = players;
    renderScreen(currentPlayers, playerId, currentFruits);
    updateScoreBoard(players);
});

onAddFruits((fruits) => {
    oldFruits = currentFruits;
    currentFruits = fruits;
    renderScreen(currentPlayers, playerId, currentFruits);
    if (Object.keys(currentFruits).length < Object.keys(oldFruits).length && gameStarted) {
        collectFruit.currentTime = 0;
        collectFruit.volume = 0.5;
        collectFruit.play();
    };
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

