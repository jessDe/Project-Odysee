class projectile {
    constructor(x, y) {
        this.position = new transform(x,y)
        this.velocity = new transform(0,0)
        this.distance = 0
        this.damage = 10
        this.target = null
    }
    draw() {
        ctx.beginPath();
        ctx.arc((this.position.x+1)*20, (this.position.y+1)*20, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw()
        const enemiesInRange = enemies.filter(enemy => {
            const distance = calculateDistance(enemy.position.x, enemy.position.y, this.position.x*20, this.position.y*20)
            this.distance = distance
            return distance < 300
        });
        if(enemiesInRange.length === 0) {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            return
        }
        console.log("ENEMY IN RANGE")
        const angle = Math.atan2(
            enemiesInRange[0].position.y - this.position.y*20,
            enemiesInRange[0].position.x - this.position.x*20
        );
        this.target = enemiesInRange[0];
        console.log(angle)
        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}