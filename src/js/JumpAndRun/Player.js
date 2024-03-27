// Klasse für den Spieler (Jump'n'Run)
// Hauptautor: AZ - Beiträge von anderen Teammitgliedern sind kommentiert
class Player {
  constructor(map, size, stats) {
    this.type = "Player";
    this.map = map; // Map-Objekt, beinhaltet PC-Position und Offset (siehe Zeile darunter)
    this.pos = map.spawn.player; // vier Werte, die letzten beiden sind für das Offset {x: 0, y: 0, oX: 0, oY: 0}
    this.size = size; // zwei Werte, die Größe des Spielersprites {w: 64, h: 64, s: 1}
    // this.eastward = true; // Blickrichtung des PC, alte Variante
    this.direction = 1; // Blickrichtung des PC, neue Variante - DARF NUR 1 ODER -1 SEIN
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.velocity = {
      x: 0,
      y: 0
    };
    this.jumpStrength = 15;
    this.airStair = 0;
    this.airStairLimit = 2;
    // Kampfwerte des Spielers
    this.stats = stats; // {maxHP: 100, curHP: 100 atk: 40, atkCD: 50, def: 30, this.mag = 50, this.mgx = 20, speed: 4}
    this.alive = true;
    this.knocked = 0; // Variable für Knockback-Stun
    this.attacking = false;
    this.slideCD = 0;
    this.slideHack = 100;
    this.slideDuration = 0;
    this.isSliding = false;
    this.invulnerable = false;
    this.damageCD = 0;
    /*
    this.hasDeflect = false;  // Flag für Deflect-Talent, NYI
    this.hardboiled = false;  // Flag für Hardboiled-Talent, NYI
    this.sglEff = {           // Zähler für stapelbare Sigil-Effekte, NYI
      def: 0
    };
    this.sounds = {
      Jump: this.loadSound('./src/sounds/jump.mp3'),
      Slide: this.loadSound('./src/sounds/slide.mp3'),
      Attack: this.loadSound('./src/sounds/HitEnemy.mp3'),
      Hurt: this.loadSound('./src/sounds/Hit.mp3'),
      Pickup: this.loadSound('./src/sounds/pickup.mp3')
    };
    */
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
        frMax: 1
      },
      idleR: {
        image: new Image(),
        frMax: 1
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
        frMax: 4
      },
      jumpR: {
        image: new Image(),
        frMax: 4
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
        frMax: 3
      },
      attackR: {
        image: new Image(),
        frMax: 3
      },
      /*  NYI
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
       */
      struckL: {
        image: new Image(),
        frMax: 4
      },
      struckR: {
        image: new Image(),
        frMax: 4
      },
      deathL: {
        image: new Image(),
        frMax: 10
      },
      deathR: {
        image: new Image(),
        frMax: 10
      }
    };
    for (let sprite in this.sprites) {
      this.sprites[sprite].image.src = './src/img/pc/' + sprite + '.png';
    }

  }
  /*
  // Kollisionsmethode für Terrain, schamlos gestohlen vom Unterrichtsmaterial
  blockade( posX, posY, map ) {
    let zeichenLO, zeichenLU, zeichenRO, zeichenRU;
    let b = {} ;
    b.spalteLinks = Math.floor( (posX) / TILESIZE ) ;
    b.spalteRechts = Math.floor( ( posX + this.size.w ) / TILESIZE ) ;
    b.zeileOben = Math.floor( (posY) / TILESIZE ) ;
    b.zeileUnten = Math.floor( ( posY + this.size.h ) / TILESIZE ) ;
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
  */
  /*
  loadSound(src) {
    let sound = new Audio(src);
    sound.preload = 'auto';
    sound.load();
    return sound;
  }
  */


  // Puppeteer: PC-Bewegung und Animationen, erweiterte Version des Unterrichtsmaterials
  puppeteer(){
    if (this.knocked > 0) {
      this.knocked--;
      return;
    }
    // PC in Ruheposition
    if (!steuerung.links && !steuerung.rechts && this.airStair === 0 && !steuerung.slide && !steuerung.attack && !steuerung.special && !steuerung.magic) {
      this.velocity.x = 0;
      //if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer,'idleR');
      //else JumpAndRun.juggler( JumpAndRun.myPlayer,'idleL');
      JumpAndRun.juggler(JumpAndRun.myPlayer, (JumpAndRun.myPlayer.direction === 1) ? 'idleR' : 'idleL');
    }
    // PC nach links bewegen
    if (steuerung.links) {
      this.velocity.x = -this.stats.speed;
      this.pos.x += this.velocity.x;
      this.direction = -1;
      if( this.airStair === 0 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'runLeft');
      let blockiert = blockade(this, this.map ) ;
      if( blockiert.links ) this.pos.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.velocity.x = this.stats.speed;
      this.pos.x += this.velocity.x;
      this.direction = 1;
      if( this.airStair === 0 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'runRight');
      let blockiert = blockade(this, this.map ) ;
      if( blockiert.rechts ) this.pos.x = TILESIZE * blockiert.spalteRechts - this.size.w - 1;
    }
    // PC springen lassen + Multi-Jump-Funktionalität ("Air-Stair")
    if (steuerung.springen && this.airStair < this.airStairLimit) {
      console.log(this.pos);
      steuerung.springen = false;
      this.velocity.y = -this.jumpStrength;
      this.airStair++;
      /*
      this.sounds.Jump.load();
      this.sounds.Jump.currentTime = 0;
      this.sounds.Jump.play().then(r => {});
      */
      JumpAndRun.juggler(JumpAndRun.myPlayer, (JumpAndRun.myPlayer.direction === 1) ? 'jumpR' : 'jumpL');
    }
    // PC rutschen lassen
    if (steuerung.slide && this.slideCD === 0) {
      this.isSliding = true;
      this.invulnerable = true;
      this.slideCD = this.slideHack;
      this.slideDuration = 15;
      JumpAndRun.juggler(JumpAndRun.myPlayer, (JumpAndRun.myPlayer.direction === 1) ? 'slideR' : 'slideL');
      /*
      //this.sounds.Slide.load();
      this.sounds.Slide.currentTime = 0;
      this.sounds.Slide.play().then(r => {});
      */
      //if( this.direction === 1 ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideR');
      //else JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideL');
    }
    // Standard-Angriff, benötigt zusätzliche Änderungen
    if (steuerung.attack && !this.attacking) {
      this.attacking = true;
      JumpAndRun.juggler(JumpAndRun.myPlayer, (JumpAndRun.myPlayer.direction === 1) ? 'attackR' : 'attackL');
      for (let enemy of JumpAndRun.activeNMY) {
        if (rectCollision(JumpAndRun.myPlayer.atkBox, enemy)) JumpAndRun.struck(JumpAndRun.myPlayer, enemy);
      }
      /*
      if(this.frame === 2){
        this.sounds.Attack.currentTime = 0;
        this.sounds.Attack.play().then(r => {
        });
      }
      */
    }
    if(!steuerung.attack) this.attacking = false;
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
    this.velocity.y += GRAVITY;
    if (this.pos.y < this.map.height * TILESIZE - this.size.h) this.pos.y += this.velocity.y;
    let blockiert = blockade(this, this.map);
    if (this.velocity.y > 0 && blockiert.unten ) {
      this.pos.y = TILESIZE * blockiert.zeileUnten - this.size.h - 1;
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
    } else {
      dummy.pos.x = Math.floor(this.pos.x) + (TILESIZE * this.direction);
      dummy.pos.y = Math.floor(this.pos.y);
      dummy.size = this.size;
      if(blockade(dummy, this.map).rechts && this.direction === 1){
        this.velocity.x = 0;
      }else if(blockade(dummy, this.map).links && this.direction === -1){
        this.velocity.x = 0;
      }else{
        this.pos.x += this.velocity.x;
      }
    }
    /*
  else{
      dummy.pos.x = Math.floor(JumpAndRun.myPlayer.pos.x) + (TILESIZE * JumpAndRun.myPlayer.direction);
      dummy.pos.y = Math.floor(JumpAndRun.myPlayer.pos.y);
      dummy.size = JumpAndRun.myPlayer.size;
      console.log(dummy);
      if(blockade(dummy, JumpAndRun.myPlayer.map).rechts && JumpAndRun.myPlayer.direction === 1){
        JumpAndRun.myPlayer.velocity.x = 0;
      }else if(blockade(dummy, JumpAndRun.myPlayer.map).links && JumpAndRun.myPlayer.direction === -1){
        JumpAndRun.myPlayer.velocity.x = 0;
      }else{
        JumpAndRun.myPlayer.pos.x += JumpAndRun.myPlayer.velocity.x;
      }
    }
    */
  }
  // Zeichnet den Spieler, Hilfestellung durch LP
  drawPC() {
    let plyrOffsetY = this.pos.y * miaY - this.size.h / 2;
    let flipper;
    world.offsetY = plyrOffsetY/TILESIZE;
    flipper = ( this.direction === 1 ) ? 0 : (this.image.width/this.frMax - this.atkBox.size.w) ;
    ctx.drawImage(
        this.image,
        this.frame * (this.image.width / this.frMax),
        0,
        this.image.width / this.frMax,
        this.image.height,
        (canvas.width / 2 - this.size.w / 2) - flipper,
        (this.pos.y - plyrOffsetY),
        (this.image.width / this.frMax) * this.size.s,
        this.image.height * this.size.s
    );
  }
  // Alternative Methode für Frames und so, muss getestet werden
  ticker() {
    this.frPast++;
    if (this.frPast >= this.frMax) {
      this.frPast = 0;
      this.frame++;
      if (this.frame >= this.frMax) {
        this.frame = 0;
      }
    }
    // Benötigt für Slide-Funktionalität, geschrieben von: LP
    if(this.slideCD > 0) this.slideCD--;
    if(this.isSliding){
      this.slideDuration--;
      if(this.slideDuration <= 0){
        steuerung.slide = false;
        this.isSliding = false;
        this.invulnerable = false;
      }
    }
  }
  // draw-Methode für GUI-Elemente, aktuell nur HP-Balken und bei Bedarf atkBox
  ui() {
    let hpOffset = this.pos.y * miaY - this.size.h / 2;
    let am = 0.40 + (0.60 * (1 - (this.stats.curHP / this.stats.maxHP)));
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect( (canvas.width/2 - 52), this.pos.y + 94 - hpOffset, 104, 19);
    ctx.fillStyle = "rgba(255, 0, 0, " + am + ")";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 96 - hpOffset, 100, 10);
    ctx.fillStyle = "rgba(0, 223, 0, 0.85)";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 96 - hpOffset, 100 * (this.stats.curHP / this.stats.maxHP), 10);
    ctx.fillStyle = "rgba(63, 0, 127, 0.75)";
    ctx.fillRect( (canvas.width/2 - 50), this.pos.y + 106 - hpOffset, 100 - (this.slideCD), 5);
    // atkBox für Debugging-Zwecke
    this.atkBox.pos.x = (this.direction === 1) ? (this.pos.x + this.size.w + this.atkBox.size.w) : this.pos.x - (this.size.w/2 + this.atkBox.size.w);
    this.atkBox.pos.y = this.pos.y; //  + this.size.h / 2 - this.pos.y * miaY
    if(debug){
      ctx.fillStyle = "rgba(127, 0, 255, 0.50)";
      ctx.fillRect(this.atkBox.pos.x, this.atkBox.pos.y, this.atkBox.size.w, this.atkBox.size.h);
    }
  }
  // Deckelt Spieler-HP
  healcap(value) {
    this.stats.curHP += value;
    if (this.stats.curHP > this.stats.maxHP) {
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
  update() {
    this.puppeteer();
    this.ticker();
    this.drawPC();
  }

}
