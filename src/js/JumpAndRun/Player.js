// Klasse für den Spieler (Jump'n'Run)
// geschrieben von: AZ
class Player {
  constructor(x, y, w, h, map) {
    // Position und Größe des Spielers
    this.pos = {
      x: x,
      y: y
    };
    this.size = {
      w: w,
      h: h
    };
    this.offset = {
      x: 0,
      y: 0
    };
    this.eastward = true;
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.speed = 5;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.jumpStrength = 15;
    this.gravity = 0.981;
    this.airStair = 0;
    this.airStairLimit = 2;
    // Kampfwerte des Spielers
    this.hitpoints = 100;
    this.alive = true;
    this.atkPow = 40;
    this.defPow = 20;
    this.magPow = 50;
    this.mag2nd = 20;
    this.atkCooldown = 250;
    this.hasDeflect = false;
    this.attacking = false;
    this.slideCooldown = 0;
    this.slideDuration = 0;
    this.isSliding = false;
    this.invulnerable = false;
    this.atkBox = {
      pos: {
        x: x,
        y: y
      },
      size: {
        w: 48,
        h: 48
      },
      offset: {
        x: 0,
        y: 0
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
        frMax: 12
      },
      jumpR: {
        image: new Image(),
        frMax: 12
      },
      slideL: {
        image: new Image(),
        frMax: 12
      },
      slideR: {
        image: new Image(),
        frMax: 12
      },
      angriffL: {
        image: new Image(),
        frMax: 1
      },
      angriffR: {
        image: new Image(),
        frMax: 1
      },
      specialL: {
        image: new Image(),
        frMax: 1
      },
      specialR: {
        image: new Image(),
        frMax: 1
      },
      magicL: {
        image: new Image(),
        frMax: 1
      },
      magicR: {
        image: new Image(),
        frMax: 1
      },
      struck: {
        image: new Image(),
        frMax: 1
      },
      death: {
        image: new Image(),
        frMax: 1
      }
    }

    this.sprites.idleL.image.src = './src/img/pc/idleL.png';
    this.sprites.idleR.image.src = './src/img/pc/idleR.png';
    this.sprites.runLeft.image.src = './src/img/pc/runLeft.png';
    this.sprites.runRight.image.src = './src/img/pc/runRight.png';
    this.sprites.jumpL.image.src = './src/img/pc/jumpL.png';
    this.sprites.jumpR.image.src = './src/img/pc/jumpR.png';
    this.sprites.slideL.image.src = './src/img/pc/slideL.png';
    this.sprites.slideR.image.src = './src/img/pc/slideR.png';
    // this.sprites.angriffL.image.src = './src/img/pc/angriffL.png';
    // this.sprites.angriffR.image.src = './src/img/pc/angriffR.png';
    // this.sprites.specialL.image.src = './src/img/pc/specialL.png';
    // this.sprites.specialR.image.src = './src/img/pc/specialR.png';
    // this.sprites.magicL.image.src = './src/img/pc/magicL.png';
    // this.sprites.magicR.image.src = './src/img/pc/magicR.png';
    // this.sprites.struck.image.src = './src/img/pc/struck.png';
    // this.sprites.death.image.src = './src/img/pc/death.png';

    // Sonstiges
    this.map = map;
  }

  //



  // Kollisionsmethode für Terrain, übernommen vom J&R aus dem Unterricht
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
    if (!steuerung.links && !steuerung.rechts && this.airStair === 0 && !steuerung.slide && !steuerung.angriff && !steuerung.special && !steuerung.magic) {
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer,'idleR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer,'idleL');
    }
    // PC nach links bewegen
    if (steuerung.links) {
      this.pos.x -= this.speed;
      this.eastward = false;
      JumpAndRun.juggler( JumpAndRun.myPlayer, 'runLeft');
      let blockiert = this.blockade( this.pos.x, this.pos.y, this.map ) ;
      if( blockiert.links ) this.pos.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.pos.x += this.speed;
      this.eastward = true;
      if( this.airStair === 0) JumpAndRun.juggler( JumpAndRun.myPlayer, 'runRight');
      let blockiert = this.blockade( this.pos.x, this.pos.y, this.map ) ;
      if( blockiert.rechts ) this.pos.x = TILESIZE * blockiert.spalteRechts - this.size.w - 1 ;
    }
    // PC springen lassen + Multi-Jump-Funktionalität ("Air-Stair")
    if (steuerung.springen && this.airStair < this.airStairLimit) {
      steuerung.springen = false;
      this.velocity.y = this.jumpStrength * -1;
      this.airStair++;
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'jumpR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'jumpL');
    }
    //
    if (steuerung.slide && this.slideCooldown === 0) {
      this.isSliding = true;
      this.invulnerable = true;
      this.slideCooldown = 100;
      this.slideDuration = 15;
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'slideL');
    }
    // PC angreifen lassen
    if (steuerung.angriff) {
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'attackR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'attackL');
      this.attacking = true;
    }
    // PC angreifen lassen
    if (steuerung.special) {
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'specialR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'specialL');
    }
    // Spieler Magie einsetzen lassen
    if (steuerung.magic) {
      if( this.eastward ) JumpAndRun.juggler( JumpAndRun.myPlayer, 'magicR');
      else JumpAndRun.juggler( JumpAndRun.myPlayer, 'magicL');
    }
    // Spiel pausieren
    if (steuerung.pause) {
      // Spiel pausieren

    }

    if(this.slideDuration > 0){
      if(this.eastward){
        this.velocity.x = this.slideDuration * 2;
      }else{
        this.velocity.x = -this.slideDuration * 2;
      }


      // console.log("Sliding")
    }
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
    if(blockiert.links || blockiert.rechts){
      this.velocity.x = 0;
      // console.log("blocked sliding"+ blockiert.links + " "+blockiert.rechts)
    }else{
      // Verhindert dass der PC mit Slide
      if(this.blockade(Math.floor(this.pos.x)+TILESIZE, Math.floor(this.pos.y), this.map).rechts && this.eastward){
        this.velocity.x = 0;
      }else if(this.blockade(Math.floor(this.pos.x)-TILESIZE, Math.floor(this.pos.y), this.map).links && this.eastward === false){
        this.velocity.x = 0;
      }else{
        this.pos.x += this.velocity.x;
      }

    }
    // console.log(Math.floor(this.pos.x), Math.floor(this.pos.y))




  }
  // Anzeigen des PCs
  drawPC() {
    ctx.drawImage(
        this.image,
        this.frame * (this.image.width / this.frMax),
        0,
        this.image.width / this.frMax,
        this.image.height,
        canvas.width / 2,
        this.pos.y,
        (this.image.width / this.frMax),
        this.image.height
    )
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
    if(this.slideCooldown > 0) this.slideCooldown--;
    if(this.isSliding){
      this.slideDuration--;
      if(this.slideDuration <= 0){
        this.isSliding = false;
        this.invulnerable = false;
      }
    }
  }


  // Fähigkeiten und Talente des PCs
  talents() {
    this.talents = {
      hyperactive: function () {
        this.speed *= 1.15;
        this.atkCooldown *= 0.75;
        this.airStairLimit += 1;
      },
      secondwind: function () {
        if (this.hitpoints < 55) {
          this.hitpoints += 1;
        }
      },
      deflect: function () {
          let deflectCD = 15000;
      },
      hardboiled: function () {
        if (damageTaken > 10) {
          this.hitpoints -= 10;
        }
      }
      }

    }

  // Methode zum Aktualisieren des PC
  update() {
    this.puppeteer();
    this.ticker();
    this.drawPC();
  }

}
