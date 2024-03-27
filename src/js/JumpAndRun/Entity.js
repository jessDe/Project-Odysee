// Überklasse für NPCs (feindlich, neutral und freundlich, sofern existent)
// Hauptautor: AZ - Beiträge von anderen Teammitgliedern sind kommentiert
class Entity{
    constructor(entity, pos) {
        this.name = entity.name;
        this.type = entity.type;
        this.pos = pos;     // {x: 0, y: 0, oX: 0, oY: 0}
        this.size = entity.size;   // {w: 0, h: 0, s: 1}
        this.velocity = {
            x: entity.velocity.x || 0,
            y: entity.velocity.y || 0
        };
        this.alive = true;  // Flag für lebendig oder tot; benötigt für Gegner und Items/Sigillen
        this.invulnerable = false;
        this.aiLevel = entity.aiLevel || 0;
        this.hasLoot = entity.hasLoot || false;
        // Sprites and Frames
        this.frame = 0;
        this.frPast = 0;
        this.frMax = entity.frMax || 1;
        this.image = new Image();
        this.image.src = entity.imageSrc;
        this.sprites = entity.sprites;
        for (const sprite in this.sprites) {
            entity.sprites[sprite].image = new Image()
            entity.sprites[sprite].image.src = entity.sprites[sprite].imageSrc
            entity.sprites[sprite].frMax = entity.sprites[sprite].fraMax
        }
    }
    draw() {
        /* // Hitbox für Debugging-Zwecke
        ctx.strokeStyle = '#ffffff' ;
        ctx.strokeRect(this.pos.x - world.offsetX*TILESIZE, this.pos.y - world.offsetY*TILESIZE, this.size.w*this.size.s, this.size.h*this.size.s);
         */
        ctx.drawImage(
            this.image,
            this.frame * (this.image.width / this.frMax),
            0,
            this.image.width / this.frMax,
            this.image.height,
            this.pos.x - world.offsetX*TILESIZE,
            this.pos.y - world.offsetY*TILESIZE,
            (this.image.width / this.frMax) * this.size.s,
            this.image.height * this.size.s
        )
    }
    spacial() {
        this.velocity.y += ( this.type !== 'Sigil' ) ? GRAVITY : 0;
        if (this.pos.y < JumpAndRun.lvlc.map.height * TILESIZE - this.size.h) this.pos.y += ( this.type !== 'Sigil' ) ? this.velocity.y : Math.sin( 0.12 * this.frPast ) * 1 ;
        let blockiert = blockade(this, JumpAndRun.lvlc.map);
        // if( blockiert.links ) this.pos.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
        // if( blockiert.rechts ) this.pos.x = TILESIZE * blockiert.spalteRechts - this.size.w - 1;
        if (this.velocity.y > 0 && blockiert.unten) {
            this.pos.y = TILESIZE * blockiert.zeileUnten - this.size.h - 5;
            this.velocity.y = 0;
        }
        if (this.velocity.y < 0 && blockiert.oben) {
            this.pos.y = TILESIZE * blockiert.zeileOben + TILESIZE;
            this.velocity.y = 0;
        }
    }
    ticker() {
        this.frPast++;
        if (this.frPast % this.frMax === 0) {
            if (this.frame < this.frMax - 1) {
                this.frame++;
            } else {
                this.frame = 0;
            }
        }
    }
    update() {
        // this.pos.x += this.velocity.x;
        this.draw();
        this.ticker();
        this.spacial();
    }

}
// Unterklasse für Gegner
class Enemy extends Entity {
    constructor(props, pos) {
        super(props);
        this.pos = pos;
        this.atkBox = props.atkBox; // {pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 1}}
        this.ammo = props.ammo; // Name des Projektils auf welches der Gegner zurückgreifen kann
        this.fireCD = 0;  // Cooldown für Schüsse
        // "Physik" (Geschwindigkeit etc)
        this.direction = -1;
        this.damageCD = 0;  // Cooldown für eingehenden Schaden
        // Einstellungen für patroullierende Gegner
        this.rLength = props.rLength;
        this.route = {
            start: this.pos.x,
            end: this.pos.x - props.rLength
        }
        this.loot = props.loot; // Loot-Tabelle
        this.aggroRange = props.aggroRange;  // Reichweite für Aggro
        this.knocked = 0; // Variable für Knockback-Stun
        this.attacking = false; // Flag für aktiver Angriff
        this.stats = props.stats; // {maxHP: 0, curHP: 0, atk: 0, atkCD: 0, def: 0, speed: 0}
    }
    /*
    attack(pc) {
        if( rectCollision(this.atkBox, pc) ) {
            JumpAndRun.struck(this.atkBox, pc);
        }
    }
    inAttackRange(pc) {
        return (this.pos.x - this.atkBox.size.w < pc.pos.x + pc.size.w &&
                this.pos.x + this.size.w + this.atkBox.size.w > pc.pos.x);
    }
    */
    fireMissile( ammo, pos, target ) {
        //if (this.fireCD === 0) {
            let proj = new Missile(MISSILE[ammo], pos, target);
            JumpAndRun.activePRJ.push(proj);

            //console.log(JumpAndRun.activePRJ);
        //}
    }
    move() {
        this.pos.x += this.stats.speed * this.direction + this.velocity.x;
        // this.pos.y += GRAVITY * (this.pos.y < JumpAndRun.myPlayer.pos.y ? 1 : -1) * this.aiLevel;
    }
    /*
    spacial() {
        this.velocity.y += (this.type !== 'Sigil') ? GRAVITY : 0;
        if (this.pos.y < JumpAndRun.lvlc.map.height * TILESIZE - this.size.h) this.pos.y += (this.type !== 'Sigil') ? this.velocity.y : Math.sin(0.12 * this.frPast) * 1;
        let blockiert = blockade(this, JumpAndRun.lvlc.map);
        // if( blockiert.links ) this.pos.x = this.pos.x;
        //if( blockiert.rechts ) this.pos.x = TILESIZE * blockiert.spalteRechts - this.size.w - 1;
        if (blockiert.links || blockiert.rechts) {
            this.velocity.x = 0;
        } else {
            dummy.pos.x = Math.floor(this.pos.x) + (TILESIZE * this.direction);
            dummy.pos.y = Math.floor(this.pos.y);
            dummy.size = this.size;
            if (blockade(dummy, this.map).rechts && this.direction === 1) {
                this.velocity.x = 0;
            } else if (blockade(dummy, this.map).links && this.direction === -1) {
                this.velocity.x = 0;
            } else {
                this.pos.x += this.velocity.x;
            }
        }
        if (this.velocity.y > 0 && blockiert.unten) {
            this.pos.y = TILESIZE * blockiert.zeileUnten - this.size.h - 2;
            this.velocity.y = 0;
        }
        if (this.velocity.y < 0 && blockiert.oben) {
            this.pos.y = TILESIZE * blockiert.zeileOben + TILESIZE;
            this.velocity.y = 0;
        }
    }
    */
    // Update-Methode für Enemy-Entitäten, KI-Verhalten muss noch ausgebaut werden
    update() {
        if (this.knocked > 0) {
            this.knocked--;
            return;
        }
        this.fireCD = Math.max(this.fireCD - 1, 0);
        // KI-Verhalten
        switch (this.aiLevel) {
            case 0: // Regungslos (Dummy)
                // this.speed = 0;
                break;
            case 1:
                // Entity zwischen Start- und Endpunkt hin- und herbewegen
                if ( Math.abs( this.pos.x - ( ( this.route.start + this.route.end ) / 2 ) ) >
                    Math.abs( ( ( this.route.start + this.route.end ) / 2 ) - this.route.start ) ) this.direction *= -1;
                JumpAndRun.juggler(this, (this.direction === 1) ? 'runRight' : 'runLeft');
                this.move();
                break;
            case 2:
                // this.velocity.x = 0;
                // this.direction = JumpAndRun.myPlayer.pos.x > this.pos.x ? 1 : -1;
                // Generiert in Abhängigkeit von der PC-Position einen Vektor und generiert ein Projektil
                if (this.fireCD === 0 && Math.abs(JumpAndRun.myPlayer.pos.x - this.pos.x) < this.aggroRange) {
                    let projXY;
                    if (this.pos.x < JumpAndRun.myPlayer.pos.x) {
                        this.direction = 1;
                        projXY = new transform(this.pos.x + this.size.w, this.pos.y);
                    } else {
                        this.direction = -1;
                        projXY = new transform(this.pos.x - this.size.w / 2, this.pos.y);
                    }
                    this.fireMissile(this.ammo, projXY, JumpAndRun.myPlayer);
                    this.fireCD = this.stats.atkCD;
                }
                break;
            default:
                break;
        }
        this.velocity.y += GRAVITY;

        /*
        for(let i = 0; i < JumpAndRun.activePRJ.length; i++) {
            JumpAndRun.activePRJ[i].update();
        }
         */

        JumpAndRun.activePRJ.forEach( prj => {
            prj.update();
        });

        let projClear = [];
        for(let i = JumpAndRun.activePRJ.length - 1; i >= 0; i--) {
            if (JumpAndRun.activePRJ[i]) { // Check if the projectile is defined
                console.log(`Before update: Projectile ${i} is alive: ${JumpAndRun.activePRJ[i].alive}`);
                console.log(JumpAndRun.activePRJ[i]);
                JumpAndRun.activePRJ[i].update();
                console.log(`After update: Projectile ${i} is alive: ${JumpAndRun.activePRJ[i].alive}`);
                console.log(JumpAndRun.activePRJ[i]);
                if (!JumpAndRun.activePRJ[i].alive) {
                    projClear.push(i);
                }
            }
        }
        for(let i of projClear) {
            console.log(`Removing projectile ${i}`);
            JumpAndRun.activePRJ.splice(i, 1);
        }


        super.draw();
        super.ticker();
        super.spacial();
    }

}
// Unterklasse für Sigillen (Items mit unmittelbaren Effekten)
class Sigil extends Entity {
    constructor(props, pos) {
        super(props);
        this.name = props.name ;
        this.pos = pos;
        this.effect = props.effect;
    }
}
// Unterklasse für Projektile
class Missile extends Entity {
    constructor(props, pos, target) {
        super(props);
        this.pos = new transform(pos.x, pos.y);
        this.velocity = new transform(props.velocity.x, props.velocity.y);
        this.prjVec = vecCalc(this.pos, target);
        this.stats = props.stats;
        this.effect = props.effect;
    }
    end() {
        console.log(JumpAndRun.activePRJ.length)
        this.alive = false;
        JumpAndRun.juggler(this, 'death');

    }
    update() {
        // Equivalent zur Movekomponente, mit Ergebnissen der Vektorrechnung aus vecCalc()
        this.pos.x += this.prjVec.x * this.stats.speed;
        this.pos.y += this.prjVec.y * this.stats.speed;


        if (rectCollision(this, JumpAndRun.myPlayer)) {
            this.effect();
            this.end();
        }else if(this.stats.curHP <= 0){
            this.end();
        }

        this.stats.curHP--;
        super.draw();
        super.ticker();
    }
}
// Hilfsfunktion für Vektorberechnung
function vecCalc(pos, target) {
    this.prjVec = new transform(target.pos.x - pos.x, target.pos.y - pos.y);
    const norm = Math.sqrt(this.prjVec.x * this.prjVec.x + this.prjVec.y * this.prjVec.y);
    this.prjVec.x /= norm;
    this.prjVec.y /= norm;
    return this.prjVec;
}