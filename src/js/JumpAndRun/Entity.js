// Überklasse für NPCs (feindlich, neutral und freundlich, sofern existent) - Hauptautor: AZ
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
        this.aiLevel = entity.aiLevel || 0;   // 0 = Dummy, 1 = Move only, 2 = Folgen und Angreifen, 3 = Aggro, 4 = Boss, 5 = Elite, 6 = Miniboss, 7 = Endboss, 8 = Superboss, 9 = Godboss, 10 = Finalboss, 11 = Secretboss, 12 = Hiddenboss, 13 = Ultimateboss, 14 = Trueboss, 15 = Overboss, 16 = Hyperboss, 17 = Megaboss, 18 = Gigaboss, 19 = Teraboss, 20 = Petaboss, 21 = Exaboss, 22 = Zettaboss, 23 = Yottaboss, 24 = Xennaboss, 25 = Xennaboss, 26 = Xennaboss, 27 = Xennaboss, 28 = Xennaboss, 29 = Xennaboss, 30 = Xennaboss, 31 = Xennaboss, 32 = Xennaboss, 33 = Xennaboss, 34 = Xennaboss, 35 = Xennaboss, 36 = Xennaboss, 37 = Xennaboss, 38 = Xennaboss, 39 = Xennaboss, 40 = Xennaboss, 41 = Xennaboss, 42 = Xennaboss, 43 = Xennaboss, 44 = Xennaboss, 45 = Xennaboss, 46 = Xennaboss, 47 = Xennaboss, 48 = Xennaboss, 49 = Xennaboss, 50 = Xennaboss, 51 = Xennaboss, 52 = Xennaboss, 53 = Xennaboss, 54 = Xennaboss, 55 = Xennaboss, 56 = Xennaboss, 57 = Xennaboss, 58 = Xennaboss, 59 = Xennaboss, 60 = Xennaboss, 61 = Xennaboss, 62 = Xennaboss, 63 = Xennaboss, 64 = Xennaboss, 65 = Xennaboss, 66 = Xennaboss, 67 = Xennaboss, 68 = Xennaboss, 69 = Xennaboss, 70 = Xennaboss, 71 = Xennaboss, 72 = Xennaboss, 73 = Xennaboss, 74 = Xennaboss, 75 = Xennaboss, 76 = Xennaboss, 77 = Xennaboss, 78 = Xennaboss, 79 = Xennaboss, 80 = Xennaboss, 81 = Xennaboss, 82 = Xennaboss, 83 = Xennaboss, 84 = Xennaboss, 85 = Xennaboss, 86 = Xennaboss, 87 = Xennaboss, 88 = Xennaboss, 89 = Xennaboss, 90 = Xennaboss, 91 = Xennaboss, 92 = Xennaboss, 93 = Xennaboss, 94 = Xennaboss, 95 = Xennaboss, 96 = Xennaboss, 97 = Xennaboss, 98 = Xennaboss, 99 = Xennaboss, 100 = Xennaboss
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
        ctx.strokeStyle = '#ffffff' ;
        ctx.strokeRect(this.pos.x - world.offsetX*TILESIZE, this.pos.y - world.offsetY*TILESIZE, this.size.w*this.size.s, this.size.h*this.size.s);

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
    spacial() {
        // this.pos.x += this.stats.speed * this.direction + this.velocity.x;
        this.velocity.y += ( this.type !== 'Sigil' ) ? GRAVITY : 0;
        // console.log((Math.sin(1 * this.frPast)), this.velocity.y);
        // console.log(Math.sin( 16 * this.frPast ) * 16);
        if (this.pos.y < JumpAndRun.lvlc.map.height * TILESIZE - this.size.h) this.pos.y += ( this.type !== 'Sigil' ) ? this.velocity.y : Math.sin( 0.12 * this.frPast ) * 1 ;
        let blockiert = blockade(this, JumpAndRun.lvlc.map ) ;
        if (this.velocity.y > 0 && blockiert.unten ) {
            this.pos.y = TILESIZE * blockiert.zeileUnten - this.size.h - 2;
            this.velocity.y = 0;
        }
        if (this.velocity.y < 0 && blockiert.oben ) {
            this.pos.y = TILESIZE * blockiert.zeileOben + TILESIZE;
            this.velocity.y = 0;
        }
    }
    update() {
        // this.pos.x += this.velocity.x;
        this.draw();
        this.ticker();
        this.spacial();
    }

}
class Enemy extends Entity {
    constructor(props, pos) {
        super(props);
        this.pos = pos;
        this.atkBox = props.atkBox; // {pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 1}}
        // Array für Projektile
        // this.activePRJ0 = [];
        this.ammo = props.ammo;
        this.fireCD = 0;  // Cooldown für Schüsse
        // "Physik" (Geschwindigkeit etc)
        this.direction = -1;
        this.damageCD = 0;  // Cooldown für eingehenden Schaden
        // Distanz für patroullierende Gegner, kann umgebaut werden?
        this.rLength = props.rLength;
        this.route = {
            start: this.pos.x,
            end: this.pos.x - props.rLength
        }
        this.loot = props.loot; // {name: '', effect: ''}
        this.aggroRange = props.aggroRange;  // Reichweite für Aggro
        this.knocked = 0;
        this.attacking = false; // Flag für aktiver Angriff
        this.stats = props.stats; // {maxHP: 0, curHP: 0, atk: 0, atkCD: 0, def: 0, speed: 0}
    }
    attack(pc) {
        if( rectCollision(this.atkBox, pc) ) {
            JumpAndRun.struck(this.atkBox, pc);
        }
    }
    inAttackRange(pc) {
        return (this.pos.x - this.atkBox.size.w < pc.pos.x + pc.size.w &&
                this.pos.x + this.size.w + this.atkBox.size.w > pc.pos.x);
    }
    fireMissile( ammo, pos, target ) {
        if (this.fireCD === 0) {
            let proj = new Missile(missile[ammo], pos, target);
            // this.activePRJ0.push(proj);
            JumpAndRun.activePRJ.push(proj);
            this.fireCD = this.stats.atkCD;
        }
        // console.log(this.activePRJ0);
        console.log(JumpAndRun.activePRJ);
    }

    move() {
        this.pos.x += this.stats.speed * this.direction + this.velocity.x;
        // this.pos.y += GRAVITY * (this.pos.y < JumpAndRun.myPlayer.pos.y ? 1 : -1) * this.aiLevel;
    }
    // Update-Methode für Enemy-Entitäten, KI-Verhalten muss noch ausgebaut werden
    update() {
        if (this.knocked > 0) {
            this.knocked--;
            return;
        }
        // KI-Verhalten
        switch (this.aiLevel) {
            case 0: // Regungslos (Dummy)
                // this.speed = 0;
                break;
            case 1:
                // Entity zwischen Start- und Endpunkt hin- und herbewegen
                if ( Math.abs( this.pos.x - ( ( this.route.start + this.route.end ) / 2 ) ) >
                    Math.abs( ( ( this.route.start + this.route.end ) / 2 ) - this.route.start ) ) this.direction *= -1;
                this.move();
                break;
            case 2:
                this.velocity.x = 0;
                this.direction = JumpAndRun.myPlayer.pos.x > this.pos.x ? 1 : -1;
                if (Math.abs(JumpAndRun.myPlayer.pos.x - this.pos.x) < this.aggroRange) {
                    this.fireMissile(this.ammo, this.pos, JumpAndRun.myPlayer);
                }
                break;
            default:
                break;
        }
        this.velocity.y += GRAVITY;
        this.fireCD = Math.max(this.fireCD - 1, 0);
        for(let i = 0; i < JumpAndRun.activePRJ.length; i++) {
            JumpAndRun.activePRJ[i].update();
        }
        super.draw();
        super.ticker();
        super.spacial();
    }

}
// Unterklasse für Sigillen (sowas wie Power-Ups, nur mit einem cooleren Namen :D )
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
        this.prjVec = arrayCalc(this.pos, target);
        // this.distance = 0;
        // this.target = target;
        //this.direction = direction;
        this.mSpeed = props.mSpeed;
        this.damage = props.damage;
        this.life = props.life;
        this.effect = props.effect;
    }
    end() {
        this.invulnerable = false;
        this.alive = false;
        JumpAndRun.juggler(this, 'death');
        JumpAndRun.activePRJ.splice(JumpAndRun.activePRJ.indexOf(this), 1);
    }
    update() {
        // Equivalent zur Movekomponente, mit Ergebnissen der Vektorrechnung aus arrayCalc()
        this.pos.x += this.prjVec.x * this.mSpeed;
        this.pos.y += this.prjVec.y * this.mSpeed;
        this.life--;
        if (this.life === 0) {
            this.end();
        }
        if (rectCollision(this, JumpAndRun.myPlayer)) {
            this.effect();
            this.end();
        }
        super.draw();
        super.ticker();
    }
}
function arrayCalc(pos, target) {
    this.prjVec = new transform(target.pos.x - pos.x, target.pos.y - pos.y);
    const norm = Math.sqrt(this.prjVec.x * this.prjVec.x + this.prjVec.y * this.prjVec.y);
    this.prjVec.x /= norm;
    this.prjVec.y /= norm;
    return this.prjVec;
}