class projectile {
    constructor(x, y, damage, speed) {
        this.position = new transform(x,y)
        this.velocity = new transform(0,0)
        this.distance = 0
        this.damage = damage
        this.target = null
        this.OutOfBounds = false
        this.speed = speed
    }
    draw() {
        ctx.drawImage(projectile1Image, (this.position.x)*20+8, (this.position.y)*20, 30, 30)

    }
    update() {
        this.draw()
        const enemiesInRange = TD.enemies.filter(enemy => {
            const distance = calculateDistance(enemy.position.x, enemy.position.y, this.position.x*20, this.position.y*20)
            return distance < 300
        });


        if(enemiesInRange.length === 0) {
            this.OutOfBounds = true;
            return
        }
        if(this.target === null) {
            this.target = enemiesInRange[0];
        }

        this.distance = calculateDistance(this.target.position.x, this.target.position.y, this.position.x * 20, this.position.y * 20)
        const angle = Math.atan2(
            this.target.position.y - this.position.y*20,
            this.target.position.x - this.position.x*20
        );
        if(this.distance< 30){
            this.target.currentHealth -= this.damage;
            this.OutOfBounds = true;
        }
        if(this.position.x > 64 || this.position.x < 0 || this.position.y > 36 || this.position.y < 0) {
            this.OutOfBounds = true;
            return
        }

        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
// Funktion zur Bestimmung des Abstands zwischen zwei Objekten (basierend auf S.d.Phythagoras)
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}