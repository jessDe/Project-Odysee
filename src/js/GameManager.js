let TD = new TowerDefence();
let GameMode = 2;

let MenuButton = new Image();
MenuButton.src = "src/img/MenuButton.png";

class MainMenu{
    constructor(){
    }
    Draw(){
        if(fontLoaded){
            ctx.fillStyle = "white";
            ctx.font = "200px PixelFont";
            ctx.fillText("Project", ctx.canvas.width/2 - 350, ctx.canvas.height*0.2);
            ctx.fillText("Odysee", ctx.canvas.width/2 - 350, ctx.canvas.height*0.5);
        }
        ctx.drawImage(MenuButton, 0,0,64,64, ctx.canvas.width/2- 100, ctx.canvas.height*0.7, 200,200);
    }
}
let MainMenuObj = new MainMenu();
window.onload = function(){

    if(GameMode === 0){
        document.getElementById("GameBox").style.width = "960px";
        document.getElementById("GameBox").style.height = "540px";
        document.getElementById("Shop").style.display = "none";
        Update();
    }else if(GameMode === 1){

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