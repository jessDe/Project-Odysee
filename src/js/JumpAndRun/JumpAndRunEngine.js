class JumpAndRunPlayer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = 0;
    }
}

class JumpAndRunEngine
{
    constructor() {
        this.player = new JumpAndRunPlayer();
        this.mapName = "";
        this.enemies = [];
        this.collectables = [];
        this.map = [];
    }

    draw() {
        let visibleArea = this.visibleArea();

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] !== undefined) {
                    let x = j * 32 - visibleArea.x;
                    let y = i * 32 - visibleArea.y;
                    ctx.fillStyle = "black";
                    ctx.fillRect(x, y, 32, 32);
                }
            }
        }

        ctx.fillStyle = "red";
        ctx.fillRect(this.player.x - visibleArea.x, this.player.y - visibleArea.y, this.player.width, this.player.height);
    }

    update() {
        this.draw();

        requestAnimationFrame(this.update);
    }

    visibleArea() {
        return {
            x: this.player.x - canvas.width / 2,
            y: this.player.y - canvas.width / 2,
            width: canvas.width,
            height: canvas.height
        };
    }

    StartGame() {
        this.update();
    }
}