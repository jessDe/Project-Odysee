// Spielkernel, Hauptautor: AZ - Beiträge von anderen Teammitgliedern sind kommentiert
// Variablen
const TILESIZE = 32;
const GRAVITY = 0.981;
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
// Offsets für Canvas-Manipulation
let world = {
    offsetX: 0,
    offsetY: 0
}
let miaY;
// let gamepads; // inaktiv da Gamepad-Steuerung nicht vollständig implementiert wurde
let deathMSG; // Nachricht, die beim Tod des Spielers angezeigt wird
// Doppelbelegungen für Tastatureingaben
let keymap = {
    65: 65, // Links, 65 = "a"
    68: 68, // Rechts, 68 = "d"
    16: 16, // Slide, 16 = "Shift"
    83: 16, // Slide-Alternative, 83 = "s"
    87: 87, // Springen, 87 = "w"
    32: 87, // Springen-Alternative, 32 = "Space"
    74: 74, // Attack, 74 = "j"
    70: 74  // Attack-Alternative, 70 = "f"
}
// "Spielerdummy", erlaubt Manipulation von Position&Co bevor
// sie weitergegeben werden. Verwendet in Player.js für blockade()
let dummy = {
    pos: { x: 0, y: 0 },
    size: { w: 0, h: 0 }
}
let fadeVar = 0;
let fadeMSG = "";
// Klasse für Starten des Spiels, erstellt von LP - Ergänzungen von AZ
class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;  // Aktuelles Level
        this.lvlc = JSON.parse(JSON.stringify(LEVELS[this.curlevel]));  // JS-Magie, begesteuert von LP
        this.myPlayer = new Player( this.lvlc.map, { w: 64, h: 64, s: 1 }, { maxHP: 100, curHP: 100, atk: 40, atkCD: 50, def: 30, mag: 50, mgx: 20, speed: 4} );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;   // Ladet das Hintergrundbild wie in Level.js angegeben
        this.dark = new Image();
        this.dark.src = "./src/img/bgimg/vig4.png";  // Helligkeitsvignette für Untergrundlevel
        this.tut = new Image();
        this.tut.src = "./src/img/tut/ts01.png";    // Tutorial-Bilder, Nummer 1
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;   // Ladet das Tileset wie in Level.js angegeben
        this.StartTime = new Date();
        this.GameRunning = false;   // Flag für Spielstatus
        this.activeNMY = [];    // Array für aktive Gegner
        this.activeSGL = [];    // Array für aktive Sigils
        this.activePRJ = [];    // Array für aktive Projektile
        this.lumina = 0;       // Lumina für Untergrundlevel, steuert Größe der Helligkeitsvignette
        this.startedbefore = false; // Flag zum Überprüfen, ob das Spiel schon einmal gestartet wurde
        world = {
            offsetX: 0,
            offsetY: 0
        }
        miaY = (TILESIZE * this.lvlc.map.pattern.length / canvas.height - 1);  // Formel für Korrekturen zum Scrollen
    }

    Start(){
        if(!this.startedbefore){
            this.populate(this.lvlc.map.spawn);
            this.startedbefore = true;
        }
        lastTime = new Date();
        this.GameRunning = true;
        deathMSG = "You died.";
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
        this.konami();
        this.drawLevel();
        this.updateGame();
        window.addEventListener('keydown', this.steuern);
        window.addEventListener('keyup', this.steuern);
        //window.addEventListener('gamepadconnected', this.gamepad);
        //window.addEventListener('gamepaddisconnected', this.gamepad);
    }
    // Methode zum Zeichnen des Hintergrundbildes, separiert von drawLevel() für das Tutorial und die Geheimgänge
    drawBG(){
        ctx.drawImage( this.bgimg, JumpAndRun.myPlayer.pos.x * ((this.bgimg.width - canvas.width) / (this.lvlc.map.pattern[0].length * TILESIZE)), 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
    drawLevel(){
        let lvlmap = {
            width: 0,
            height: 0
        };
        let offset = {
            x: (this.myPlayer.pos.x + this.myPlayer.size.w / 2) / TILESIZE - (canvas.width / TILESIZE) / 2,
            y: world.offsetY,
        };
        world.offsetX = offset.x;
        world.offsetY = offset.y;
        // let PlayerPos = this.lvlc.map.spawn.player; // obsolet
        lvlmap.width = TILESIZE * this.lvlc.map.pattern[0].length;
        lvlmap.height = TILESIZE * this.lvlc.map.pattern.length;
        let pinsel = ctx;
        for( let zeile = 0; zeile < this.lvlc.map.pattern.length ; zeile++ ) {
            for( let spalte = 0; spalte < this.lvlc.map.pattern[0].length; spalte++ ) {
                let pos = this.lvlc.map.mask.indexOf( this.lvlc.map.pattern[zeile].charAt( spalte ) );
                if( pos >= 0) {
                    pinsel.drawImage(this.tileset, TILESIZE * pos, 0, TILESIZE, TILESIZE, spalte*TILESIZE-offset.x*TILESIZE, zeile*TILESIZE-offset.y*TILESIZE, TILESIZE, TILESIZE);
                    //console.log('Zeile: '+ zeile +', Spalte: '+ spalte +', Pos: '+ pos);
                } else {
                    //console.log("TileSet Error"+ this.lvlc.map.pattern[zeile].charAt( spalte ))
                }
            }
        }
    }
    drawDark() {
        this.lumina = (this.lumina > 0) ? this.lumina - 0.01 : 0;
        ctx.drawImage(
            this.dark,
            ( (Math.min(this.lumina, 100) ) * (6.4) ) + (Math.random() * 8),
            ( (Math.min(this.lumina, 100) ) * (3.6) ) + (Math.random() * 8),
            canvas.width * (1 + ( 1 - ( Math.min(this.lumina, 100) / 100 ) ) ),
            canvas.height * (1 + ( 1 - ( Math.min(this.lumina, 100) / 100 ) ) ),
            ((JumpAndRun.myPlayer.pos.x + JumpAndRun.myPlayer.size.w / 2) - canvas.width - world.offsetX * TILESIZE),
            ((JumpAndRun.myPlayer.pos.y + JumpAndRun.myPlayer.size.h / 2) - canvas.height - world.offsetY * TILESIZE),
            canvas.width * 2,
            canvas.height * 2
        );
    }
    // Tutorial-Methode zum Zeichnen der Hinweisbilder
    drawTut(){
        if (JumpAndRun.lvlc.type === "tutorial") {
            for (let track of TUTSHEETS) {
                // Befindet sich der Spielercharakter zwischen den Start- und Endpunkten eines Tracks...
                if (JumpAndRun.myPlayer.pos.x >= track.start && JumpAndRun.myPlayer.pos.x <= track.end) {
                    // ...wird das entsprechende Bild geladen...
                    JumpAndRun.tut.src = track.image;
                    // ...Rückstände eines alten Bildes werden hier entfernt...
                    ctx.clearRect(240, 64, JumpAndRun.tut.width, JumpAndRun.tut.height);
                    // ...Hintergrund überzeichnet "Löcher" die von clearRect zurückgelassen wurden...
                    JumpAndRun.drawBG();
                    // ...zeichnet das zuvor geladene Bild...
                    ctx.drawImage(
                        JumpAndRun.tut,
                        240,
                        64,
                        JumpAndRun.tut.width,
                        JumpAndRun.tut.height
                    );
                    break; // ...und bricht das Tracken des Tracks ab. Nötig weil sonst nur das Bild des letzten Tracks angezeigt wird
                } else {
                    // Befindet sich der Spielercharakter auf keinem der vordefinierten Tracks, wird die
                    // clearRect-drawBG-Kombination erneut ausgeführt, um das letzte Bild zu entfernen.
                    ctx.clearRect(240, 64, JumpAndRun.tut.width, JumpAndRun.tut.height);
                    JumpAndRun.drawBG();
                    JumpAndRun.tut.src = ""; // (Kosmetisch) Notwendig, da es zu kurzen Nachbildern beim Bildwechsel kommen kann
                }
            }
        }
    }

    // steuern(), keyCode-Variante
    steuern( event ) {
        switch( keymap[event.keyCode] ) {
            case 65: steuerung.links = (event.type === 'keydown'); break;    // 65 = Taste "A"
            case 68: steuerung.rechts = (event.type === 'keydown'); break;  // 68 = Taste "D"
            case 16: steuerung.slide = (event.type === 'keydown'); break;   // 83 = Taste "S"
            case 87: steuerung.springen = (event.type === 'keydown'); break;  // 87 = Taste "W"
            case 74: steuerung.attack = (event.type === 'keydown'); break;  // 74 = Taste "J"
            default: console.log("Taste '"+ event.code +"' wird nicht verwendet");
        }
    }
    // Juggler: Wechselt zwischen den Sprites von Spieler und Entitäten - v2, 110 Zeilen schlanker! -.-
    juggler( ntt, sprite ) {
        if ((ntt.image.src.includes('attack')) && (ntt.frame < ntt.frMax - 1)) return; // Abbruch wenn Angriff ausgeführt wird
        if ((ntt.image.src.includes('struck')) && (ntt.frame < ntt.frMax - 1)) return; // Abbruch wenn getroffen
        if ((ntt.image.src.includes('slide')) && (ntt.frame < ntt.frMax - 1)) return; // Abbruch wenn PC slided/dashed
        // Ladet das Sprite (z.B. idle, attack, run, usw) der angegebenen Entität abhängig davon welche Sprites hinterlegt sind
        if (ntt.image !== ntt.sprites[sprite].image) {
            ntt.frame = 0;
            ntt.frMax = ntt.sprites[sprite].frMax;
            ntt.image = ntt.sprites[sprite].image;
        }
    }
    // Schadensberechnung, separiert von struck() für bessere Funktionalität
    calcDamage( attacker, target ) {
        let tDef = target.stats.def;
        let aAtk = attacker.stats.atk;
        return aAtk * (1 - (tDef / (100 + tDef)));
    }
    // Methode zum Prüfen ob Einheiten getroffen wurden, mit Ergänzungen von LP - muss noch einwenig überarbeitet werden
    struck(attacker, target) {
        if (target.damageCD < 1) return;   // damageCD stellt sicher, dass das Ziel nicht zu oft getroffen wird
        if (!target.invulnerable || target.type !== 'Sigil') {
            // Verhindert dass die HP des Ziels unter 0 sinken können.
            // Dient primär dazu dass der PC HP-Balken nicht im negativen Bereich weitergezeichnet wird
            target.stats.curHP -= (this.calcDamage(attacker, target) > target.stats.curHP) ? target.stats.curHP : this.calcDamage(attacker, target);
            if (target.stats.curHP <= 0) {
                if (target.type === 'Player') {
                    JumpAndRun.juggler(JumpAndRun.myPlayer, (JumpAndRun.myPlayer.direction === 1) ? 'deathR' : 'deathL');
                } else JumpAndRun.juggler(target, 'death');
                target.alive = false;
                JumpAndRun.activeNMY.splice(JumpAndRun.activeNMY.indexOf(target), 1);
                let drop = dropLoot(target);
                if (drop !== null) {
                    JumpAndRun.activeSGL.push(drop);
                }
            } else {
                JumpAndRun.juggler(target, (target.direction === 1) ? 'struckR' : 'struckL');
                // Knockback-Effekt, abhängig von der Richtung des Angreifers...funktioniert aber irgend nicht so wie gewollt...
                target.pos.x += (target.direction === 1) ? -target.knocked/25 : target.knocked/25;
                // Benötigt für einen kurzen Stun-Effekt, als optisches Feedback auf einen Treffer
                target.knocked = 25;
            }
            target.damageCD = 0;
        }
    }
    // Methode zum initialen Füllen der Map mit Entitäten, abhängig davon was in Level.js eingetragen wurde
    populate(spawn) {
        for (let sgl of spawn.sigils) {
            this.spawnNTT(sgl);
        }
        for (let nmy of spawn.enemies) {
            this.spawnNTT(nmy);
        }
    }
    // Selbsterklärend :o)
    konami() {
        let konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiUnlock = 0;
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === konami[konamiUnlock]) {
                konamiUnlock++;
                if (konamiUnlock === konami.length) {
                    JumpAndRun.myPlayer.stats.maxHP += 999;
                    JumpAndRun.myPlayer.stats.curHP += 999;
                    JumpAndRun.myPlayer.stats.atk += 999;
                    JumpAndRun.myPlayer.stats.def += 999;
                    JumpAndRun.myPlayer.stats.mag += 999;
                    JumpAndRun.myPlayer.stats.mgx += 999;
                    JumpAndRun.myPlayer.stats.speed += 9;
                    JumpAndRun.myPlayer.airStairLimit += 999;
                    JumpAndRun.myPlayer.slideHack = 0;
                    konamiUnlock = 0;
                }
            } else {
                konamiUnlock = 0;
            }
        });
    }
    // Methode zum Ausspucken von Entitäten
    spawnNTT( item ) {
        let ntt = null;
        switch(item.type) {
            case 'Enemy':
                ntt = new Enemy(ENEMY[item.name], item.pos);
                this.activeNMY.push(ntt);
                break;
            case 'Sigil':
                ntt = new Sigil(SIGIL[item.name], item.pos);
                this.activeSGL.push(ntt);
                break;
            default:
                console.error('Invalid entity type:', item.type);
                return null;
        }
        return ntt;
    }
    /*
    // Methode für Gamepad-Management, funktioniert solala
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
     */
    updateGame() {
        let now = new Date();
        let period = ( now.getTime() - lastTime.getTime() ) /1000 ;
        lastTime = now;
        // Damit keine unnötigen drawBG() ausgeführt werden
        if (JumpAndRun.lvlc.type === "tutorial") {
            JumpAndRun.drawTut();
        } else JumpAndRun.drawBG();
        JumpAndRun.myPlayer.update();
        JumpAndRun.drawLevel();
        JumpAndRun.myPlayer.ui();
        JumpAndRun.myPlayer.damageCD += period;
        for (let enemy of JumpAndRun.activeNMY) {
            enemy.damageCD += period;
            enemy.update();
        }
        for (let sigil of JumpAndRun.activeSGL) {
            sigil.update();
        }
        // Zeichnet Vignette für Untergrundlevel, inklusive Skalierung durch Lumina
        if (JumpAndRun.lvlc.type === "underground") JumpAndRun.drawDark();
        if(!JumpAndRun.myPlayer.alive || (JumpAndRun.myPlayer.pos.y > ( (JumpAndRun.lvlc.map.pattern.length * TILESIZE) - (JumpAndRun.myPlayer.size.h * 2) ))) { // || (JumpAndRun.myPlayer.pos.y > ( (this.lvlc.map.pattern.length * TILESIZE) - (JumpAndRun.myPlayer.size.h * 2) ))
            JumpAndRun.GameRunning = false;
            fade(deathMSG, function () {
                GameMode = 0;
            });
        }
        checkPhysical();
        // JumpAndRun.gamepad();
        ctx.fillStyle = 'white';
        ctx.font = '30px PixelFont';
        ctx.fillText('Timer: '+((new Date().getTime()- JumpAndRun.StartTime.getTime())/1000), canvas.width/2-100, 30);
        if(JumpAndRun.GameRunning){
            window.requestAnimationFrame( JumpAndRun.updateGame );
        }
    }
}


// Funktion zum Überprüfen, ob der PC mit einer Entität kollidiert
function checkPhysical() {
    // Kollision mit aktiven Gegnern, resultiert in Schaden für den PC
    for (let enemy of JumpAndRun.activeNMY) {
        if (rectCollision(JumpAndRun.myPlayer, enemy)) {
            JumpAndRun.struck(enemy, JumpAndRun.myPlayer);
        }
    }
    // Kollision mit Sigillen. PC profitiert vom hinterlegten Effekt der Sigille, welche dann aus dem Spiel entfernt wird
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
// Alte Fade-Funktion, die wohl nicht mehr gebraucht wird? Muss getesten werden
/*
function fade() {
    fadeVar = 0;
    fadeMSG = "";
    let fadeCallback = function () {
    };
}
*/
// Fade-Funktion, geschrieben von LP
function fade(message, callback){
    let msg = "";
    if(message === undefined){
        msg = fadeMSG;
        callback = fadeCallback;
    }else{
        msg = message;
        fadeMSG = message;
        fadeCallback = callback;
    }
    if(fadeVar < 1){
        fadeVar += 0.01;
        ctx.fillStyle = 'rgba(0,0,0,'+fadeVar+')';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,'+fadeVar+')'
        ctx.font = 'bold 50px Arial';
        ctx.fillText(fadeMSG, canvas.width/2 - fadeMSG.length*12, canvas.height/2 - 25)
        setTimeout(fade, 30)
    }else{
        callback();
        fadeVar = 0;
    }
}

// Jedes Mal, wenn eine Entität stirbt, soll geprüft werden, ob sie etwas aus ihrem Loot-Array droppt
function dropLoot( entity ) {
    if (!entity.loot) {
        return null;
    }
    if ( entity.loot ) {
        // Würfelt einen zufälligen Gegenstand aus der Loot-Tabelle der Entität, Droprate pro Gegnertyp
        // kann durch Dummy-Einträge in der Tabelle manipuliert werden
        let loot = entity.loot[ Math.floor( Math.random() * entity.loot.length ) ];
        let drop = new Sigil(SIGIL[loot], entity.pos);
        // Drop-Position soll die Position der toten Entität sein, aber versetzt und
        // entgegengesetzt der Spielerposition - nicht ausreichend getestet/durchdacht, aber niedrige Priorität
        drop.pos.x = entity.pos.x + drop.size.w * JumpAndRun.myPlayer.direction;
        drop.pos.y = entity.pos.y - drop.size.h;
        if (drop !== 'empty') JumpAndRun.activeSGL.push(drop);
        JumpAndRun.juggler( drop, 'idle');
        return drop;
    }
}
// blockade-Funktion, schamlos gestohlen aus dem Unterrichtsmaterial
function blockade( ntt, map ) {
    let zeichenLO, zeichenLU, zeichenRO, zeichenRU;
    let b = {};
    b.spalteLinks = Math.floor( ntt.pos.x / TILESIZE );
    b.spalteRechts = Math.floor( ( ntt.pos.x + ntt.size.w ) / TILESIZE );
    b.zeileOben = Math.floor( ntt.pos.y / TILESIZE );
    b.zeileUnten = Math.floor( ( ntt.pos.y + ntt.size.h ) / TILESIZE );
    zeichenLO = map.pattern[ b.zeileOben ].charAt( b.spalteLinks );
    zeichenLU = map.pattern[ b.zeileUnten ].charAt( b.spalteLinks );
    zeichenRO = map.pattern[ b.zeileOben ].charAt( b.spalteRechts );
    zeichenRU = map.pattern[ b.zeileUnten ].charAt( b.spalteRechts );
    b.links = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenLU ) >= 0 );
    b.rechts = ( map.solid.indexOf( zeichenRO ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 );
    b.oben = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenRO ) >= 0 );
    b.unten = ( map.solid.indexOf( zeichenLU ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 );
    return b;
}