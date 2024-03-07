let TD = new TowerDefence();
let JumpAndRun = new JumpAndRunClass(0);
let GameMode = 0;
let World = 0;

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

let MenuButton = new Image();
MenuButton.src = "src/img/MenuButton.png";

let Title = new Image();
Title.src = "src/img/Title.png";


let GateImage = new Image();
GateImage.src = "src/img/Gate.png";


let EyeImage = new Image();
EyeImage.src = "src/img/EyeCentered.png";

let EyeImage2 = new Image();
EyeImage2.src = "src/img/eye.png";

let ArrowImage = new Image();
ArrowImage.src = "src/img/Arrow.png";


/*
    GameMode:
    0 = MainMenu
    1 = JumpAndRun
    2 = TowerDefence

    MainMenuMode:
    0 = MainMenu
    1 = Tutorial
    2 = LevelSelect
 */

class MainMenu{
    constructor(){
        this.RegisterEvents();
        this.MainMenuMode = 0;
        this.Transition = 0;
        this.frame = 0;
    }
    Draw(){
        this.frame -= 0.175;
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


        }

    }

    RegisterEvents(){
        ctx.canvas.addEventListener("click", function(event){
            if(MainMenuObj.MainMenuMode === 0){
                if(MousePos.x >= 26 && MousePos.x <= 36){
                    if(MousePos.y >= 25 && MousePos.y <= 35){
                        MainMenuObj.MainMenuMode = 2;
                    }
                }
            }else if(MainMenuObj.MainMenuMode === 2){

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
                        GameMode = 1;
                        console.log("GameMode: "+GameMode);
                    }
                }
            }

        });
    }
}
let MainMenuObj = new MainMenu();
window.onload = function(){
    loadedImages.forEach(function(image){
        image.Center.src = images[loadedImages.indexOf(image)].Center;
        image.Outer.src = images[loadedImages.indexOf(image)].Outer;
        image.Gate.src = images[loadedImages.indexOf(image)].Gate;
    });

    console.log("Game started"+ GameMode);
    if(GameMode === 0){
        document.body.style.background = "#212121";
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        document.getElementById("debugText").style.display = "none";
        document.getElementById("myCanvas").style.background = "#000000"
        Update();
    }else if(GameMode === 1){
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        document.body.style.background = "#1c001f";
        JumpAndRun.Start();

    }else if(GameMode === 2){
        document.body.style.backgroundImage = "url('src/img/bg_egypt01.png')";
        document.getElementById("debugText").style.display = "block";
        TD.StartGame();
    }

}

let LastGameMode = 0;




function Update(){
    EyeImage.src = images[World].Outer;
    EyeImage2.src = images[World].Center;
    GateImage.src = images[World].Gate;

    if(GameMode === 0){
        MainMenuObj.Draw();

    }else if(GameMode === 1){

    }else if(GameMode === 2){

    }

    if(LastGameMode !== GameMode){
        if(GameMode === 0){
            document.body.style.background = "#212121";
            document.getElementById("GameBox").style.width = "960px";
            document.getElementById("GameBox").style.height = "540px";
            document.getElementById("Shop").style.display = "none";
            document.getElementById("debugText").style.display = "none";
            document.getElementById("myCanvas").style.background = "#000000"
        }else if(GameMode === 1){
            document.body.style.background = "#65006e";
            document.getElementById("GameBox").style.width = "960px";
            document.getElementById("GameBox").style.height = "540px";
            document.getElementById("Shop").style.display = "none";
            JumpAndRun.Start();

        }else if(GameMode === 2){
            document.body.style.backgroundImage = "url('src/img/bg_egypt01.jpg')";
            document.getElementById("debugText").style.display = "block";
            document.getElementById("Shop").style.display = "block";
            document.getElementById("GameBox").style.width = "1100px";


            TD.StartGame();
        }
        LastGameMode = GameMode;
    }
    window.requestAnimationFrame(Update)
}