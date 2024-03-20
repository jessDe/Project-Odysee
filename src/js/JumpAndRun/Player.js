// Klasse für den Spieler (Jump'n'Run)
// geschrieben von:
// Hauptautor: AZ - Beiträge von anderen Teammitgliedern sind kommentiert
class Player {
  constructor(map, size, stats) {
    this.map = map; // Map-Objekt, beinhaltet PC-Position und Offset (siehe Zeile darunter)
    this.pos = map.spawn.player; // vier Werte, die letzten beiden sind für das Offset {x: 0, y: 0, oX: 0, oY: 0}
    this.size = size; // zwei Werte, die Größe des Spielersprites {w: 64, h: 64}
    // this.eastward = true; // Blickrichtung des PC, alte Variante
    this.direction = 1; // Blickrichtung des PC, neue Variante - DARF NUR 1 ODER -1 SEIN
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.velocity = {
      x: 0,
      y: 0
    };
    this.jumpStrength = 15;
    this.gravity = 0.981;
    this.airStair = 0;
    this.airStairLimit = 2;
    // Kampfwerte des Spielers
    this.stats = stats;
    /*
    this.maxHP = 100;
    this.curHP = 100;
    this.atk = 40;
    this.atkCD = 250;
    this.def = 20;
    this.mag = 50;
    this.mgx = 20;
    this.speed = 5;
    */
    this.alive = true;
    this.hasDeflect = false;
    this.hardboiled = false;
    this.attacking = false;
    this.slideCooldown = 0;
    this.slideDuration = 0;
    this.isSliding = false;
    this.invulnerable = false;
    this.damageCD = 0;
    this.sglEff = {
      def: 0
    };
    this.sounds = {
      Jump: new Audio('./src/sounds/jump.wav'),
      Slide: new Audio('./src/sounds/slide.wav'),
      Attack: new Audio('./src/sounds/HitEnemy.wav'),
      Hurt: new Audio('./src/sounds/Hit.wav'),
      Pickup: new Audio('./src/sounds/pickup.wav')
    }
    this.atkBox = {
      pos: {
        x: canvas.width / 2 + this.size.w / 2,
        y: this.pos.y,
        oX: 0,
        oY: 0
      },
      size: {
        w: 64,
        h: 64,
        s: 1    // Variable für eventuelle Skalierung
      }
    }
    // Animation und Darstellung
    this.frame = 0;
    this.frPast = 0;
    this.frMax = 12;
    this.image = new Image();
    this.image.src = './src/img/pc/idleR.png';
    this.sprites = {
      idleL: {
        image: new Image(),
        frMax: 12
      },
      idleR: {
        image: new Image(),
        frMax: 12
      },
      runLeft: {
        image: new Image(),
        frMax: 12
      },
      runRight: {
        image: new Image(),
        frMax: 12
      },
      jumpL: {
        image: new Image(),
        frMax: 2
      },
      jumpR: {
        image: new Image(),
        frMax: 2
      },
      slideL: {
        image: new Image(),
        frMax: 4
      },
      slideR: {
        image: new Image(),
        frMax: 4
      },
      attackL: {
        image: new Image(),
        frMax: 5
      },
      attackR: {
        image: new Image(),
        frMax: 5
      },
      specialL: {
        image: new Image(),
        frMax: 5
      },
      specialR: {
        image: new Image(),
        frMax: 5
      },
      magicL: {
        image: new Image(),
        frMax: 1
      },
      magicR: {
        image: new Image(),
        frMax: 1
      },
      struckL: {
        image: new Image(),
        frMax: 2
      },
      struckR: {
        image: new Image(),
        frMax: 2
      },
      death: {
        image: new Image(),
        frMax: 1
      }
    };

    this.sprites.idleL.image.src = './src/img/pc/idleL.png';
    this.sprites.idleR.image.src = './src/img/pc/idleR.png';
    this.sprites.runLeft.image.src = './src/img/pc/runLeft.png';
    this.sprites.runRight.image.src = './src/img/pc/runRight.png';
    this.sprites.jumpL.image.src = './src/img/pc/jumpL.png';
    this.sprites.jumpR.image.src = './src/img/pc/jumpR.png';
    this.sprites.slideL.image.src = './src/img/pc/slideL.png';
    this.sprites.slideR.image.src = './src/img/pc/slideR.png';
    this.sprites.struckL.image.src = './src/img/pc/struckL.png';
    this.sprites.struckR.image.src = './src/img/pc/struckR.png';
    this.sprites.attackL.image.src = './src/img/pc/attackL.png';
    this.sprites.attackR.image.src = './src/img/pc/attackR.png';
    // this.sprites.specialL.image.src = './src/img/pc/specialL.png';
    // this.sprites.specialR.image.src = './src/img/pc/specialR.png';
    // this.sprites.magicL.image.src = './src/img/pc/magicL.png';
    // this.sprites.magicR.image.src = './src/img/pc/magicR.png';
    // this.sprites.death.image.src = './src/img/pc/death.png';

  }
  // Kollisionsmethode für Terrain, schamlos gestolen vom Unterrichtsmaterial
  blockade( pixelX, pixelY, map ) {
    let zeichenLO, zeichenLU, zeichenRO, zeichenRU;
    let b = {} ;
    b.spalteLinks = Math.floor( pixelX / TILESIZE ) ;
    b.spalteRechts = Math.floor( ( pixelX + this.size.w ) / TILESIZE ) ;
    b.zeileOben = Math.floor( pixelY / TILESIZE ) ;
    b.zeileUnten = Math.floor( ( pixelY + this.size.h ) / TILESIZE ) ;
    zeichenLO = map.pattern[ b.zeileOben ].charAt( b.spalteLinks ) ;
    zeichenLU = map.pattern[ b.zeileUnten ].charAt( b.spalteLinks ) ;
    zeichenRO = map.pattern[ b.zeileOben ].charAt( b.spalteRechts ) ;
    zeichenRU = map.pattern[ b.zeileUnten ].charAt( b.spalteRechts ) ;
    // console.log(zeichenLU + " " +zeichenRU)
    b.links = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenLU ) >= 0 ) ;
    b.rechts = ( map.solid.indexOf( zeichenRO ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 ) ;
    b.oben = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenRO ) >= 0 ) ;
    b.unten = ( map.solid.indexOf( zeichenLU ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 ) ;
    return b;
  }

  // Puppeteer: PC-Bewegung und Animationen
  puppeteer(){
    this.velocity.x = 0;
    // PC in Ruheposition
    if (!steuerung.links && !steuerung.rechts && this.airStair === 0 && !steuerung.slide && !steuerung.attack && !steuerung.special && !steuerung.magic) {
      if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer,'idleR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer,'idleL');
    }
    // PC nach links bewegen
    if (steuerung.links) {
      this.velocity.x = -this.stats.speed;
      this.pos.x += this.velocity.x;
      this.direction = -1;
      if( this.airStair === 0 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'runLeft');
      let blockiert = this.blockade( this.pos.x, this.pos.y, this.map ) ;
      if( blockiert.links ) this.pos.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.velocity.x = this.stats.speed;
      this.pos.x += this.velocity.x;
      this.direction = 1;
      if( this.airStair === 0 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'runRight');
      let blockiert = this.blockade( this.pos.x, this.pos.y, this.map ) ;
      if( blockiert.rechts ) this.pos.x = TILESIZE * blockiert.spalteRechts - this.size.w - 1 ;
    }
    // PC springen lassen + Multi-Jump-Funktionalität ("Air-Stair")
    if (steuerung.springen && this.airStair < this.airStairLimit) {
      steuerung.springen = false;
      this.velocity.y = -this.jumpStrength;
      this.airStair++;
      this.sounds.Jump.load();
      this.sounds.Jump.play().then(r => {});
      if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'jumpR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'jumpL');
    }
    // PC rutschen lassen
    if (steuerung.slide && this.slideCooldown === 0) {
      this.isSliding = true;
      this.invulnerable = true;
      this.slideCooldown = 100;
      this.slideDuration = 15;
        this.sounds.Slide.load();
        this.sounds.Slide.play().then(r => {});
      if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideL');
    }
    // Standard-Angriff, benötigt zusätzliche Änderungen
    if (steuerung.attack) {
      this.attacking = true;
      if (this.direction === 1) JumpAndRun.juggler(JumpAndRun.myPlayer, 'attackR');
      else JumpAndRun.juggler(JumpAndRun.myPlayer, 'attackL');
      for (let enemy of JumpAndRun.activeNMY) {
        if (rectCollision(JumpAndRun.myPlayer.atkBox, enemy)) {
          JumpAndRun.struck(JumpAndRun.myPlayer, enemy);

        } else {

        }
      }
      if(this.frame === 3){
        this.sounds.Attack.play().then(r => {

        });
      }
      this.attacking = false;
      console.log(JumpAndRun.activeNMY);
    }
    /*
    // Zweiter Angriff, NYI
    if (steuerung.special) {
      if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'specialR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'specialL');
    }
    // Spieler Magie einsetzen lassen, NYI
    if (steuerung.magic) {
      if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'magicR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'magicL');
    }
    */
    if(this.slideDuration > 0) this.velocity.x = this.slideDuration * 2 * this.direction;
    // PC Fallkontrolle
    this.velocity.y += this.gravity;
    if (this.pos.y < this.map.height * TILESIZE - this.size.h) this.pos.y += this.velocity.y;
    let blockiert = this.blockade(Math.floor(this.pos.x), Math.floor(this.pos.y), this.map ) ;
    if (this.velocity.y > 0 && blockiert.unten ) {
      this.pos.y = TILESIZE * blockiert.zeileUnten - this.size.h - 2;
      this.velocity.y = 0;
      this.airStair = 0;
    }
    if (this.velocity.y < 0 && blockiert.oben ) {
      this.pos.y = TILESIZE * blockiert.zeileOben + TILESIZE;
      this.velocity.y = 0;
    }
    // Verhindert, dass der PC mit Slide an Wänden "hochrutscht"
    // geschrieben von: LP
    if(blockiert.links || blockiert.rechts){
      this.velocity.x = 0;
    }else{
      if(this.blockade(Math.floor(this.pos.x)+TILESIZE, Math.floor(this.pos.y), this.map).rechts && this.direction === 1){
        this.velocity.x = 0;
      }else if(this.blockade(Math.floor(this.pos.x)-TILESIZE, Math.floor(this.pos.y), this.map).links && this.direction === -1){
        this.velocity.x = 0;
      }else{
        this.pos.x += this.velocity.x;
      }
    }
  }
  // Zeichnet den Spieler, Hilfestellung durch LP
  drawPC() {
    let playerOffset = this.pos.y * mathIsAwesome - this.size.h / 2;
    let flipper;
    world.offsetY = playerOffset/TILESIZE;
    flipper = ( this.direction === 1 ) ? 0 : (this.image.width/this.frMax - this.atkBox.size.w) ;
    ctx.drawImage(
        this.image,
        this.frame * (this.image.width / this.frMax),
        0,
        this.image.width / this.frMax,
        this.image.height,
        canvas.width / 2 - this.size.w / 2 - flipper,
        (this.pos.y - playerOffset),
        (this.image.width / this.frMax),
        this.image.height
    );
  }
  // Alternative Methode für Frames und so, muss getestet werden
  ticker() {
    this.frPast++;
    if (this.frPast % this.frMax === 0) {
      if (this.frame < this.frMax - 1) {
        this.frame++;
      } else {
        this.frame = 0;
      }
    }
    // Benötigt für Slide-Funktionalität, geschrieben von: LP
    if(this.slideCooldown > 0) this.slideCooldown--;
    if(this.isSliding){
      this.slideDuration--;
      if(this.slideDuration <= 0){
        this.isSliding = false;
        this.invulnerable = false;
      }
    }
  }
  // draw-Methode für GUI-Elemente, aktuell nur HP-Balken und bei Bedarf atkBox
  ui() {
    let hpOffset = this.pos.y * mathIsAwesome - this.size.h / 2;
    let am = 0.40 + (0.60 * (1 - (this.stats.curHP / this.stats.maxHP)));
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect( (canvas.width/2 - 52), this.pos.y + 94 - hpOffset, 104, 19);
    ctx.fillStyle = "rgba(255, 0, 0, " + am + ")";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 96 - hpOffset, 100, 10);
    ctx.fillStyle = "rgba(0, 255, 0, 0.75)";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 96 - hpOffset, 100 * (this.stats.curHP / this.stats.maxHP), 10);
    ctx.fillStyle = "rgba(255, 200, 0, 0.75)";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 106 - hpOffset, 100 - (this.slideCooldown), 5);
    // atkBox für Debugging-Zwecke
    this.atkBox.pos.x = (this.direction === 1) ? (this.pos.x + this.size.w + this.atkBox.size.w) : this.pos.x - (this.size.w/2 + this.atkBox.size.w);
    this.atkBox.pos.y = this.pos.y; //  + this.size.h / 2 - this.pos.y * mathIsAwesome
    if(debug){
      ctx.fillStyle = "rgba(127, 0, 255, 0.50)";
      ctx.fillRect(this.atkBox.pos.x, this.atkBox.pos.y, this.atkBox.size.w, this.atkBox.size.h);
    }

  }
  // Deckelt Spieler-HP
  healcap(value) {
    this.stats.curHP += value;
    if (this.stats.curHP > this.stats.maxHP) {
      this.aether += (this.stats.curHP - this.stats.maxHP) / 2;
      this.stats.curHP = this.stats.maxHP;
    }
  }
  // Fähigkeiten und Talente des PCs, NYI
  /*
  talents() {
    this.talents = {
      hyperactive: function () {
        this.stats.speed *= 1.2;
        this.stats.atkCD *= 0.75;
        this.airStairLimit += 1;
      },
      secondwind: function () {
        if (this.stats.curHP < Math.floor(this.stats.maxHP * 0.6)) {
          this.curHP += 1;
        }
      },
      deflect: function () {
          let deflectCD = 15000;
      }
    }
  }
  */
  // Methode zum Aktualisieren des PC
  update() {
    this.puppeteer();
    this.ui();
    this.ticker();
    this.drawPC();
  }

}
