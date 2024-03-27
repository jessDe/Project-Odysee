
// Load Images
const tower1Image = new Image();
tower1Image.src = "./src/img/TD/Tower1.png";

const SunImage = new Image();
SunImage.src = "./src/img/TD/Sun_365x329.png";


const projectile1Image = new Image();
projectile1Image.src = "./src/img/TD/projectile1.png";


const Enemy1Image = new Image();
Enemy1Image.src = "./src/img/TD/greif_run.png";

const AnimatedLakeImage = new Image();
AnimatedLakeImage.src = "./src/img/TD/new_dessert_lake.png";



//Global Variables
const HTMLShop = document.getElementById("Shop");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.style.imageRendering = "pixelated";


//Mouse Position Update Event
canvas.addEventListener('mousemove', function(event) {
    const mousePos = getMousePos(canvas, event);
    calculateMouseGridCord(mousePos.x, mousePos.y);
});


//Tower Defence Shop
const TDShop = [
    new ShopTower("Sabu Tower", 50, tower1Image),
    new ShopTower("Sinal Tower", 100, tower1Image),
];

//Mouse Pos Variable
let MousePos = {
    x: 0,
    y: 0
};

//Mouse Mode (What the mouse currently does in TD)
let MouseMode = "none";

//Debug Texts
let gridCordsText = document.getElementById("GridCords");
let debugText = document.getElementById("debugOutput");
let checkbox = document.getElementById("gridToggle");



//Calculate Mouse Grid Cords
function calculateMouseGridCord(x, y){
    let gridX = Math.floor(x/20);
    let gridY = Math.floor(y/20);
    MousePos.x = gridX;
    MousePos.y = gridY;
    gridCordsText.innerHTML = "Grid X: " + gridX + " Grid Y: " + gridY;
}


//Tower Defence Game
class TowerDefence{
    constructor(Level){
        this.Level = Level;
        this.gridSize = 20;
        this.width = canvas.width;
        this.height = canvas.height;
        this.time = 0;
        this.towers = [];
        this.enemies = [];
        this.money = 100;
        this.Lives = 100;
        this.CurrentRound = 0;
        this.BlockGrid = [];
        this.showGrid = false;
        this.CurrentPlacingTowerID = 0;
        this.LoadBlockCords();
        this.timeDelta = new Date().getTime();
        this.GameRunning = false;
        this.SunTimer = 0;
        this.SunFrameTime = 0;
        this.LakeFrame = 0;
        this.pausescreen = false;
        this.GameEnded = false;
        this.Rounds = this.GenerateRounds();
        TDLevels[this.Level].mapImage.src = TDLevels[this.Level].mapImageSrc;
    }

    //Load Block Cords from Level
    LoadBlockCords(){
        for (let i = 0; i < 65; i++) {
            this.BlockGrid[i] = [];
            for (let j = 0; j < 37; j++) {
                this.BlockGrid[i][j] = false;
            }
        }
        TDLevels[this.Level].map.blockCords.forEach(cord => {
            this.BlockGrid[cord.x][cord.y] = true;
        });
    }

    //Key Event
    clickevent(key){
        if(key === 66 && debug){
            //B - Only when Debug mode is enabled
            if(MouseMode === "blocking"){
                MouseMode = "none";
            }else{
                MouseMode = "blocking";
            }
        }else if(key === 27){
            //ESC Toggles Pause Menu
            if(TD.GameRunning === true){
                TD.GameRunning = false;

                setTimeout(() => {
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = "30px PixelFont";
                    ctx.fillStyle = "white";
                    ctx.fillText("Paused", canvas.width/2-50, canvas.height/2);
                    ctx.fillText("Press ESC to continue", canvas.width/2-150, canvas.height/2+50);
                }, 50);
                TD.pausescreen = true;
            }else{
                TD.GameRunning = true;
                TD.animate();
                TD.pausescreen = false;
            }

        }
    }
    //Draw Map
    drawMap(){
        ctx.drawImage(TDLevels[TD.Level].mapImage, 0, 0, 1280, 720);
    }

    //All Game Logic
    animate() {
        let SunFrame = false;

        //Time Delta
        if (new Date().getTime() - TD.timeDelta > 1000) {
            TD.time++;
            TD.timeDelta = new Date().getTime();
        }

        //Sun Frame
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
        if (TD.CurrentRound < TD.Rounds.length) {
            if (TD.Rounds[TD.CurrentRound].enemies.length === 0 && TD.enemies.length === 0) {
                TD.money += TD.Rounds[TD.CurrentRound].endReward;
                TD.CurrentRound++;

                TD.time = 0;
            }
            if (TD.CurrentRound < TD.Rounds.length) {
                TD.Rounds[TD.CurrentRound].enemies.forEach((enemy, index) => {
                    if (enemy.delay <= TD.time) {
                        TD.enemies.push(enemy.enemy);
                        TD.Rounds[TD.CurrentRound].enemies.splice(index, 1);
                    }
                });
            }

        }


        //Enemy Logic
        TD.enemies.forEach(enemy => {
            if (enemy.currentHealth <= 0 || enemy.waypointIndex >= TDLevels[TD.Level].map.waypoints.length) {

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

        //Tower Logic
        TD.towers.forEach(tower => {
            tower.draw(ctx);
            let everyProjectileHasTarget = true;
            tower.projectiles.forEach((projectile, index) => {
                //Projectile Logic

                projectile.update();
                if (projectile.target !== null) {

                    if (projectile.OutOfBounds === true) {
                        tower.projectiles.splice(index, 1);
                    }

                } else {
                    everyProjectileHasTarget = false;
                }


            });
            if (everyProjectileHasTarget && tower.timeSinceLastShot > tower.TimeBetweenShots) {
                tower.projectiles.push(new projectile(tower.position.x, tower.position.y, tower.projectileDamage, tower.projectilespeed));
                tower.timeSinceLastShot = 0;
            }
            tower.timeSinceLastShot++;
            j++;
        });

        //Placing Tower
        if (MouseMode === "placing") {
            //check if Tower is in the way
            let image = TDShop[TD.CurrentPlacingTowerID].image;
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

        //Update Sun Row and Col
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
        ctx.drawImage(SunImage, 365*SunCol, 329*SunRow, 365, 329, -200, -250, 400, 400);



        //Draw UI
        ctx.font = "20px PixelFont";
        ctx.fillStyle = "black";
        ctx.fillText("Money: " + TD.money + "$", 220, ctx.canvas.height-10);
        ctx.fillText("Lives: " + TD.Lives, 110, ctx.canvas.height-10);
        ctx.fillText("Round: " + (TD.CurrentRound+1), 10, ctx.canvas.height-10);

        //Check if Game Ended Or Running
        if(TD.GameRunning){
            requestAnimationFrame(TD.animate);
        }else if(TD.GameEnded){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px PixelFont";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over", canvas.width/2-50, canvas.height/2);
            //press esc to continue
            ctx.fillText("Press ESC to return to Level Select", canvas.width/2-200, canvas.height/2+50);
        }
        //Draw Blocking Cords
        if(MouseMode === "blocking"){
            TDLevels[TD.Level].map.blockCords.forEach(cord => {
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(cord.x*20, cord.y*20, 20, 20);
            });
        }


    }

    //Checks if Tower is colliding with another Tower or Blockcords
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

    //Adds Tower to Tower Array
    placeTower(){

        if(this.checkTowerCollision() === false){
            if(this.money >= TDShop[this.CurrentPlacingTowerID].price){
                this.money -= TDShop[this.CurrentPlacingTowerID].price;
                this.towers.push(new tower(MousePos.x, MousePos.y-3));
                this.towers.sort((a, b) => a.position.y - b.position.y);
                MouseMode = "none";
            }else{
                console.log("Not enough money");
                MouseMode = "none";
            }
        }
    }


    //Draws Grid
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

    //Select Tower for placing
    buyTower(id){
        this.CurrentPlacingTowerID = id;
        MouseMode = "placing";

    }

    //Register Events
    registerEvents(){


        // Attach the event listener to the window
        window.addEventListener('blur', function (){
            if(TD.GameRunning){
                TD.GameRunning = false;
            }

        });

        window.addEventListener('focus', function (){
            if(TD.GameRunning === false && TD.pausescreen === false){
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = "30px PixelFont";
                ctx.fillStyle = "white";
                ctx.fillText("Paused", canvas.width/2-50, canvas.height/2);
                //press esc to continue
                ctx.fillText("Press ESC to continue", canvas.width/2-150, canvas.height/2+50);
                TD.pausescreen = true;
            }
        });
        //Grid Toggle
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                TD.showGrid = true;
            } else {
                TD.showGrid = false;
            }
        });
        //Mouse Click Event
        canvas.addEventListener('click', function() {
            if(TD.GameRunning){
                if(MouseMode === "placing"){
                    TD.placeTower();

                }else if(MouseMode === "blocking"){
                    if(TDLevels[TD.Level].map.blockCords.some(cord => cord.x === MousePos.x && cord.y === MousePos.y)){
                        TDLevels[TD.Level].map.blockCords.splice(TDLevels[TD.Level].map.blockCords.indexOf(TDLevels[TD.Level].map.blockCords.find(cord => cord.x === MousePos.x && cord.y === MousePos.y)), 1);
                    }else {
                        TDLevels[TD.Level].map.blockCords.push(new transform(MousePos.x, MousePos.y));
                    }
                }
            }


        });
    }

    //Starts the Game
    StartGame(){
        if(TD.GameRunning === false){

            TDShop.forEach((shopTower, index) => {
                HTMLShop.innerHTML += "<img src='"+shopTower.image.src+"' width='40' height='80' onclick='TD.buyTower("+index+")' alt='Tower'><p class='TowerName'>"+shopTower.name+"</p><p class='TowerPrice'>"+shopTower.price+"$ </p>";
            });
            TD.GameRunning = true;
            this.animate();
            this.registerEvents();

        }
    }

    //Generates Rounds Enemies
    generateRoundEnemies(roundNumber) {
        let enemies = [];
        let numEnemies = 10*roundNumber; // Increase number of enemies with each round
        for (let i = 0; i < numEnemies; i++) {
            let health = 150 + roundNumber * 50 + 10*i; // Increase health with each round
            let speed = 3 + roundNumber * 0.1; // Increase speed with each round
            let delay = i * 2 - roundNumber*0.1; // Delay of 2 seconds between each ENEMY
            enemies.push(new RoundEnemy(new EnemyTD(health, speed, 5*roundNumber, 0), delay));
        }
        return enemies;
    }

    //Generates Rounds (100 Rounds in total)
    GenerateRounds(){
        let rounds = [];
        for (let i = 0; i < 100; i++) {
            rounds.push(new Round(
                this.generateRoundEnemies(i),
                100*i*(3/4)));
        }
        return rounds;
    }
}

