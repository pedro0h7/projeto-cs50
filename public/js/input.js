// Create the object keys and two events of keyboard
export const keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
})

document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
})

