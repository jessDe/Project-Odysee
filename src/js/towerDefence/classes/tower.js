
//Placed Tower Class
class tower {
    constructor(x, y){
        this.position = new transform(x, y);
        this.projectileImage = projectile1Image;
        this.TimeBetweenShots = 5;
        this.timeSinceLastShot = 0;
        this.projectilespeed = 5;
        this.projectileDamage = 10;
        this.projectiles = [
            new projectile(this.position.x, this.position.y,this.projectileImage)
        ];
    }
    draw(ctx){
        ctx.fillStyle = "#00ff00";
        ctx.drawImage(tower1Image, 0, 0, 18, 48, this.position.x*20, this.position.y*20, 40, 80);
    }
}