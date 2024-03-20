// Überklasse für NPCs (feindlich, neutral und freundlich, sofern existent)
class Entity{
    constructor(entity, pos) {
        this.name = entity.name;
        this.type = entity.type;
        this.pos = pos;     // {x: 0, y: 0, oX: 0, oY: 0}
        this.size = entity.size;   // {w: 0, h: 0, s: 1}
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
        ctx.strokeRect(this.pos.x - world.offsetX*TILESIZE, this.pos.y - world.offsetY*TILESIZE, this.size.w, this.size.h);
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

    /*
    // Neue drawNTT-Methode, Animationen + Sprites + Frames - BUGGY?
    draw() {
        for (const sprite in this.sprites) {
            if (this.sprites[sprite].frPast > 1000 / 60) {
                this.sprites[sprite].frame = (this.sprites[sprite].frame + 1) % this.sprites[sprite].frMax;
                this.sprites[sprite].frPast = 0;
            }
        }
        this.frPast += 1000 / 60;
        for (const sprite in this.sprites) {
            this.sprites[sprite].frPast += 1000 / 60;
        }
        for (const sprite in this.sprites) {
            let posX = this.pos.x - this.pos.oX;
            let posY = this.pos.y - this.pos.oY;
            let width = (this.sprites[sprite].image.width / this.sprites[sprite].frMax) * this.size.s;
            let height = this.sprites[sprite].image.height * this.size.s;
            // console.log(posX, posY, width, height, this.size.s);
            ctx.drawImage(
                this.sprites[sprite].image,
                this.sprites[sprite].frame * (this.sprites[sprite].image.width / this.sprites[sprite].frMax),
                0,
                this.sprites[sprite].image.width / this.sprites[sprite].frMax,
                this.sprites[sprite].image.height,
                posX,
                posY,
                width,
                height
            )
        }
    }
    */
    update() {
        this.draw();
        this.ticker();
    }

}
class Enemy extends Entity {
    constructor(props, pos) {
        super(props);
        this.pos = pos;
        this.atkBox = props.atkBox; // {pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 1}}
        // "Physik" (Geschwindigkeit etc)
        this.direction = -1;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.5;
        this.damageCD = 0;  // Cooldown für Schaden
        // Distanz für patroullierende Gegner
        this.route = {
            start: this.pos.x,
            end: this.pos.x - props.rLength
        }
        this.aggroRange = 200;  // Reichweite für Aggro
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
    move() {
        this.pos.x += this.stats.speed * this.direction;
        this.pos.y += this.gravity * (this.pos.y < JumpAndRun.myPlayer.pos.y ? 1 : -1) * this.aiLevel;


    }
    update() {
        // KI-Verhalten
        switch (this.aiLevel) {
            case 0: // Regungslos (Dummy)
                // this.speed = 0;
                break;
            case 1: // nur Bewegung, in eine Richtung oder patroulliern
                if (Math.abs(2 * this.pos.x - this.route.start - this.route.end) > this.route.length) {
                    this.direction *= -1;
                }
                this.move();
                break;
            case 2:
                this.direction = JumpAndRun.myPlayer.pos.x > this.pos.x ? 1 : -1;
                this.move();
                if (this.inAttackRange(JumpAndRun.myPlayer)) {
                    this.attack(JumpAndRun.myPlayer);
                }
                break;
            default:
                break;
        }
        super.draw();
        super.ticker();
        this.move();
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
    // Gedroppte Items/Sigillen sollen aus dem Gegner "herausspringen"; noch nicht getestet
    plopp() {
        this.pos.y -= Math.sin(0.2 * this.pos.x);
    }

}