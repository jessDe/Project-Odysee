
// Variablen
const TILESIZE = 32;
let steuerung = {
    links: false,
    rechts: false,
    springen: false,
    slide: false,
    attack: false,
    special: false,
    magic: false,
    pause: false
};

let lastTime;
let world = {
    offsetX: 0,
    offsetY: 0
}
let mathIsAwesome;
let gamepads;


class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;
        this.lvlc = JSON.parse(JSON.stringify(LEVELS[this.curlevel]));
        this.myPlayer = new Player( this.lvlc.map, { w: 64, h: 64 }, { maxHP: 100, curHP: 100, atk: 40, atkCD: 150, def: 20, mag: 50, mgx: 20, speed: 4 } );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;
        this.test = new Image();
        this.test.src = "./src/img/bgimg/vig.png";
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;
        this.frame = 0;
        this.GameRunning = false;
        this.activeNMY = [];
        this.activeSGL = [];
        world = {
            offsetX: 0,
            offsetY: 0
        }
        mathIsAwesome = (TILESIZE * this.lvlc.map.pattern.length / canvas.height - 1);
        this.populate(this.lvlc.map.spawn);
        console.log('JumpAndRunClass created');
    }

    Start(){
        lastTime = new Date();
        this.GameRunning = true;
        steuerung = {
            links: false,
            rechts: false,
            springen: false,
            slide: false,
            attack: false,
            special: false,
            magic: false,
            pause: false
        };
        this.drawLevel();
        this.updateGame();
        window.addEventListener('keydown', this.steuern);
        window.addEventListener('keyup', this.steuern);
        window.addEventListener('gamepadconnected', this.gamepad);
        window.addEventListener('gamepaddisconnected', this.gamepad);
    }
    drawLevel(){
        let leinwand = {
            width: 0,
            height: 0
        };
        let offset = {
            x: (this.myPlayer.pos.x + this.myPlayer.size.w/2 )/TILESIZE - (canvas.width/TILESIZE)/2,
            y: world.offsetY,
        };

        world.offsetX = offset.x;
        world.offsetY = offset.y;
        // let PlayerPos = this.lvlc.map.spawn.player; // obsolet
        leinwand.width = TILESIZE * this.lvlc.map.pattern[0].length;
        leinwand.height = TILESIZE * this.lvlc.map.pattern.length;
        let pinsel = ctx;
        pinsel.drawImage( this.bgimg, JumpAndRun.myPlayer.pos.x * (this.bgimg.width / (this.lvlc.map.pattern[0].length * TILESIZE)), 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

        //console.log('Breite: '+ leinwand.width +', Höhe: '+ leinwand.height);
        // Durchlaufe alle Zeilen der Map
        for( let zeile = 0; zeile < this.lvlc.map.pattern.length ; zeile++ ) {
            // Durchlaufe darin alle Spalten der Map
            for( let spalte = 0; spalte < this.lvlc.map.pattern[0].length; spalte++ ) {
                // Bestimmte die Position des aktuellen Feldes im TILES-Array
                let pos = this.lvlc.map.mask.indexOf( this.lvlc.map.pattern[zeile].charAt( spalte ) );
                // Falls Map-Eintrag unter den angegebenen TILES ist
                if( pos >= 0) {
                    // dann zeichne das entsprechende Feld auf die Leinwand
                    pinsel.drawImage(this.tileset, TILESIZE * pos, 0, TILESIZE, TILESIZE, spalte*TILESIZE-offset.x*TILESIZE, zeile*TILESIZE-offset.y*TILESIZE, TILESIZE, TILESIZE);
                    //console.log('Zeile: '+ zeile +', Spalte: '+ spalte +', Pos: '+ pos);
                }else{
                    //console.log("TileSet Error"+ this.lvlc.map.pattern[zeile].charAt( spalte ))
                }
            }
        }
        if( this.lvlc.type === "underground" ) pinsel.drawImage(
            this.test,
            0,
            0,
            canvas.width*2,
            canvas.height*2,
            (JumpAndRun.myPlayer.pos.x + JumpAndRun.myPlayer.size.w/2) - canvas.width - offset.x*TILESIZE,
            (JumpAndRun.myPlayer.pos.y + JumpAndRun.myPlayer.size.h/2) - canvas.height -offset.y*TILESIZE,
            canvas.width*2,
            canvas.height*2);
    }
    steuern(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        if(JumpAndRun.myPlayer.alive) {
            switch (event.key) {
                case "ArrowLeft":
                    steuerung.links = (event.type === 'keydown');
                    break;
                case "ArrowRight":
                    steuerung.rechts = (event.type === 'keydown');
                    break;
                case "ArrowDown":
                    steuerung.slide = (event.type === 'keydown');
                    break;
                case "ArrowUp":
                    steuerung.springen = (event.type === 'keydown');
                    break;
                case "Control":
                    steuerung.attack = (event.type === 'keydown');
                    break;
                case "":
                    steuerung.special = (event.type === 'keydown');
                    break;
                case "":
                    steuerung.magic = (event.type === 'keydown');
                    break;
                case "Escape":
                    steuerung.pause = (event.type === 'keydown');
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }
        }
        event.preventDefault();        // Cancel the default action to avoid it being handled twice
    }

    juggler( ntt, sprite ) {
        switch (sprite) {
            case 'idle':
                if (ntt.image !== ntt.sprites.idle.image) {
                    ntt.frMax = ntt.sprites.idle.frMax;
                    ntt.image = ntt.sprites.idle.image;
                }
                break;
            case 'idleL':
                if (ntt.image !== ntt.sprites.idleL.image) {
                    ntt.frMax = ntt.sprites.idleL.frMax;
                    ntt.image = ntt.sprites.idleL.image;
                }
                break;
            case 'idleR':
                if (ntt.image !== ntt.sprites.idleR.image) {
                    ntt.frMax = ntt.sprites.idleR.frMax;
                    ntt.image = ntt.sprites.idleR.image;
                }
                break;
            case 'runLeft':
                if (ntt.image !== ntt.sprites.runLeft.image) {
                    ntt.frMax = ntt.sprites.runLeft.frMax;
                    ntt.image = ntt.sprites.runLeft.image;
                }
                break;
            case 'runRight':
                if (ntt.image !== ntt.sprites.runRight.image) {
                    ntt.frMax = ntt.sprites.runRight.frMax;
                    ntt.image = ntt.sprites.runRight.image;
                }
                break;
            case 'jumpL':
                if (ntt.image !== ntt.sprites.jumpL.image) {
                    ntt.frMax = ntt.sprites.jumpL.frMax;
                    ntt.image = ntt.sprites.jumpL.image;
                }
                break;
            case 'jumpR':
                if (ntt.image !== ntt.sprites.jumpR.image) {
                    ntt.frMax = ntt.sprites.jumpR.frMax;
                    ntt.image = ntt.sprites.jumpR.image;
                }
                break;
            case 'slideL':
                if (ntt.image !== ntt.sprites.slideL.image) {
                    ntt.frMax = ntt.sprites.slideL.frMax;
                    ntt.image = ntt.sprites.slideL.image;
                }
                break;
            case 'slideR':
                if (ntt.image !== ntt.sprites.slideR.image) {
                    ntt.frMax = ntt.sprites.slideR.frMax;
                    ntt.image = ntt.sprites.slideR.image;
                }
                break;
            case 'attackL':
                if (ntt.image !== ntt.sprites.attackL.image) {
                    ntt.frMax = ntt.sprites.attackL.frMax;
                    ntt.image = ntt.sprites.attackL.image;
                }
                break;
            case 'attackR':
                if (ntt.image !== ntt.sprites.attackR.image) {
                    ntt.frMax = ntt.sprites.attackR.frMax;
                    ntt.image = ntt.sprites.attackR.image;
                }
                break;
                case 'specialL':
                if (ntt.image !== ntt.sprites.attackL.image) {
                    ntt.frMax = ntt.sprites.attackL.frMax;
                    ntt.image = ntt.sprites.attackL.image;
                }
                break;
            case 'specialR':
                if (ntt.image !== ntt.sprites.attackR.image) {
                    ntt.frMax = ntt.sprites.attackR.frMax;
                    ntt.image = ntt.sprites.attackR.image;
                }
                break;
            case 'magicL':
                if (ntt.image !== ntt.sprites.magicL.image) {
                    ntt.frMax = ntt.sprites.magicL.frMax;
                    ntt.image = ntt.sprites.magicL.image;
                }
                break;
            case 'magicR':
                if (ntt.image !== ntt.sprites.magicR.image) {
                    ntt.frMax = ntt.sprites.magicR.frMax;
                    ntt.image = ntt.sprites.magicR.image;
                }
                break;
            case 'struckL':
                if (ntt.image !== ntt.sprites.struckL.image) {
                    ntt.frMax = ntt.sprites.struckL.frMax;
                    ntt.image = ntt.sprites.struckL.image;
                }
                break;
            case 'struckR':
                if (ntt.image !== ntt.sprites.struckR.image) {
                    ntt.frMax = ntt.sprites.struckR.frMax;
                    ntt.image = ntt.sprites.struckR.image;
                }
                break;
            case 'death':
                if (ntt.image !== ntt.sprites.death.image) {
                    ntt.frMax = ntt.sprites.death.frMax;
                    ntt.image = ntt.sprites.death.image;
                }
                break;
        }
    }

    calcDamage( attacker, target ) {
        let tDef = target.stats.def;
        let aAtk = attacker.stats.atk;
        return aAtk * (1 - (tDef / (100 + tDef)));
    }
    // Methode zum Prüfen ob Einheiten getroffen wurden
    struck( attacker, target ) {
        if(target.damageCD < 1.5) return;
        if(!target.invulnerable || target.type !== 'Sigil'){
            target.stats.curHP -= this.calcDamage(attacker, target);
            if (target.stats.curHP <= 0) {
                JumpAndRun.juggler(target,'death');
                target.alive = false;
                JumpAndRun.activeNMY.splice(JumpAndRun.activeNMY.indexOf(target), 1);
                let drop = dropLoot(target);
                if (drop !== null) {
                    JumpAndRun.activeSGL.push(drop);
                }
            } else if (target.direction === 1) JumpAndRun.juggler(target,'struckR');
            else JumpAndRun.juggler(target,'struckL');
        }
        target.damageCD = 0;
    }
    // Methode zum initialen Füllen der Map mit Entitäten
    populate(spawn) {
        for (let sgl of spawn.sigils) {
            this.spawnNTT(sgl);
        }
        for (let nmy of spawn.enemies) {
            this.spawnNTT(nmy);
        }
    }

    spawnNTT( item ) {
        let ntt = null;
        switch(item.type) {
            case 'Enemy':
                ntt = new Enemy(enemy[item.name], item.pos);
                console.log(item.pos)
                this.activeNMY.push(ntt);
                break;
            case 'Sigil':
                ntt = new Sigil(sigil[item.name], item.pos);
                this.activeSGL.push(ntt);
                break;
            default:
                console.error('Invalid entity type:', item.type);
                return null;
        }
        console.log(ntt);
        return ntt;
    }


    // Methode für Gamepad-Management
    gamepad( ) {
        gamepads = navigator.getGamepads();
        if(gamepads[0] === undefined) return;

        if (gamepads[0] !== null) {
            if (gamepads[0].buttons[0].pressed) {
                steuerung.springen = true;
                console.log(JumpAndRun.myPlayer.airStair, JumpAndRun.myPlayer.airStairLimit); // Double Jump funktioniert nicht mit Pad
            } else {
                steuerung.springen = false;
            }
            steuerung.attack = gamepads[0].buttons[1].pressed;
            steuerung.slide = gamepads[0].buttons[2].pressed;
            // steuerung.slide = gamepads[0].buttons[3].pressed; // Test
            steuerung.links = gamepads[0].axes[0] < -0.5;
            steuerung.rechts = gamepads[0].axes[0] > 0.5;
        }
    }


    updateGame() {
        let now = new Date();
        let period = ( now.getTime() - lastTime.getTime() ) /1000 ;
        lastTime = now;
        JumpAndRun.drawLevel();
        JumpAndRun.myPlayer.update(period);
        JumpAndRun.myPlayer.damageCD += period;
        for (let enemy of JumpAndRun.activeNMY) {
            enemy.damageCD += period;
            enemy.update();
        }
        for (let sigil of JumpAndRun.activeSGL) {
            sigil.update();
        }
        if(!JumpAndRun.myPlayer.alive){
            JumpAndRun.GameRunning = false;
            this.activeNMY = [];
            this.activeSGL = [];
            fade();
        }
        checkPhysical();
        JumpAndRun.gamepad();
        if(JumpAndRun.GameRunning){
            window.requestAnimationFrame( JumpAndRun.updateGame );
        }
    }
}

// Funktion zum Überprüfen, ob der Spieler mit einem Gegner kollidiert oder umgekehrt
function checkPhysical() {
    for (let enemy of JumpAndRun.activeNMY) {
        if (rectCollision(JumpAndRun.myPlayer, enemy)) {
            JumpAndRun.struck(enemy, JumpAndRun.myPlayer);
        }
    }
    for (let sigil of JumpAndRun.activeSGL) {
        if (rectCollision(JumpAndRun.myPlayer, sigil)) {
            sigil.effect();
            JumpAndRun.juggler(sigil,'death');
            sigil.alive = false;
            JumpAndRun.activeSGL.splice(JumpAndRun.activeSGL.indexOf(sigil), 1);

        }
    }
}

// Kollision von zwei Rechtecken
function rectCollision( rect1, rect2 ) {
    return( rect1.pos.x < rect2.pos.x + rect2.size.w &&
            rect1.pos.x + rect1.size.w > rect2.pos.x &&
            rect1.pos.y < rect2.pos.y + rect2.size.h &&
            rect1.pos.y + rect1.size.h > rect2.pos.y );
}

let fadeVar = 0;
function fade(){
    if(fadeVar < 1){
        fadeVar += 0.01;
        ctx.fillStyle = 'rgba(0,0,0,'+fadeVar+')';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,'+fadeVar+')'
        ctx.font = 'bold 50px Arial';
        ctx.fillText('You died.', canvas.width/2 -100, canvas.height/2 -25)
        setTimeout(fade, 30)
    }else{
        GameMode = 0;
        fadeVar = 0;
    }
}


// Jedes Mal, wenn eine Entität stirbt, soll geprüft werden, ob sie etwas aus ihrem Loot-Array droppt
function dropLoot( entity ) {
    if (!entity.loot) {
        return null;
    }
    if ( entity.hasLoot ) {
        let loot = entity.loot[ Math.floor( Math.random() * entity.loot.length ) ];
        let drop = new Sigil(sigil[loot], entity.pos);
        // Drop-Position soll die Position der toten Entität sein, aber versetzt und entgegengesetzt der Spielerposition
        drop.pos.x = entity.pos.x + (entity.pos.x > JumpAndRun.myPlayer.pos.x ? 16 : -16);
        drop.pos.y = entity.pos.y - 16;
        console.log(drop);
        JumpAndRun.activeSGL.push(drop);
        JumpAndRun.juggler( drop, 'idle');
        return drop;
    }
}




