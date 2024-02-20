class Enemy {
    constructor(maxHealth, speed, reward) {
        this.position = {};
        this.position.x = waypoints[0].x;
        this.position.y = waypoints[0].y;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.speed = speed;
        this.waypointIndex = 0;
        this.reward = reward;
        this.frame = 0;
    }
    draw() {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.position.x-10, this.position.y -10, 20, 20);
    }
    update() {

        if(this.waypointIndex < waypoints.length){
            this.targetX = waypoints[this.waypointIndex].x;
            this.targetY = waypoints[this.waypointIndex].y;



            switch (waypoints[this.waypointIndex].to) {
                case "right":
                    if(this.position.x < this.targetX){
                        this.position.x += this.speed;
                    }
                    if(this.position.x >= this.targetX){
                        this.waypointIndex++;
                    }
                    break
                case "left":
                    if(this.position.x > this.targetX){
                        this.position.x -= this.speed;
                    }
                    if(this.position.x <= this.targetX){
                        this.waypointIndex++;
                    }
                    break
                case "up":
                    if(this.position.y > this.targetY){
                        this.position.y -= this.speed;
                    }
                    if(this.position.y <= this.targetY){
                        this.waypointIndex++;
                    }
                    break
                case "down":
                    if(this.position.y < this.targetY){
                        this.position.y += this.speed;
                    }
                    if(this.position.y >= this.targetY){
                        this.waypointIndex++;
                    }

                    break;
            }
        }

        this.draw();
    }

}