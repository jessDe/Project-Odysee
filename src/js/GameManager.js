
//Global Variables

//Tower Defence Instance
let TD = new TowerDefence(0);

//JumpAndRun Instance
let JumpAndRun = new JumpAndRunClass(1);



//Current Gamemode 0 = MainMenu, 1 = JumpAndRun, 2 = TowerDefence
let GameMode = 0;
let LastGameMode = 0;


//Selected World for Level Select
let World = 0;

//If user is Selecting a Level
let selectingLevel = false;

//Debug Mode
const debug = false;






//Font
const customFont = new FontFace('PixelFont', 'url(Minecraft.ttf)');
let fontLoaded=false;
customFont.load().then(function(font) {
    document.fonts.add(font);
    fontLoaded=true;
}).catch(function(error) {
    console.log('Font loading failed: ' + error);
});


//Image Sources
let images = [
    {
        Center: "src/img/eye.png",
        Outer: "src/img/EyeCentered.png",
        Gate: "src/img/Gate.png"
    },
    {
        Center: "src/img/Mitte.png",
        Outer: "src/img/World2.png",
        Gate: "src/img/Gate2.png"
    }
];

//Loaded Images
let loadedImages = [
    {
        Center: new Image(),
        Outer: new Image(),
        Gate: new Image()
    },
    {
        Center: new Image(),
        Outer: new Image(),
        Gate: new Image()
    }

];

//Save Data Defaults
let Unlocks = [
    {
        World: 1,
        Unlock: {
            Level2: false,
            Level3: false
        },
        Highscore: [
          NaN, NaN, NaN
        ],
        unlocked: false
    },
    {
        World: 2,
        Unlock: {
            Level2: false,
            Level3: false
        },
        Highscore: [
            NaN, NaN, NaN
        ],
        unlocked: false
    }
]

//Images

let MenuButton = new Image();
MenuButton.src = "src/img/MenuButton.png";

let Title = new Image();
Title.src = "src/img/Title.png";

let ArrowImage = new Image();
ArrowImage.src = "src/img/Arrow.png";

let lockImage = new Image();
lockImage.src = "src/img/locked.png";


//MainMenu
class MainMenu{
    constructor(){
        this.RegisterEvents();
        /*
            MainMenuMode:
                0 = MainMenu
                1 = Tutorial
                2 = LevelSelect
        */
        this.MainMenuMode = 0;
        this.Transition = 0;
        this.frame = 0;
    }
    Draw(){
        this.frame -= 0.175;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        if(this.MainMenuMode === 0){
            ctx.drawImage(Title, 0,0, 634, 221, ctx.canvas.width/2- 400, ctx.canvas.height*0.1, 800, 300);
            ctx.drawImage(MenuButton, 0,0,64,64, ctx.canvas.width/2- 100, ctx.canvas.height*0.7, 200,200);
        }else if(this.MainMenuMode === 2){


            //Rotate Outer Eye
            let imageX = ctx.canvas.width/2-15 - 250;
            let imageY = ctx.canvas.height/2-10 -250;

            ctx.translate(imageX + 250, imageY + 250);
            ctx.rotate(this.frame * Math.PI / 180);
            ctx.drawImage(loadedImages[World].Outer, -250, -250, 500, 500);
            ctx.rotate(-this.frame * Math.PI / 180);
            ctx.translate(-(imageX + 250), -(imageY + 250));

            //Rotate Inner Eye
            let imageX2 = ctx.canvas.width/2 - 150;
            let imageY2 = ctx.canvas.height/2 -172;
            ctx.translate(imageX2 + 130, imageY2 + 130);
            ctx.rotate(this.frame * Math.PI / 180);
            ctx.drawImage(loadedImages[World].Outer, -130, -130, 260, 260);
            ctx.rotate(-this.frame * Math.PI / 180);
            ctx.translate(-(imageX2 + 130), -(imageY2 + 130));


            //Removes Overflow of Gate
            ctx.clearRect(0,0,500,700);
            ctx.clearRect(0,0,1280,150);
            ctx.clearRect(725,0,1280,800);
            ctx.clearRect(0,600,1280,150);


            //Draws Gate
            ctx.drawImage(loadedImages[World].Center, ctx.canvas.width/2 - 52,ctx.canvas.height/2 -75,70,70);
            ctx.drawImage(loadedImages[World].Gate, ctx.canvas.width/2 - 290,ctx.canvas.height/2 -300,580,600);


            //Draws Arrows if not Selecting Level
            if(!selectingLevel){
                //Draws Arrow
                if(World < images.length-1){
                    ctx.drawImage(ArrowImage, ctx.canvas.width/2 +300,ctx.canvas.height/2 - 50,50,100);
                }


                //Draw fliped Arrow
                if(World > 0){
                    ctx.translate(ctx.canvas.width/2 - 250, ctx.canvas.height/2 + 50);
                    ctx.rotate(Math.PI);
                    ctx.drawImage(ArrowImage, 0,0,50,100);
                    ctx.rotate(-Math.PI);
                    ctx.translate(-(ctx.canvas.width/2 + -250), -(ctx.canvas.height/2 + 50));
                }
                if(!Unlocks[World].unlocked){
                    ctx.clearRect(canvas.width/2-140,110,223, canvas.height/2+119);
                    ctx.drawImage(lockImage, canvas.width/2 - 105, canvas.height/2 - 75, 150,150);
                }
            }else{
                //Draw Level Select
                //make a grey overlay
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0,0,canvas.width, canvas.height);

                ctx.fillStyle = "white";
                ctx.font = "30px PixelFont";
                ctx.fillText("Select Level", ctx.canvas.width/2 - 100, 50);



                //Level 1
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(canvas.width/2-400, canvas.height/2 - 100, 200, 200);

                ctx.font = "50px PixelFont";
                ctx.fillStyle = "white";
                ctx.fillText("Level 1", canvas.width/2-380, canvas.height/2 + 150);

                if(Unlocks[World].Highscore[0] !== 0 && Unlocks[World].Highscore[0] !== null){
                    ctx.fillStyle = "white";
                    ctx.font = "20px PixelFont";
                    ctx.fillText("Time: " + Unlocks[World].Highscore[0]+"s", canvas.width/2-380, canvas.height/2 + 200);
                }


                //Level 2
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(canvas.width/2-100, canvas.height/2 - 100, 200, 200);

                ctx.font = "50px PixelFont";
                ctx.fillStyle = "white";
                ctx.fillText("Level 2", canvas.width/2-80, canvas.height/2 + 150);

                if(Unlocks[World].Highscore[1] !== 0 && Unlocks[World].Highscore[1] !== null){
                    ctx.fillStyle = "white";
                    ctx.font = "20px PixelFont";
                    ctx.fillText("Time: " + Unlocks[World].Highscore[1]+"s", canvas.width/2-80, canvas.height/2 + 200);
                }
                if(!Unlocks[World].Unlock.Level2){
                    ctx.drawImage(lockImage, canvas.width/2-75, canvas.height/2 - 75, 150, 150);


                }

                //Level 3
                ctx.fillStyle = "#ff0000";
                ctx.fillRect(canvas.width/2+200, canvas.height/2 - 100, 200, 200);

                ctx.font = "50px PixelFont";
                ctx.fillStyle = "white";
                ctx.fillText("Level 3", canvas.width/2+220, canvas.height/2 + 150);

                if(Unlocks[World].Highscore[2] !== 0 && Unlocks[World].Highscore[2] !== null){
                    ctx.fillStyle = "white";
                    ctx.font = "20px PixelFont";
                    ctx.fillText("Max Level: " + Unlocks[World].Highscore[2], canvas.width/2+220, canvas.height/2 + 200);
                }
                if(!Unlocks[World].Unlock.Level3){
                    ctx.drawImage(lockImage, canvas.width/2+225, canvas.height/2 - 75, 150, 150);


                }


            }



        }

    }

    //Register Events
    RegisterEvents(){
        ctx.canvas.addEventListener("click", function(event){
            //Checks for Main Menu Interactions
            if(MainMenuObj.MainMenuMode === 0){
                if(MousePos.x >= 26 && MousePos.x <= 36){
                    if(MousePos.y >= 25 && MousePos.y <= 35){
                        if(Unlocks[0].unlocked){
                            MainMenuObj.MainMenuMode = 2;
                        }else{
                            JumpAndRun = new JumpAndRunClass(0);
                            GameMode = 1;
                        }
                    }
                }
            }else if(MainMenuObj.MainMenuMode === 2){
                if(!selectingLevel){
                    if(MousePos.x >= 47 && MousePos.x <= 49){
                        if(MousePos.y >= 15 && MousePos.y <= 19){
                            if(World < images.length-1){
                                World++;
                            }
                        }
                    }

                    if(MousePos.x >= 17 && MousePos.x <= 19){
                        if(MousePos.y >= 15 && MousePos.y <= 19){
                            if(World > 0){
                                World--;
                            }
                        }
                    }


                    //Door
                    if(MousePos.x >= 23 && MousePos.x <= 37){
                        if(MousePos.y >= 3 && MousePos.y <= 28){
                            //Door Clicked
                            if(Unlocks[World].unlocked){
                                selectingLevel = true;
                            }
                        }
                    }
                }else{
                    //Level Select

                    if(MousePos.x >= 12 && MousePos.x <= 21 && MousePos.y >= 13 && MousePos.y <= 22){
                        //Level 1
                        selectingLevel = false;
                        JumpAndRun = new JumpAndRunClass(1);
                        GameMode = 1;
                        JumpAndRun.Start();
                    }else if(MousePos.x >= 27 && MousePos.x <= 36 && MousePos.y >= 13 && MousePos.y <= 22){
                        if(Unlocks[World].Unlock.Level2){
                            //Level 2
                            selectingLevel = false;
                            JumpAndRun = new JumpAndRunClass(2);
                            GameMode = 1;
                        }else {
                            console.log("Level 2 locked");
                        }
                    }else if(MousePos.x >= 42 && MousePos.x <= 51 && MousePos.y >= 13 && MousePos.y <= 22){
                        if(Unlocks[World].Unlock.Level3){
                            //Level 3
                            selectingLevel = false;
                            TD = new TowerDefence(0);
                            GameMode = 2;
                        }else{
                            console.log("Level 3 locked");
                        }
                    }else{
                        selectingLevel = false;
                    }
                }

            }

        });
    }
}

window.onload = function(){
    if(checkIfCookieExists("Unlocks")){
        Unlocks = JSON.parse(getCookie("Unlocks"));
    }
    loadedImages.forEach(function(image){
        image.Center.src = images[loadedImages.indexOf(image)].Center;
        image.Outer.src = images[loadedImages.indexOf(image)].Outer;
        image.Gate.src = images[loadedImages.indexOf(image)].Gate;
    });

    if(GameMode === 0){
        document.body.style.background = "#212121";
        document.addEventListener('keydown', handleKeyPress);
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        if(!debug){
            document.getElementById("debugText").style.display = "none";
        }

        document.getElementById("myCanvas").style.background = "#000000"
        JumpAndRun = new JumpAndRunClass(0);
        TD = new TowerDefence(0);
    }else if(GameMode === 1){
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        document.body.style.background = "#1c001f";
        JumpAndRun = new JumpAndRunClass(0);    //// <--- Levelwahl
        JumpAndRun.Start();

    }else if(GameMode === 2){
        document.body.style.backgroundImage = "url('src/img/bg_egypt01.png')";
        if(!debug){
            document.getElementById("debugText").style.display = "none";
        }else{
            document.getElementById("debugText").style.display = "block";
        }
        TD.StartGame();
    }
    Update();

}




function Update(){


    if(GameMode === 0){
        MainMenuObj.Draw();

    }
    //Safety Check to not load GameMode multiple times
    if(LastGameMode !== GameMode){

        //Game Mode Switch
        if(GameMode === 0){
            document.body.style.background = "#212121";
            document.getElementById("GameBox").style.width = "960px";
            document.getElementById("GameBox").style.height = "540px";
            document.getElementById("Shop").style.display = "none";
            document.getElementById("debugText").style.display = "none";
            document.getElementById("myCanvas").style.background = "#000000"
            JumpAndRun.GameRunning = false;
        }else if(GameMode === 1){
            document.body.style.background = "#65006e";
            document.getElementById("GameBox").style.width = "960px";
            document.getElementById("GameBox").style.height = "540px";
            document.getElementById("Shop").style.display = "none";
            if(JumpAndRun.GameRunning === false){
                JumpAndRun.Start();
            }
        }else if(GameMode === 2){

            document.body.style.backgroundImage = "url('src/img/TD/bg_egypt01.jpg')";
            document.getElementById("debugText").style.display = "block";
            document.getElementById("Shop").style.display = "block";
            document.getElementById("GameBox").style.width = "1100px";


            TD.StartGame();
        }
        LastGameMode = GameMode;
    }
    window.requestAnimationFrame(Update)
}
function handleKeyPress(event) {
    // Access the key code of the pressed key
    var keyCode = event.keyCode || event.which;

    // Log the key code to the console (you can do something else based on the key code)

    if(GameMode === 0){
        if(keyCode === 27){
            if(selectingLevel){
                selectingLevel = false;
            }
        }
    }else if(GameMode === 2){
        TD.clickevent(keyCode);
    }

}

// Attach the event listener to the document
document.addEventListener('keydown', handleKeyPress);

//Unlock Level
function UnlockLevel(World, Level){
    Unlocks[World].unlocked = true;
    if(Level === 2){
        Unlocks[World].Unlock.Level2 = true;
    }else if(Level === 3){
        Unlocks[World].Unlock.Level3 = true;
    }
    setCookie("Unlocks", JSON.stringify(Unlocks), 365*10);
}

//Set Score

function setScore(World, Level, Score){

    if(Level === 3){
        if(Unlocks[World].Highscore[Level-1] < Score || Unlocks[World].Highscore[Level-1] === null || Unlocks[World].Highscore[Level-1] === 0){
            Unlocks[World].Highscore[Level-1] = Score;
            setCookie("Unlocks", JSON.stringify(Unlocks), 365*10);
        }
    }
    if(Unlocks[World].Highscore[Level-1] > Score || isNaN(Unlocks[World].Highscore[Level-1]) || Unlocks[World].Highscore[Level-1] === null){
        Unlocks[World].Highscore[Level-1] = Score;
        setCookie("Unlocks", JSON.stringify(Unlocks), 365*10);
    }

}

//Main Menu Instance
let MainMenuObj = new MainMenu();