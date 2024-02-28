let TD = new TowerDefence();
let JumpAndRun = new JumpAndRunEngine();
let GameMode = 2;

let MenuButton = new Image();
MenuButton.src = "src/img/MenuButton.png";

let Title = new Image();
Title.src = "src/img/Title.png";

class MainMenu{
    constructor(){
    }
    Draw(){
        ctx.drawImage(Title, 0,0, 634, 221, ctx.canvas.width/2- 400, ctx.canvas.height*0.1, 800, 300);
        ctx.drawImage(MenuButton, 0,0,64,64, ctx.canvas.width/2- 100, ctx.canvas.height*0.7, 200,200);
    }
}
let MainMenuObj = new MainMenu();
window.onload = function(){
    console.log("Game started"+ GameMode);
    if(GameMode === 0){
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        Update();
    }else if(GameMode === 1){
        JumpAndRun.StartGame();

    }else if(GameMode === 2){
        TD.StartGame();
    }

}






function Update(){
    if(GameMode === 0){
        MainMenuObj.Draw();
    }else if(GameMode === 1){

    }else if(GameMode === 2){

    }
    window.requestAnimationFrame(Update)
}