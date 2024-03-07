// Variablen
const TILESIZE = 40;
const SOLID = '';
let myPlayer;
let zuletzt;
let curLevel;
let steuerung = {
    links: false,
    rechts: false,
    springen: false,
    rutschen: false,
    angriff1: false,
    angriff2: false,
    magie: false,
    pause: false
};

function init() {
    curLevel = 0;
    lvlc = LEVELS[curLevel];
    myPlayer = new Player( lvlc.map.spawn.player.x, lvlc.map.spawn.player.y, 32, 64 );
    drawLevel( lvlc );
    zuletzt = new Date();
    notch = document.createElement('canvas');
    notch.width = 1280;
    notch.height = 720;
    window.addEventListener('keydown', steuern);
    window.addEventListener('keyup', steuern);

    window.requestAnimationFrame( updateGame );
}
function steuern(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowLeft":
            steuerung.links = (event.type === 'keydown'); break;
        case "ArrowRight":
            steuerung.rechts = (event.type === 'keydown'); break;
        case "ArrowDown":
            steuerung.rutschen = (event.type === 'keydown'); break;
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

// Funktion zum Zeichnen des Levels basierend auf Daten aus dem Array LEVELS
// geschrieben von: AZ
function drawLevel( map ) {
    // Hole das aktuelle Level aus dem Array LEVELS


    let leinwand = document.createElement('canvas');
    leinwand.width = TILESIZE * lvlc.map.pattern[0].length;
    leinwand.height = TILESIZE * lvlc.map.pattern.length;
    let pinsel = leinwand.getContext('2d');			// NACHLESEN
    pinsel.drawImage( lvlc.bgimg, 0, 0, leinwand.width, leinwand.height, 0, 0, leinwand.width, leinwand.height);
    console.log('Breite: '+ leinwand.width +', Höhe: '+ leinwand.height);

    // Durchlaufe alle Zeilen der Map
    for( let zeile = 0; zeile < lvlc.map.pattern.length ; zeile++ ) {


        // Durchlaufe darin alle Spalten der Map
        for( let spalte = 0; spalte < lvlc.map.pattern.length; spalte++ ) {
            // Bestimmte die Position des aktuellen Feldes im TILES-Array
            let pos = lvlc.map.mask.indexOf( map[zeile].charAt( spalte ) );			// NACHLESEN
            // Falls Map-Eintrag unter den angegebenen TILES ist
            if( pos >= 0) {
                // dann zeichne das entsprechende Feld auf die Leinwand
                pinsel.drawImage(lvlc.tileset, TILESIZE * pos, 0, TILESIZE, TILESIZE, spalte*TILESIZE, zeile*TILESIZE, TILESIZE, TILESIZE);
            }
        }
    }
    return leinwand;
}



function updateGame() {
    let jetzt = new Date();
    let dauer = ( jetzt.getTime() - zuletzt.getTime() ) /1000 ;
    zuletzt = jetzt;
    myPlayer.update( dauer );
    myPlayer.puppeteer();
    window.requestAnimationFrame( updateGame );
}