// Variablen
const TILESIZE = 40;
let steuerung = {
    links: false,
    rechts: false,
    springen: false,
    slide: false,
    angriff1: false,
    angriff2: false,
    magic: false,
    pause: false
};

//load Images


class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;
        this.lvlc = LEVELS[this.curlevel];
        this.zuletzt = new Date().getTime();
        this.myPlayer = new Player( this.lvlc.map.spawn.player.x, this.lvlc.map.spawn.player.y, 64, 64, this.lvlc.map );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;
        this.frame = 0;
    }

    Start(){
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
            x: 0,
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
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "red";
                    ctx.fillText(pos, spalte*TILESIZE + TILESIZE/2 + offset.x-TILESIZE, zeile*TILESIZE+TILESIZE/2 +1 +offset.y*TILESIZE);

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
                steuerung.angriff1 = (event.type === 'keydown'); break;
            case "Shift":
                steuerung.angriff2 = (event.type === 'keydown'); break;
            case "Control":
                steuerung.magie = (event.type === 'keydown'); break;
            case "Escape":
                steuerung.pause = (event.type === 'keydown'); break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        event.preventDefault();        // Cancel the default action to avoid it being handled twice
    }

    Unload(){
        window.removeEventListener('keydown', this.steuern);
        window.removeEventListener('keyup', this.steuern);
    }

    updateGame() {
        let jetzt = new Date().getTime();
        let dauer = ( jetzt - JumpAndRun.zuletzt ) /1000 ;
        JumpAndRun.drawLevel();
        JumpAndRun.zuletzt = jetzt;
        JumpAndRun.myPlayer.update();
        window.requestAnimationFrame( JumpAndRun.updateGame );
    }
}
