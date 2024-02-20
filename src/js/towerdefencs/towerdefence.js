class tower {
    constructor(x, y){
        this.position = new transform(x, y);
        this.projectileImage = projectile1Image;
        this.timeSinceLastShot = 0;
        this.projectiles = [
            new projectile(this.position.x, this.position.y,this.projectileImage)
        ];
    }
    draw(ctx){
        ctx.fillStyle = "#00ff00";
        ctx.drawImage(tower1Image, 0, 0, 40, 80, this.position.x*20, this.position.y*20, 40, 80);
    }
}


// Load map
const mapImage = new Image();
mapImage.src = "src/img/td_desert_bg.png";

// Load tower1
const tower1Image = new Image();
tower1Image.src = "src/img/Tower1.png";

//Load Projectile1
const projectile1Image = new Image();
projectile1Image.src = "src/img/Projectile1.png";

class ShopTower {
    constructor(name, price, image){
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const Shop = [
    new ShopTower("Sabu Tower", 100, tower1Image),
    new ShopTower("Sabu Tower", 100, tower1Image),
];
const HTMLShop = document.getElementById("Shop");
Shop.forEach((shopTower, index) => {
    HTMLShop.innerHTML += "<img src='"+shopTower.image.src+"' width='40' height='80' onclick='buyTower("+index+")'><p class='TowerName'>"+shopTower.name+"</p><p class='TowerPrice'>"+shopTower.price+"$ </p>";
});

let BlockGrid = [];
let showGrid = false;
//Generates the grid
for (let i = 0; i < 65; i++) {
    BlockGrid[i] = [];
    for (let j = 0; j < 37; j++) {
        BlockGrid[i][j] = false;
    }
}


let money = 100;


//Apply blocked grid
blockCords.forEach(cord => {
    BlockGrid[cord.x][cord.y] = true;
});

//Mouse Position
let MousePos = {
    x: 0,
    y: 0
};

//Mouse Mode
let MouseMode = "none";

//Tower Type ID
let CurrentPlacingTowerID = 0;

//Canvas
let canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Debug Texts
let gridCordsText = document.getElementById("GridCords");
let debugText = document.getElementById("debugOutput");

canvas.style.imageRendering = "pixelated";

//Time
let time = 0;

//Enemy Waypoints
let waypoints = [
    {x: -100, y: 643, to: "right"},
    {x: 375, y: 643, to: "right"},
    {x: 375, y: 535, to: "up"},
    {x: 125, y: 535, to: "left"},
    {x: 125, y: 115, to: "up"},
    {x: 625, y: 115, to: "right"},
    {x: 625, y: 640, to: "down"},
    {x: 990, y: 640, to: "right"},
    {x: 990, y: 535, to: "up"},
    {x: 825, y: 535, to: "left"},
    {x: 825, y: 270, to: "up"},
    {x: 925, y: 270, to: "right"},
    {x: 925, y: 110, to: "up"},
    {x: 1095, y: 110, to: "right"},
    {x: 1095, y: 635, to: "down"},
    {x: 1360, y: 635, to: "right"},

];

//Current Towers
let towers = [];

//Current Enemies
let enemies = [new Enemy(1000,3)];




// Load font
var customFont = new FontFace('PixelFont', 'url(Minecraft.ttf)');
customFont.load().then(function(font) {
    document.fonts.add(font);
    Clock();
    animate()
}).catch(function(error) {
    console.log('Font loading failed: ' + error);
});

//Clock function
function Clock() {
    time++;
    setTimeout(Clock, 1000);
}

//Updates the Game Screen
function animate() {
    drawMap();
    if(showGrid){
        drawGrid();
    }
    let i = 0;
    enemies.forEach(enemy => {
        if(enemy.currentHealth <= 0 || enemy.waypointIndex >= waypoints.length){
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        enemy.update();
        i++;
    });

    //Draw from smallest y position to largest
    debugText.innerHTML = "Projectiles: ";
    let j = 0;
    towers.forEach(tower => {
        tower.draw(ctx);
        let everyProjectileHasTarget = true;
        tower.projectiles.forEach((projectile, index) => {

            projectile.update();
            if(projectile.target !== null){

                if(projectile.OutOfBounds === true){
                    tower.projectiles.splice(index, 1);
                }

            }else{
                everyProjectileHasTarget = false;
            }


        });
        if(everyProjectileHasTarget && tower.timeSinceLastShot > 5){
            tower.projectiles.push(new projectile(tower.position.x, tower.position.y));
            tower.timeSinceLastShot = 0;
        }
        tower.timeSinceLastShot++;
        j++;
    });
    //draw Blocked


    if(MouseMode === "placing"){
        //check if Tower is in the way
        let image = Shop[CurrentPlacingTowerID].image;
        if (checkTowerCollision() === false){
            ctx.filter = "opacity(0.8)";

            ctx.drawImage(image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
        }else{
            ctx.filter = "opacity(0.2) sepia(10%)";
            ctx.drawImage(image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
        }
        ctx.filter = "none";

    }

    ctx.font = "25px PixelFont";
    ctx.fillStyle = "black";
    ctx.fillText("Money: " + money + "$", 12, 22);
    ctx.fillStyle = "white";
    ctx.fillText("Money: " + money + "$", 10, 20);

    requestAnimationFrame(animate);

}

function checkTowerCollision(){
    let isColliding = false;

    if(MousePos.x < 0 || MousePos.x > 62 ){
        isColliding = true;
    }
    let MouseY = MousePos.y-3;
    if(BlockGrid[MousePos.x][MousePos.y] === false && BlockGrid[MousePos.x][MousePos.y-1] === false && BlockGrid[MousePos.x+1][MousePos.y-1] === false && BlockGrid[MousePos.x+1][MousePos.y] === false){
        towers.forEach(tower => {
            if(
                (MousePos.x === tower.position.x && MouseY === tower.position.y) ||
                (MousePos.x === tower.position.x+1 && MouseY === tower.position.y) ||
                (MousePos.x === tower.position.x && MouseY === tower.position.y-1) ||
                (MousePos.x === tower.position.x+1 && MouseY === tower.position.y-1) ||
                (MousePos.x === tower.position.x-1 && MouseY === tower.position.y) ||
                (MousePos.x === tower.position.x-1 && MouseY === tower.position.y-1) ||
                (MousePos.x === tower.position.x && MouseY === tower.position.y+1) ||
                (MousePos.x === tower.position.x+1 && MouseY === tower.position.y+1) ||
                (MousePos.x === tower.position.x-1 && MouseY === tower.position.y+1)
            ){
                isColliding = true;
            }
        });
    }else{
        isColliding = true;
    }
    return isColliding;
}

function placeTower(){

    if(checkTowerCollision() === false){
        towers.push(new tower(MousePos.x, MousePos.y-3));
        towers.sort((a, b) => a.position.y - b.position.y);
        MouseMode = "none";
    }
}
function calculateMouseGridCord(x, y){
    let gridX = Math.floor(x/20);
    let gridY = Math.floor(y/20);
    MousePos.x = gridX;
    MousePos.y = gridY;
    gridCordsText.innerHTML = "Grid X: " + gridX + " Grid Y: " + gridY;
}

// Draw map
function drawMap(){
    ctx.drawImage(mapImage, 0, 0, 1280, 720);
}

const gridSize = 20;
const width = canvas.width;
const height = canvas.height;

function drawGrid() {
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.strokeStyle = 'lightgray';
    ctx.stroke();
}
let checkbox = document.getElementById("gridToggle");
checkbox.addEventListener("change", function() {
    if (this.checked) {
        console.log("Checkbox is checked");
        showGrid = true;
    } else {
        console.log("Checkbox is unchecked");
        showGrid = false;
    }
});
canvas.addEventListener('mousemove', function(event) {
    const mousePos = getMousePos(canvas, event);
    calculateMouseGridCord(mousePos.x, mousePos.y);
});
canvas.addEventListener('click', function(event) {
    if(MouseMode === "placing"){
        placeTower();

    }else if(MouseMode === "blocking"){
        debugText.innerHTML += "new transform("+MousePos.x+","+MousePos.y+"), ";
        blockCords.push(new transform(MousePos.x, MousePos.y));
    }

});

function buyTower(id){
    if(money >= Shop[id].price){
        money -= Shop[id].price;
        CurrentPlacingTowerID = id;
        MouseMode = "placing";
    }
}