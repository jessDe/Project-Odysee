const JREnemySpriteSheet = new Image()
JREnemySpriteSheet.src = "src/img/jumpAndRunEnemies.png";

const SpriteSize = 32
const FrameTime = 0.1


class JREnemy{
    constructor(x,y, type){
        this.position = {
            x: x,
            y: y
        }
        this.type = type
        this.frame = 0
    }
    draw(frameTime){
        if(frameTime > FrameTime){
            this.frame++
        }
        ctx.drawImage(
            JREnemySpriteSheet,
            this.frame * SpriteSize,
            this.type * SpriteSize,
            SpriteSize,
            SpriteSize,
            this.position.x,
            this.position.y,
            SpriteSize,
            SpriteSize
        )
    }
    update(frameTime, playerPosition){
        this.draw(frameTime)
        if(this.position.x < playerPosition.x){
            this.position.x += 1
        }else{
            this.position.x -= 1
        }

    }
}