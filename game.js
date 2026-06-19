const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerImg = new Image();
playerImg.src = "assets/1.1idle.gif";


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 地圖大小
const world = {
    width: 2000,
    height: 2000
};

// 玩家
const player = {
    x: 1000,
    y: 1000,
    size: 64,
    speed: 5,
    hp: 100,
    maxHp: 100    
};



// 鏡頭
const camera = {
    x: 0,
    y: 0
};

// 按鍵
const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

// 史萊姆
const slimes = [
    {
        x: 1100,
        y: 1000,
        size: 35,
        hp: 30,
        maxHp: 30,
        speed: 1,
        moveX: 0,
        moveY: 0,
        timer: 0
    },

    {
        x: 900,
        y: 1000,
        size: 35,
        hp: 30,
        maxHp: 30,
        speed: 1,
        moveX: 0,
        moveY: 0,
        timer: 0
    },

    {
        x: 1000,
        y: 1150,
        size: 35,
        hp: 30,
        maxHp: 30,
        speed: 1,
        moveX: 0,
        moveY: 0,
        timer: 0
    }
];

console.log(slimes);


// 更新
function update(){

    // 玩家移動
    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    // 地圖邊界
    player.x = Math.max(
        0,
        Math.min(world.width - player.size, player.x)
    );

    player.y = Math.max(
        0,
        Math.min(world.height - player.size, player.y)
    );

    // 鏡頭跟隨
    camera.x =
        player.x -
        canvas.width / 2 +
        player.size / 2;

    camera.y =
        player.y -
        canvas.height / 2 +
        player.size / 2;

    // 史萊姆AI
    slimes.forEach(slime => {

        slime.x += slime.moveX * slime.speed;
        slime.y += slime.moveY * slime.speed;

        slime.timer++;

        if(slime.timer > 120){

            slime.moveX =
                Math.random() - 0.5;

            slime.moveY =
                Math.random() - 0.5;

            slime.timer = 0;
        }

        slime.x = Math.max(
            0,
            Math.min(world.width - slime.size, slime.x)
        );

        slime.y = Math.max(
            0,
            Math.min(world.height - slime.size, slime.y)
        );

    });

}

// 畫面
function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 地圖
    ctx.fillStyle = "#2d5a27";
    ctx.fillRect(
        -camera.x,
        -camera.y,
        world.width,
        world.height
    );

    // 地圖邊框
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.strokeRect(
        -camera.x,
        -camera.y,
        world.width,
        world.height
    );

    // 史萊姆
    slimes.forEach(slime => {

        // 身體
        ctx.fillStyle = "lime";

        ctx.beginPath();
        ctx.arc(
            slime.x - camera.x,
            slime.y - camera.y,
            slime.size,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // 血條
        ctx.fillStyle = "red";
        ctx.fillRect(
            slime.x - 25 - camera.x,
            slime.y - 50 - camera.y,
            50,
            6
        );

        ctx.fillStyle = "lime";
        ctx.fillRect(
            slime.x - 25 - camera.x,
            slime.y - 50 - camera.y,
            50 * (slime.hp / slime.maxHp),
            6
        );

    });

    
    // 玩家角色
ctx.drawImage(
    playerImg,
    player.x - camera.x,
    player.y - camera.y,
    player.size,
    player.size
);
    

    // 玩家血量UI
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
        `HP: ${player.hp}/${player.maxHp}`,
        20,
        30
    );

}

// 主循環
function gameLoop(){

    update();
    draw();

    requestAnimationFrame(
        gameLoop
    );

}

gameLoop();
