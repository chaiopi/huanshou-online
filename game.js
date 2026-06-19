const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 400,
    y: 300,
    size: 40,
    speed: 5
};

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

function update() {

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;
}

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
