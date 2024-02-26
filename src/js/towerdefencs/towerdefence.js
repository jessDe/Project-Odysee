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
const waypoints = [
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

class ShopTower {
    constructor(name, price, image){
        this.name = name;
        this.price = price;
        this.image = image;
    }
}


class RoundEnemy {
    constructor(enemy, delay){
        this.enemy = enemy;
        this.delay = delay;
    }
}

class Round {
    constructor(enemies, endReward){
        this.enemies = enemies;
        this.endReward = endReward;
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

const HTMLShop = document.getElementById("Shop");

const Shop = [
    new ShopTower("Sabu Tower", 100, tower1Image),
    new ShopTower("Sabu Tower", 100, tower1Image),
];

const Rounds = [
    new Round(
        [
            new RoundEnemy(new Enemy(100,3, 100), 0),
            new RoundEnemy(new Enemy(100,3, 100), 2),
            new RoundEnemy(new Enemy(100,3, 100), 5),
            new RoundEnemy(new Enemy(100,3, 100), 7),
            new RoundEnemy(new Enemy(100,3, 100), 10),
            new RoundEnemy(new Enemy(100,3, 100), 12),
            new RoundEnemy(new Enemy(100,3, 100), 15),
        ],
        100),
    new Round(
        [
            new RoundEnemy(new Enemy(100,3, 100), 0)
        ],
        100),
];


let MousePos = {
    x: 0,
    y: 0
};
let MouseMode = "none";

//Canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Debug Texts
let gridCordsText = document.getElementById("GridCords");
let debugText = document.getElementById("debugOutput");
let checkbox = document.getElementById("gridToggle");

canvas.style.imageRendering = "pixelated";


//Font
const customFont = new FontFace('PixelFont', 'url(Minecraft.ttf)');
let fontLoaded=false;
customFont.load().then(function(font) {
    document.fonts.add(font);
    fontLoaded=true;
}).catch(function(error) {
    console.log('Font loading failed: ' + error);
});
function calculateMouseGridCord(x, y){
    let gridX = Math.floor(x/20);
    let gridY = Math.floor(y/20);
    MousePos.x = gridX;
    MousePos.y = gridY;
    gridCordsText.innerHTML = "Grid X: " + gridX + " Grid Y: " + gridY;
}

class TowerDefence{
    constructor(){
        this.gridSize = 20;
        this.width = canvas.width;
        this.height = canvas.height;
        this.time = 0;
        this.towers = [];
        this.enemies = [];
        //Game Data
        this.money = 100;
        this.Lives = 100;
        this.CurrentRound = 0;
        this.BlockGrid = [];
        this.showGrid = false;
        this.CurrentPlacingTowerID = 0;
        this.LoadBlockCords();

        this.GameRunning = true;

    }

    LoadBlockCords(){
        for (let i = 0; i < 65; i++) {
            this.BlockGrid[i] = [];
            for (let j = 0; j < 37; j++) {
                this.BlockGrid[i][j] = false;
            }
        }
        blockCords.forEach(cord => {
            this.BlockGrid[cord.x][cord.y] = true;
        });
    }



    Clock() {
        TD.time++;
        console.log(TD.time)
        if(TD.GameRunning){
            setTimeout(TD.Clock, 1000);
        }
    }
    drawMap(){
        ctx.drawImage(mapImage, 0, 0, 1280, 720);
    }
    animate() {
        TD.drawMap();
        if(TD.showGrid){
            TD.drawGrid();
        }
        let i = 0;
        //Round Logic
        if(TD.CurrentRound < Rounds.length){
            if(Rounds[TD.CurrentRound].enemies.length === 0 && TD.enemies.length === 0){
                console.log("Round " + TD.CurrentRound + " finished");
                TD.money += Rounds[TD.CurrentRound].endReward;
                TD.CurrentRound++;
            }
            if(TD.CurrentRound < Rounds.length){
                Rounds[TD.CurrentRound].enemies.forEach((enemy, index) => {
                    if(enemy.delay <= TD.time){
                        console.log("Spawned Enemy");
                        TD.enemies.push(enemy.enemy);
                        Rounds[TD.CurrentRound].enemies.splice(index, 1);
                    }
                });
            }

        }


        //Enemy Logic
        TD.enemies.forEach(enemy => {
            if(enemy.currentHealth <= 0 || enemy.waypointIndex >= waypoints.length){

                if(enemy.currentHealth <= 0){
                    TD.money += enemy.reward;
                }else{
                    TD.Lives -= 1;
                }
                TD.enemies.splice(TD.enemies.indexOf(enemy), 1);
            }
            enemy.update();
            i++;
        });

        let j = 0;
        TD.towers.forEach(tower => {
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
            let image = Shop[TD.CurrentPlacingTowerID].image;
            if (TD.checkTowerCollision() === false){
                ctx.filter = "opacity(0.8)";

                ctx.drawImage(image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
            }else{
                ctx.filter = "opacity(0.2) sepia(10%)";
                ctx.drawImage(image, 0, 0, 40, 80, MousePos.x*20, (MousePos.y-3)*20, 40, 80);
            }
            ctx.filter = "none";

        }
        //Draw Current Money
        ctx.font = "25px PixelFont";
        ctx.fillStyle = "black";
        ctx.fillText("Money: " + TD.money + "$", 12, 22);
        ctx.fillStyle = "white";
        ctx.fillText("Money: " + TD.money + "$", 10, 20);
        if(TD.Lives > 0){
            //Draw Lives
            ctx.fillStyle = "black";
            ctx.fillText("Lives: " + TD.Lives, 12, 52);
            ctx.fillStyle = "white";
            ctx.fillText("Lives: " + TD.Lives, 10, 50);
        }else{
            //TODO: Game Over Screen
            ctx.fillStyle = "black";
            ctx.fillText("Game Over", 12, 52);
            ctx.fillStyle = "white";
            ctx.fillText("Game Over", 10, 50);
        }

        //Draw Current Round
        ctx.fillStyle = "black";
        ctx.fillText("Round: " + (TD.CurrentRound+1), 12, 82);
        ctx.fillStyle = "white";
        ctx.fillText("Round: " + (TD.CurrentRound+1), 10, 80);

        if(TD.GameRunning){
            requestAnimationFrame(TD.animate);
        }

    }
    checkTowerCollision(){
        let isColliding = false;

        if(MousePos.x < 0 || MousePos.x > 62 ){
            isColliding = true;
        }
        let MouseY = MousePos.y-3;
        if(this.BlockGrid[MousePos.x][MousePos.y] === false && this.BlockGrid[MousePos.x][MousePos.y-1] === false && this.BlockGrid[MousePos.x+1][MousePos.y-1] === false && this.BlockGrid[MousePos.x+1][MousePos.y] === false){
            this.towers.forEach(tower => {
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
    placeTower(){

        if(this.checkTowerCollision() === false){
            this.towers.push(new tower(MousePos.x, MousePos.y-3));
            this.towers.sort((a, b) => a.position.y - b.position.y);
            MouseMode = "none";
        }
    }


    drawGrid() {
        ctx.beginPath();
        for (let x = 0; x <= this.width; x += this.gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += this.gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
        }
        ctx.strokeStyle = 'lightgray';
        ctx.stroke();
    }
    buyTower(id){
        if(this.money >= Shop[id].price){
            this.money -= Shop[id].price;
            this.CurrentPlacingTowerID = id;
            MouseMode = "placing";
        }
    }

    registerEvents(){
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                console.log("Checkbox is checked");
                TD.showGrid = true;
            } else {
                console.log("Checkbox is unchecked");
                TD.showGrid = false;
            }
        });

        canvas.addEventListener('click', function() {
            if(MouseMode === "placing"){
                TD.placeTower();

            }else if(MouseMode === "blocking"){
                debugText.innerHTML += "new transform("+MousePos.x+","+MousePos.y+"), ";
                blockCords.push(new transform(MousePos.x, MousePos.y));
            }

        });
    }
    StartGame(){
        Shop.forEach((shopTower, index) => {
            HTMLShop.innerHTML += "<img src='"+shopTower.image.src+"' width='40' height='80' onclick='TD.buyTower("+index+")' alt='Tower'><p class='TowerName'>"+shopTower.name+"</p><p class='TowerPrice'>"+shopTower.price+"$ </p>";
        });
        this.Clock();
        this.animate();
        this.registerEvents();
    }
}

canvas.addEventListener('mousemove', function(event) {
    const mousePos = getMousePos(canvas, event);
    calculateMouseGridCord(mousePos.x, mousePos.y);
});