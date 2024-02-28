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
        ctx.drawImage(tower1Image, 0, 0, 18, 48, this.position.x*20, this.position.y*20, 40, 80);
    }
}
const waypoints = [
    {x: -100, y: 620, to: "right"},
    {x: 375, y: 620, to: "right"},
    {x: 375, y: 500, to: "up"},
    {x: 100, y: 500, to: "left"},
    {x: 100, y: 100, to: "up"},
    {x: 620, y: 100, to: "right"},
    {x: 620, y: 620, to: "down"},
    {x: 980, y: 620, to: "right"},
    {x: 980, y: 500, to: "up"},
    {x: 780, y: 500, to: "left"},
    {x: 780, y: 260, to: "up"},
    {x: 940, y: 260, to: "right"},
    {x: 940, y: 100, to: "up"},
    {x: 1095, y: 100, to: "right"},
    {x: 1095, y: 620, to: "down"},
    {x: 1360, y: 620, to: "right"},

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
mapImage.src = "./src/img/td_desert_bg.png";

// Load tower1
const tower1Image = new Image();
tower1Image.src = "./src/img/Tower1.png";

const SunImage = new Image();
SunImage.src = "./src/img/Sun_365x329.png";

//Load Projectile1
const projectile1Image = new Image();
projectile1Image.src = "./src/img/Projectile1.png";


const Enemy1Image = new Image();
Enemy1Image.src = "./src/img/greif_run.png";

const AnimatedLakeImage = new Image();
AnimatedLakeImage.src = "./src/img/new_dessert_lake.png";

const HTMLShop = document.getElementById("Shop");

const MoneyText = document.getElementById("money");
const LivesText = document.getElementById("lives");
const RoundText = document.getElementById("rounds");

const Shop = [
    new ShopTower("Sabu Tower", 100, tower1Image),
    new ShopTower("Sabu Tower", 100, tower1Image),
];

const Rounds = [
    new Round(
        [
            new RoundEnemy(new EnemyTD(100,3, 100), 0),
            new RoundEnemy(new EnemyTD(100,3, 100), 2),
            new RoundEnemy(new EnemyTD(100,3, 100), 5),
            new RoundEnemy(new EnemyTD(100,3, 100), 7),
            new RoundEnemy(new EnemyTD(100,3, 100), 10),
            new RoundEnemy(new EnemyTD(100,3, 100), 12),
            new RoundEnemy(new EnemyTD(100,3, 100), 15),
        ],
        100),
    new Round(
        [
            new RoundEnemy(new EnemyTD(100,3, 100), 0)
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
        this.timeDelta = new Date().getTime();
        this.GameRunning = true;
        this.SunTimer = 0;
        this.SunFrameTime = 0;
        this.LakeFrame = 0;
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



    drawMap(){
        ctx.drawImage(mapImage, 0, 0, 1280, 720);
    }
    animate() {

        let SunFrame = false;

        if (new Date().getTime() - TD.timeDelta > 1000) {
            TD.time++;
            TD.timeDelta = new Date().getTime();
        }

        if (new Date().getTime() - TD.SunFrameTime > 120) {
            SunFrame = true;
            TD.SunFrameTime = new Date().getTime();
        }

        TD.drawMap();


        if(SunFrame){
            TD.LakeFrame++;
            if(TD.LakeFrame > 9){
                TD.LakeFrame = 0;
            }
        }
        //Draw Lake
        ctx.drawImage(AnimatedLakeImage, 224*TD.LakeFrame, 0, 224, 160, 800, 280, 280, 200);


        if (TD.showGrid) {
            TD.drawGrid();
        }
        let i = 0;
        //Round Logic
        if (TD.CurrentRound < Rounds.length) {
            if (Rounds[TD.CurrentRound].enemies.length === 0 && TD.enemies.length === 0) {
                console.log("Round " + TD.CurrentRound + " finished");
                TD.money += Rounds[TD.CurrentRound].endReward;
                TD.CurrentRound++;
            }
            if (TD.CurrentRound < Rounds.length) {
                Rounds[TD.CurrentRound].enemies.forEach((enemy, index) => {
                    if (enemy.delay <= TD.time) {
                        console.log("Spawned Enemy");
                        TD.enemies.push(enemy.enemy);
                        Rounds[TD.CurrentRound].enemies.splice(index, 1);
                    }
                });
            }

        }


        //Enemy Logic
        TD.enemies.forEach(enemy => {
            if (enemy.currentHealth <= 0 || enemy.waypointIndex >= waypoints.length) {

                if (enemy.currentHealth <= 0) {
                    TD.money += enemy.reward;
                } else {
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
                if (projectile.target !== null) {

                    if (projectile.OutOfBounds === true) {
                        tower.projectiles.splice(index, 1);
                    }

                } else {
                    everyProjectileHasTarget = false;
                }


            });
            if (everyProjectileHasTarget && tower.timeSinceLastShot > 5) {
                tower.projectiles.push(new projectile(tower.position.x, tower.position.y));
                tower.timeSinceLastShot = 0;
            }
            tower.timeSinceLastShot++;
            j++;
        });
        //draw Blocked


        if (MouseMode === "placing") {
            //check if Tower is in the way
            let image = Shop[TD.CurrentPlacingTowerID].image;
            if (TD.checkTowerCollision() === false) {
                ctx.filter = "opacity(0.8)";

                ctx.drawImage(image, 0, 0, 18, 48, MousePos.x * 20, (MousePos.y - 3) * 20, 40, 80);
            } else {
                ctx.filter = "opacity(0.2) sepia(10%)";
                ctx.drawImage(image, 0, 0, 18, 48, MousePos.x * 20, (MousePos.y - 3) * 20, 40, 80);
            }
            ctx.filter = "none";

        }


        //Draw Sun
        //The Sun is sometimes just an empty space in the spritesheet
        //The Resolution of the Sun is 6x6 with 32 Frames in total




        if (SunFrame) {
            TD.SunTimer += 1;
            if (TD.SunTimer > 31) {
                TD.SunTimer = 0;
            }
        }
        let SunRow = 0;
        let SunCol = 0;

        if(TD.SunTimer > 30){
            SunRow = 5;
        }else if(TD.SunTimer > 24){
            SunRow = 4;
        }else if(TD.SunTimer > 18){
            SunRow = 3;
        }else if(TD.SunTimer > 12){
            SunRow = 2;
        }else if(TD.SunTimer > 6){
            SunRow = 1;
        }else{
            SunRow = 0;
        }

        SunCol = TD.SunTimer - (SunRow*6)-1;

        if(SunCol === -1){
            SunCol = 0;
            TD.SunTimer++;
        }

        //console.log(SunRow + " " + SunCol);
        ctx.drawImage(SunImage, 365*SunCol, 329*SunRow, 365, 329, -200, -250, 400, 400);



        //Draw UI
        ctx.font = "20px PixelFont";
        ctx.fillStyle = "black";
        ctx.fillText("Money: " + TD.money + "$", 220, ctx.canvas.height-10);
        ctx.fillText("Lives: " + TD.Lives, 110, ctx.canvas.height-10);
        ctx.fillText("Round: " + (TD.CurrentRound+1), 10, ctx.canvas.height-10);



        if(TD.GameRunning){
            requestAnimationFrame(TD.animate);
        }

        if(MouseMode === "blocking"){
            blockCords.forEach(cord => {
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(cord.x*20, cord.y*20, 20, 20);
            });
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
                if(blockCords.some(cord => cord.x === MousePos.x && cord.y === MousePos.y)){
                    blockCords.splice(blockCords.indexOf(blockCords.find(cord => cord.x === MousePos.x && cord.y === MousePos.y)), 1);
                }else {
                    blockCords.push(new transform(MousePos.x, MousePos.y));
                }
            }

        });
    }
    StartGame(){
        Shop.forEach((shopTower, index) => {
            HTMLShop.innerHTML += "<img src='"+shopTower.image.src+"' width='40' height='80' onclick='TD.buyTower("+index+")' alt='Tower'><p class='TowerName'>"+shopTower.name+"</p><p class='TowerPrice'>"+shopTower.price+"$ </p>";
        });
        this.animate();
        this.registerEvents();
    }
}

canvas.addEventListener('mousemove', function(event) {
    const mousePos = getMousePos(canvas, event);
    calculateMouseGridCord(mousePos.x, mousePos.y);
});