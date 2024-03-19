
// Variablen
const TILESIZE = 40;
let steuerung = {
    links: false,
    rechts: false,
    springen: false,
    slide: false,
    angriff: false,
    special: false,
    magic: false,
    pause: false
};
let activeNMY = [];
let activeSGL = [];
let lastTime;
let world = {
    offsetX: 0,
    offsetY: 0
}
let gamepads = navigator.getGamepads();

class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;
        this.lvlc = LEVELS[this.curlevel];
        // this.zuletzt = new Date().getTime();
        this.myPlayer = new Player( this.lvlc.map, { w: 64, h: 64 }, { maxHP: 100, curHP: 50, atk: 40, atkCD: 150, def: 20, mag: 50, mgx: 20, speed: 4 } );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;
        this.frame = 0;
        this.GameRunning = false;
    }

    Start(){
        lastTime = new Date();
        this.GameRunning = true;
        this.drawLevel();
        this.populate(this.lvlc.map.spawn);
        this.updateGame();
        console.log(activeNMY);
        console.log(activeSGL);
        window.addEventListener('keydown', this.steuern);
        window.addEventListener('keyup', this.steuern);
    }
    /*
    // drawLevel-Methode, Unterrichtsversion
    drawLevel() {
        let screen = {
            w: canvas.width, // TILESIZE * this.lvlc.map.pattern[0].length,
            h: canvas.height, // TILESIZE * this.lvlc.map.pattern.length,
        };
        let off = {
            x: this.myPlayer.pos.x - screen.w / 2,
            y: this.myPlayer.pos.y - screen.h / 2
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.bgimg, 0, 0, canvas.width, canvas.width, 0, 0, canvas.width, canvas.height);
        for( let row = 0; row < this.lvlc.map.pattern.length ; row++ ) {
            for( let col = 0; col < this.lvlc.map.pattern[0].length; col++ ) {
                let pos = this.lvlc.map.mask.indexOf( this.lvlc.map.pattern[row].charAt(col) );
                if( pos >= 0) {
                    ctx.drawImage(
                        this.tileset,
                        TILESIZE * pos,
                        0,
                        TILESIZE,
                        TILESIZE,
                        col*TILESIZE,
                        row*TILESIZE,
                        TILESIZE,
                        TILESIZE );
                }
            }
        }
        return screen;
    }
    */
    drawLevel(){
        let leinwand = {
            width: 0,
            height: 0
        };
        let offset = {
            x: (this.myPlayer.pos.x + this.myPlayer.size.w/2 )/TILESIZE - (canvas.width/TILESIZE)/2,
            y: 0,
        };
        // let PlayerPos = this.lvlc.map.spawn.player; // obsolet
        leinwand.width = TILESIZE * this.lvlc.map.pattern[0].length;
        leinwand.height = TILESIZE * this.lvlc.map.pattern.length;
        let pinsel = ctx;
        pinsel.drawImage( this.bgimg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
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
                    pinsel.drawImage(this.tileset, TILESIZE * pos, 0, TILESIZE, TILESIZE, spalte*TILESIZE-offset.x*TILESIZE, zeile*TILESIZE+offset.y*TILESIZE, TILESIZE, TILESIZE);
                    //console.log('Zeile: '+ zeile +', Spalte: '+ spalte +', Pos: '+ pos);
                }else{
                    //console.log("TileSet Error"+ this.lvlc.map.pattern[zeile].charAt( spalte ))
                }
            }
        }
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
                case "Space":
                    steuerung.angriff = (event.type === 'keydown');
                    break;
                case "Shift":
                    steuerung.special = (event.type === 'keydown');
                    break;
                case "Control":
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
        if (ntt.image === ntt.sprites.death.image) {
            if (ntt.frame === ntt.sprites.death.frMax - 1)
                ntt.alive = false;
            return;
        }
        // Ausführen von Angriff1 cancelt die aktuelle Animation
        if (
            ntt.image === ntt.sprites.angriffL.image &&
            ntt.frame < ntt.sprites.angriffL.frMax - 1
        )
            return;
        /*
        // Einstecken eines Treffers cancelt die aktuelle Animation
        if (
            ntt.image === ntt.sprites.struck.image &&
            ntt.frame < ntt.sprites.struck.frMax - 1
        )
            return;
        */

        // Switch-Verzweigung für die einzelnen States
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
                if (ntt.image !== ntt.sprites.angriffL.image) {
                    ntt.frMax = ntt.sprites.angriffL.frMax;
                    ntt.image = ntt.sprites.angriffL.image;
                }
                break;
            case 'attackR':
                if (ntt.image !== ntt.sprites.angriffR.image) {
                    ntt.frMax = ntt.sprites.angriffR.frMax;
                    ntt.image = ntt.sprites.angriffR.image;
                }
                break;
                case 'specialL':
                if (ntt.image !== ntt.sprites.angriffL.image) {
                    ntt.frMax = ntt.sprites.angriffL.frMax;
                    ntt.image = ntt.sprites.angriffL.image;
                }
                break;
            case 'specialR':
                if (ntt.image !== ntt.sprites.angriffR.image) {
                    ntt.frMax = ntt.sprites.angriffR.frMax;
                    ntt.image = ntt.sprites.angriffR.image;
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
            case 'struck':
                if (ntt.image !== ntt.sprites.struck.image) {
                    ntt.frMax = ntt.sprites.struck.frMax;
                    ntt.image = ntt.sprites.struck.image;
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
        let tDmg = aAtk * (1 - (tDef / (100 + tDef)));
        return tDmg;
    }
    // Methode zum Prüfen ob Einheiten getroffen wurden
    struck( attacker, target ) {
        if(target.damageCD < 1.5) return;
        if(!target.invulnerable || target.type !== 'Sigil'){
            if( target === JumpAndRun.myPlayer && target.hardboiled && this.calcDamage(attacker, target) > 16 ) {
                target.stats.curHP -= 16;
            } else target.stats.curHP -= this.calcDamage(attacker, target);
            if (target.curHP <= 0) {
                JumpAndRun.juggler(target,'death');
                target.alive = false;
                let drop = dropLoot(target);
                if (drop !== null) {
                    activeSGL.push(drop);
                }
            } else JumpAndRun.juggler(target,'struck');
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
        let ntt;
        switch(item.type) {
            case 'Enemy':
                ntt = new Enemy(enemy[item.name], item.pos);
                activeNMY.push(ntt);
                break;
            case 'Sigil':
                ntt = new Sigil(sigil[item.name], item.pos);
                activeSGL.push(ntt);
                break;
            default:
                console.error('Invalid entity type:', item.type);
                return null;
        }
        ntt.pos.x = item.pos.x - world.offsetX;
        ntt.pos.y = item.pos.y - world.offsetY;
        return ntt;
    }

    unload(){
        window.removeEventListener('keydown', this.steuern);
        window.removeEventListener('keyup', this.steuern);
    }

    updateGame() {
        let now = new Date();
        let period = ( now.getTime() - lastTime.getTime() ) /1000 ;
        lastTime = now;
        JumpAndRun.drawLevel();
        JumpAndRun.myPlayer.update(period);
        JumpAndRun.myPlayer.damageCD += period;
        for (let enemy of activeNMY) {
            enemy.damageCD += period;
            enemy.update();
        }
        for (let sigil of activeSGL) {
            sigil.update();
        }
        checkPhysical();
        if(JumpAndRun.GameRunning){
            window.requestAnimationFrame( JumpAndRun.updateGame );
        }
    }
}
/*
function spawnNTT( item ) {
    let ntt;
    switch(item.type) {
        case 'Enemy':
            ntt = new Enemy(enemy[item.name], item.pos);
            activeNMY.push(ntt);
            break;
        case 'Sigil':
            ntt = new Sigil(sigil[item.name], item.pos);
            activeSGL.push(ntt);
            break;
        default:
            console.error('Invalid entity type:', item.type);
            return null;
    }
    ntt.pos.x = item.pos.x - world.offsetX;
    ntt.pos.y = item.pos.y - world.offsetY;
    return ntt;
}
*/

// Funktion zum Überprüfen, ob der Spieler mit einem Gegner kollidiert oder umgekehrt
function checkPhysical() {
    for (let enemy of activeNMY) {
        if (rectCollision(JumpAndRun.myPlayer, enemy)) {
            JumpAndRun.struck(enemy, JumpAndRun.myPlayer);
        }
    }
    for (let sigil of activeSGL) {
        if (rectCollision(JumpAndRun.myPlayer, sigil)) {
            sigil.effect;
            JumpAndRun.juggler(sigil,'death');
            sigil.alive = false;
            activeSGL.splice(activeSGL.indexOf(sigil), 1);

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





// Jedes Mal, wenn eine Entität stirbt, soll geprüft werden, ob sie etwas aus ihrem Loot-Array droppt
function dropLoot( entity ) {
    if (!entity.loot) {
        return null;
    }
    if ( entity.hasLoot ) {
        let loot = entity.loot[ Math.floor( Math.random() * entity.loot.length ) ];
        let drop = new loot.type( loot );
        // Drop-Position soll die Position der toten Entität sein, aber versetzt und entgegengesetzt der Spielerposition
        drop.pos.x = entity.pos.x + (entity.pos.x > JumpAndRun.myPlayer.pos.x ? 16 : -16);
        drop.pos.y = entity.pos.y - 16;
        drop.size = entity.size;
        this.juggler( drop, 'idle');
        return drop;
    }
}


