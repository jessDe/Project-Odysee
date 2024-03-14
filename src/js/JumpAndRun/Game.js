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



class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;
        this.lvlc = LEVELS[this.curlevel];
        // this.zuletzt = new Date().getTime();
        this.myPlayer = new Player( this.lvlc.map.spawn.player.x, this.lvlc.map.spawn.player.y, 64, 64, this.lvlc.map );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;
        this.frame = 0;
        this.GameRunning = false;
    }

    Start(){
        this.GameRunning = true;
        this.drawLevel();
        this.updateGame();
        window.addEventListener('keydown', this.steuern);
        window.addEventListener('keyup', this.steuern);
    }


    drawLevel(){
        let leinwand = {
            width: 0,
            height: 0
        };
        let offset = {
            x: this.myPlayer.pos.x/TILESIZE - (canvas.width/TILESIZE)/2,
            y: 0,
        };
        let PlayerPos = this.lvlc.map.spawn.player;
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
        switch (event.key) {
            case "ArrowLeft":
                steuerung.links = (event.type === 'keydown'); break;
            case "ArrowRight":
                steuerung.rechts = (event.type === 'keydown'); break;
            case "ArrowDown":
                steuerung.slide = (event.type === 'keydown'); break;
            case "ArrowUp":
                steuerung.springen = (event.type === 'keydown'); break;
            case "Space":
                steuerung.angriff = (event.type === 'keydown'); break;
            case "Shift":
                steuerung.special = (event.type === 'keydown'); break;
            case "Control":
                steuerung.magic = (event.type === 'keydown'); break;
            case "Escape":
                steuerung.pause = (event.type === 'keydown'); break;
            default:
                return; // Quit when this doesn't handle the key event.
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
        // Einstecken eines Treffers cancelt die aktuelle Animation
        if (
            ntt.image === ntt.sprites.struck.image &&
            ntt.frame < ntt.sprites.struck.frMax - 1
        )
            return;

        // Switch-Verzweigung für die einzelnen States
        switch (sprite) {
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


    // Methode zum Prüfen ob Einheiten getroffen wurden
    struck( attacker, target ) {
        if(!target.invulnerable){
            target.hitpoints -= attacker.atkPow; // Variable für Gegnerangriff einbauen!!!
            if (target.hitpoints <= 0) {
                target.juggler('death');
            } else target.juggler('struck');
        }
    }

    Unload(){
        window.removeEventListener('keydown', this.steuern);
        window.removeEventListener('keyup', this.steuern);
    }

    updateGame() {
        /* // redudant
        let jetzt = new Date().getTime();
        let dauer = ( jetzt - JumpAndRun.zuletzt ) /1000 ;
        JumpAndRun.zuletzt = jetzt;
        */
        JumpAndRun.drawLevel();
        JumpAndRun.myPlayer.update();
        if(JumpAndRun.GameRunning){
            window.requestAnimationFrame( JumpAndRun.updateGame );
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
