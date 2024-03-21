class EnemyTD {
    constructor(maxHealth, speed, reward, Level) {
        this.position = {};
        this.position.x = TDLevels[Level].map.waypoints[0].x;
        this.position.y = TDLevels[Level].map.waypoints[0].y;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.speed = speed;
        this.waypointIndex = 0;
        this.Level = Level;
        this.reward = reward;
        this.frame = 0;
        this.UpdateTime = 0;

    }
    draw() {
        ctx.drawImage(Enemy1Image, this.frame * 28, 0, 28, 22, this.position.x - 32, this.position.y - 32, 63, 50);
    }
    update() {
        let UpdateFrame = false;
        if(new Date().getTime() > this.UpdateTime+120){
            this.UpdateTime = new Date().getTime();
            UpdateFrame = true;
        }

        if(this.waypointIndex < TDLevels[this.Level].map.waypoints.length){
            this.targetX = TDLevels[this.Level].map.waypoints[this.waypointIndex].x;
            this.targetY = TDLevels[this.Level].map.waypoints[this.waypointIndex].y;



            switch (TDLevels[this.Level].map.waypoints[this.waypointIndex].to) {
                case "right":
                    if(this.position.x < this.targetX){
                        this.position.x += this.speed;
                    }
                    if(this.position.x >= this.targetX){
                        this.waypointIndex++;
                    }
                    if(UpdateFrame){
                        if(this.frame < 5){
                            this.frame = 5;
                        } else if(this.frame < 8){
                            this.frame++;
                        } else {
                            this.frame = 5;
                        }
                    }

                    break
                case "left":
                    if(this.position.x > this.targetX){
                        this.position.x -= this.speed;
                    }
                    if(this.position.x <= this.targetX){
                        this.waypointIndex++;
                    }
                    if(UpdateFrame){
                        if(this.frame < 1){
                            this.frame = 1;
                        } else if(this.frame < 4){
                            this.frame++;
                        } else {
                            this.frame = 1;
                        }
                    }
                    break
                case "up":
                    if(this.position.y > this.targetY){
                        this.position.y -= this.speed;
                    }
                    if(this.position.y <= this.targetY){
                        this.waypointIndex++;
                    }
                    if(UpdateFrame){
                        if(this.frame < 5){
                            this.frame = 5;
                        } else if(this.frame < 8){
                            this.frame++;
                        } else {
                            this.frame = 5;
                        }
                    }
                    break
                case "down":
                    if(this.position.y < this.targetY){
                        this.position.y += this.speed;
                    }
                    if(this.position.y >= this.targetY){
                        this.waypointIndex++;
                    }
                    if(UpdateFrame){
                        if(this.frame < 5){
                            this.frame = 5;
                        } else if(this.frame < 8){
                            this.frame++;
                        } else {
                            this.frame = 5;
                        }
                    }
                    break;
            }
        }

        this.draw();
    }

}