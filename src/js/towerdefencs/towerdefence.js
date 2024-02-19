class tower {
    constructor(x, y){
        this.position = new transform(x, y);
        this.projectiles = [
            new projectile(this.position.x, this.position.y)
        ];
    }
    draw(ctx){
        ctx.fillStyle = "#00ff00";
        ctx.drawImage(tower1Image, 0, 0, 40, 80, this.position.x*20, this.position.y*20, 40, 80);
    }
}


let BlockGrid = [];
let showGrid = false;
for (let i = 0; i < 65; i++) {
    BlockGrid[i] = [];
    for (let j = 0; j < 37; j++) {
        BlockGrid[i][j] = false;
    }
}



blockCords.forEach(cord => {
    BlockGrid[cord.x][cord.y] = true;
});


let MousePos = {
    x: 0,
    y: 0
};
let MouseMode = "placing";
let CurrentPlacingTowerID = 0;


let canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let gridCordsText = document.getElementById("GridCords");
let debugText = document.getElementById("debugOutput");

canvas.style.imageRendering = "pixelated";
let time = 0;
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
let towers = [];
let enemies = [new Enemy(1000,3)];


// Load map
const mapImage = new Image();
mapImage.src = "src/img/td_desert_bg.png";

const portalImage = new Image();
portalImage.src = "src/img/PortalSpritesheet_261x469.png";

const tower1Image = new Image();
tower1Image.src = "src/img/Tower1.png";

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
    enemies.forEach(enemy => {
        if(enemy.currentHealth <= 0){
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        enemy.update();
        enemy.draw(ctx);
    });

    //Draw from smallest y position to largest

    towers.forEach(tower => {
        tower.draw(ctx);
        if(tower.projectiles.length < 1){
            tower.projectiles.push(new projectile(tower.position.x, tower.position.y));
        }
        tower.projectiles.forEach((projectile, index) => {
            projectile.update();
            if(projectile.target !== null){
                if(projectile.distance< 30){
                    projectile.target.currentHealth -= projectile.damage;
                    tower.projectiles.splice(index, 1);
                }
            }

        });
    });
    //draw Blocked


    if(MouseMode === "placing"){
        //check if Tower is in the way

        if (checkTowerCollision() === false){
            ctx.filter = "opacity(0.8)";
            ctx.drawImage(tower1Image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
        }else{
            ctx.filter = "opacity(0.2) sepia(10%)";
            ctx.drawImage(tower1Image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
        }
        ctx.filter = "none";

    }
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
    }
}
function calculateMouseGridCord(x, y){
    let gridX = Math.floor(x/20);
    let gridY = Math.floor(y/20);
    //console.log("Grid X: " + gridX + " Grid Y: " + gridY);
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
    //console.log('Mouse position on canvas: ' + mousePos.x + ',' + mousePos.y);
});
canvas.addEventListener('click', function(event) {
    if(MouseMode === "placing"){
        placeTower();

    }else if(MouseMode === "blocking"){
        debugText.innerHTML += "new transform("+MousePos.x+","+MousePos.y+"), ";
        blockCords.push(new transform(MousePos.x, MousePos.y));
    }

    console.log('Mouse position on canvas: ' + MousePos.x + ',' + MousePos.y);
});