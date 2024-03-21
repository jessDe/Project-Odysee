// Spielkernel, Hauptautor: AZ - Beiträge von anderen Teammitgliedern sind kommentiert
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
let deathMSG;
// Test für Doppelbelegungen: "S" und "Shift" zum Sliden
let keymap = {
    65: 65,
    68: 68,
    16: 16,
    83: 16,
    87: 87,
    32: 87,
    70: 70
}

// Klasse für Starten des Spiels, erstellt von LP - Ergänzungen von AZ
class JumpAndRunClass {
    constructor(level) {
        this.curlevel = level;  // Aktuelles Level
        this.lvlc = JSON.parse(JSON.stringify(LEVELS[this.curlevel]));  // JS-Magie, begesteuert von LP
        this.myPlayer = new Player( this.lvlc.map, { w: 64, h: 64 }, { maxHP: 100, curHP: 100, atk: 40, atkCD: 150, def: 20, mag: 50, mgx: 20, speed: 4, kbForce: 4 } );
        this.bgimg = new Image();
        this.bgimg.src = this.lvlc.bgimg;   // Ladet das Hintergrundbild wie in Level.js angegeben
        this.test = new Image();
        this.test.src = "./src/img/bgimg/vig.png";  // Vignette für Untergrundlevel
        this.tileset = new Image();
        this.tileset.src = this.lvlc.tileset;   // Ladet die Tileset wie in Level.js angegeben
        this.StartTime = new Date();
        this.frame = 0; // Frame-Zähler; wird aktuell nicht verwendet???
        this.GameRunning = false;
        this.activeNMY = [];    // Array für aktive Gegner
        this.activeSGL = [];    // Array für aktive Sigils
        this.startedbefore = false;
        world = {
            offsetX: 0,
            offsetY: 0
        }
        mathIsAwesome = (TILESIZE * this.lvlc.map.pattern.length / canvas.height - 1);  // Formel für Korrekturen zum Scrollen
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
        pinsel.drawImage( this.bgimg, JumpAndRun.myPlayer.pos.x * ((this.bgimg.width - canvas.width) / (this.lvlc.map.pattern[0].length * TILESIZE)), 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        for( let zeile = 0; zeile < this.lvlc.map.pattern.length ; zeile++ ) {
            for( let spalte = 0; spalte < this.lvlc.map.pattern[0].length; spalte++ ) {
                let pos = this.lvlc.map.mask.indexOf( this.lvlc.map.pattern[zeile].charAt( spalte ) );
                if( pos >= 0) {
                    pinsel.drawImage(this.tileset, TILESIZE * pos, 0, TILESIZE, TILESIZE, spalte*TILESIZE-offset.x*TILESIZE, zeile*TILESIZE-offset.y*TILESIZE, TILESIZE, TILESIZE);
                    //console.log('Zeile: '+ zeile +', Spalte: '+ spalte +', Pos: '+ pos);
                }else{
                    //console.log("TileSet Error"+ this.lvlc.map.pattern[zeile].charAt( spalte ))
                }
            }
        }
        // Zeichnet Vignette für Untergrundlevel
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
    /*
    steuern(event) {
        if (event.defaultPrevented) {
            return; // Stopp, wenn das Event bereits bearbeitet wurde
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
                    return;
            }
        }
        event.preventDefault(); // Verhindert, dass das Event weitergeleitet wird
    }
     */
    // steuern aus dem Unterricht da die Leertaste mit 'key' nicht funktioniert
    steuern( event ) {
        switch( keymap[event.keyCode] ) {
            case 65: steuerung.links = (event.type === 'keydown'); break;    // 65 = Taste "A"
            case 68: steuerung.rechts = (event.type === 'keydown'); break;  // 68 = Taste "D"
            case 16: steuerung.slide = (event.type === 'keydown'); break;   // 83 = Taste "S"
            case 87: steuerung.springen = (event.type === 'keydown'); break;  // 87 = Taste "W"
            case 70: steuerung.attack = (event.type === 'keydown'); break;  // 70 = Taste "F"
            default: console.log("Taste '"+ event.code +"' wird nicht verwendet");
        }
    }




    // Juggler: Wechselt zwischen den Sprites von Spieler und Entitäten - v2, 110 Zeilen schlanker! -.-
    juggler( ntt, sprite ) {
        if (ntt.image !== ntt.sprites[sprite].image) {
            //ntt.frDur = ntt.sprites[sprite].frMax;
            ntt.frame = 0;
            ntt.frMax = ntt.sprites[sprite].frMax;
            ntt.image = ntt.sprites[sprite].image;
        }
    }

    calcDamage( attacker, target ) {
        let tDef = target.stats.def;
        let aAtk = attacker.stats.atk;
        return aAtk * (1 - (tDef / (100 + tDef)));
    }
    // Methode zum Prüfen ob Einheiten getroffen wurden, mit Ergänzungen von LP - muss noch einwenig überarbeitet werden
    struck(attacker, target) {
        if (target.damageCD < 1.5) return;   // damageCD stellt sicher, dass das Ziel nicht zu oft getroffen wird
        if (!target.invulnerable || target.type !== 'Sigil') {
            target.stats.curHP -= (this.calcDamage(attacker, target) > target.stats.curHP) ? target.stats.curHP : this.calcDamage(attacker, target);
            if (target.stats.curHP <= 0) {
                JumpAndRun.juggler(target, 'death');
                target.alive = false;

                JumpAndRun.activeNMY.splice(JumpAndRun.activeNMY.indexOf(target), 1);
                if (attacker.name === 'Yamoma') deathMSG = "Nichts stillt den Hunger von Yamoma...";
                let drop = dropLoot(target);
                if (drop !== null) {
                    JumpAndRun.activeSGL.push(drop);
                }
            } else {
                JumpAndRun.juggler(target, (target.direction === 1) ? 'struckR' : 'struckL');
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


    // Methode für Gamepad-Management, noch buggy
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
        JumpAndRun.myPlayer.update();
        JumpAndRun.myPlayer.damageCD += period;
        for (let enemy of JumpAndRun.activeNMY) {
            enemy.damageCD += period;
            enemy.update();
        }
        for (let sigil of JumpAndRun.activeSGL) {
            sigil.update();
        }
        //if(JumpAndRun.myPlayer.pos.y > ( (this.lvlc.map.pattern.length * TILESIZE) - (JumpAndRun.myPlayer.size.h * 2) )) JumpAndRun
        if(!JumpAndRun.myPlayer.alive) { // || (JumpAndRun.myPlayer.pos.y > ( (this.lvlc.map.pattern.length * TILESIZE) - (JumpAndRun.myPlayer.size.h * 2) ))
            JumpAndRun.GameRunning = false;
            fade();
        }
        checkPhysical();
        JumpAndRun.gamepad();
        ctx.fillStyle = 'white';
        ctx.font = '30px PixelFont';
        ctx.fillText('Timer: '+((new Date().getTime()- JumpAndRun.StartTime.getTime())/1000), canvas.width/2-100, 30);
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



function rerun(){
    JumpAndRun.GameRunning = false;
    fade();
}
let fadeVar = 0;
function fade(){
    if(fadeVar < 1){
        fadeVar += 0.01;
        ctx.fillStyle = 'rgba(0,0,0,'+fadeVar+')';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,'+fadeVar+')'
        ctx.font = 'bold 50px Arial';
        ctx.fillText(deathMSG, canvas.width/2 - 100, canvas.height/2 - 25)
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
        drop.pos.x = entity.pos.x + (entity.pos.x > JumpAndRun.myPlayer.pos.x ? 64 : -64);
        drop.pos.y = entity.pos.y - 16;
        console.log(drop);
        JumpAndRun.activeSGL.push(drop);
        JumpAndRun.juggler( drop, 'idle');
        return drop;
    }
}




