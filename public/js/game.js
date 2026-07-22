var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Create a player
const player = {
    x: 0,
    y: 0,
    size: 15,
    speed: 5,
    color: "yellow"
}

// Create the object keys and two events of keyboard
const keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
})

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
})

// Create animation loop 
function gameLoop() {
    // Clear all 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    if (player.y + player.size> canvas.height) {
        player.y = canvas.height - player.size;
    }

    // Draw the rectangle
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Repeat Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();

