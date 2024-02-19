class Enemy {
    constructor(maxHealth, speed) {
        this.position = waypoints[0];
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.speed = speed;
        this.waypointIndex = 0;
    }
    draw(ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.position.x-10, this.position.y -10, 20, 20);
    }
    update() {

        if(this.waypointIndex < waypoints.length){
            let targetX = waypoints[this.waypointIndex].x;
            let targetY = waypoints[this.waypointIndex].y;

            switch (waypoints[this.waypointIndex].to) {
                case "right":
                    this.moveRight(targetX, targetY);
                    break
                case "left":
                    this.moveLeft(targetX, targetY);
                    break
                case "up":
                    this.moveUp(targetX, targetY);
                    break
                case "down":
                    this.moveDown(targetX, targetY);
                    break;
            }
        }
    }
    moveRight(targetX, targetY){
        if(this.position.x < targetX){
            this.position.x += this.speed;
        }
        if(this.position.y < targetY){
            this.position.y += this.speed;
        }
        if(this.position.x >= targetX && this.position.y >= targetY){
            this.waypointIndex++;
        }
    }

    moveLeft(targetX, targetY){
        if(this.position.x > targetX){
            this.position.x -= this.speed;
        }
        if(this.position.y < targetY){
            this.position.y += this.speed;
        }
        if(this.position.x <= targetX){
            this.waypointIndex++;
        }
    }

    moveUp(targetX, targetY){
        if(this.position.x < targetX){
            this.position.x += this.speed;
        }
        if(this.position.y > targetY){
            this.position.y -= this.speed;
        }
        if(this.position.x >= targetX && this.position.y <= targetY){
            this.waypointIndex++;
        }
    }

    moveDown(targetX, targetY){
        if(this.position.x < targetX){
            this.position.x += this.speed;
        }
        if(this.position.y < targetY){
            this.position.y += this.speed;
        }
        if(this.position.x >= targetX && this.position.y >= targetY){
            this.waypointIndex++;
        }

    }
}