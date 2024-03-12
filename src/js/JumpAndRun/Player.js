// Klasse für den Spieler (Jump'n'Run)
// geschrieben von: AZ
class Player {
  constructor(x, y, w, h, map) {
    // Position und Größe des Spielers
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.speed = 5;
    this.velocitY = 1;
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
    this.offensive = false;

    this.offsetX = 0;
    this.offsetY = 0;
    // Animation und Darstellung
    this.frame = 0;
    this.frPast = 0;
    this.frMax = 12;
    this.image = new Image();
    this.image.src = './src/img/pc/runRight.png';
    this.sprites = {
      idle: {
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
      jump: {
        image: new Image(),
        frMax: 12
      },
      slide: {
        image: new Image(),
        frMax: 1
      },
      angriff1: {
        image: new Image(),
        frMax: 1
      },
      angriff2: {
        image: new Image(),
        frMax: 1
      },
      magic: {
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

    this.sprites.idle.image.src = './src/img/pc/runRight.png';
    this.sprites.runLeft.image.src = './src/img/pc/runLeft.png';
    this.sprites.runRight.image.src = './src/img/pc/runRight.png';
    this.sprites.jump.image.src = './src/img/pc/runRight.png';
    this.sprites.slide.image.src = './src/img/pc/runRight.png';

    // Sonstiges
    this.map = map;
  }
  // Kollisionsmethode für Terrain, übernommen vom J&R aus dem Unterricht
  blockade( pixelX, pixelY, map ) {
    let zeichenLO, zeichenLU, zeichenRO, zeichenRU;
    let b = {} ;
    b.spalteLinks = Math.floor( pixelX / TILESIZE ) ;
    b.spalteRechts = Math.floor( ( pixelX + this.w ) / TILESIZE ) ;
    b.zeileOben = Math.floor( pixelY / TILESIZE ) ;
    b.zeileUnten = Math.floor( ( pixelY + this.h ) / TILESIZE ) ;
    zeichenLO = map.pattern[ b.zeileOben ].charAt( b.spalteLinks ) ;
    zeichenLU = map.pattern[ b.zeileUnten ].charAt( b.spalteLinks ) ;
    zeichenRO = map.pattern[ b.zeileOben ].charAt( b.spalteRechts ) ;
    zeichenRU = map.pattern[ b.zeileUnten ].charAt( b.spalteRechts ) ;
    b.links = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenLU ) >= 0 ) ;
    b.rechts = ( map.solid.indexOf( zeichenRO ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 ) ;
    b.oben = ( map.solid.indexOf( zeichenLO ) >= 0 || map.solid.indexOf( zeichenRO ) >= 0 ) ;
    b.unten = ( map.solid.indexOf( zeichenLU ) >= 0 || map.solid.indexOf( zeichenRU ) >= 0 ) ;
    return b;
  }

  // Methode zum Handlen von Treffern am PC
  struck() {
    this.hitpoints -= 10; // Variable für Gegnerangriff einbauen!!!
    if (this.hitpoints <= 0) {
      this.juggler('death');
    } else this.juggler('struck');
  }


  // Puppeteer: PC-Bewegung
  puppeteer(){
        // Idle
        // if (!steuerung) {
        //  this.juggler('idle');
        // }
    // PC nach links bewegen
    if (steuerung.links) {
      this.x -= this.speed;
      let blockiert = this.blockade( this.x, this.y, this.map ) ;
      if( blockiert.links ) this.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
      this.juggler('runLeft');
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.x += this.speed;
      let blockiert = this.blockade( this.x, this.y, this.map ) ;
      if( blockiert.rechts ) this.x = TILESIZE * blockiert.spalteRechts - this.w - 1 ;
      this.juggler('runRight');
    }
    // PC springen lassen + Multi-Jump-Funktionalität ("Air-Stair")
    if (steuerung.springen && this.airStair < this.airStairLimit) {
      steuerung.springen = false;
      this.velocitY = this.jumpStrength * -1;
      this.airStair++;
      // console.log("AS: "+ this.airStair +" - ASL: "+ this.airStairLimit +" - steuerung.springen: "+ steuerung.springen);
      this.juggler('jump');
    }
    // PC rutschen lassen
    if (steuerung.slide) {
      this.juggler('slide');
    }
    // PC angreifen lassen
    if (steuerung.angriff1) {
      this.juggler('angriff1');
      this.offensive = true;
    }
    // PC angreifen lassen
    if (steuerung.angriff2) {

    }
    // Spieler Magie einsetzen lassen
    if (steuerung.magic) {
      // NYI
    }
    // Spiel pausieren
    if (steuerung.pause) {
      // Spiel pausieren

    }
    // PC Fallkontrolle
    this.velocitY += this.gravity;
    if (this.y < this.map.height * TILESIZE - this.h) this.y += this.velocitY;
    let blockiert = this.blockade( this.x, this.y, this.map ) ;
    if (this.velocitY > 0 && blockiert.unten ) {
      this.y = TILESIZE * blockiert.zeileUnten - this.h - 0.1;
      this.velocitY = 0;
      this.airStair = 0;
    }
    if (this.velocitY < 0 && blockiert.oben ) {
      this.y = TILESIZE * blockiert.zeileOben + TILESIZE;
      this.velocitY = 0;
    }
  }

  // Juggler: "Jongliert" mit den Sprites des PCs
  // geschrieben von: AZ
  juggler( sprite ) {
    if (this.image === this.sprites.death.image) {
      if (this.frame === this.sprites.death.frMax - 1)
        this.alive = false;
      return;
    }
    // Ausführen von Angriff1 cancelt die aktuelle Animation
    if (
        this.image === this.sprites.angriff1.image &&
        this.frame < this.sprites.angriff1.frMax - 1
       )
    return;
    // Einstecken eines Treffers cancelt die aktuelle Animation
    if (
        this.image === this.sprites.struck.image &&
        this.frame < this.sprites.struck.frMax - 1
       )
    return;
    // Switch-Verzweigung für die einzelnen States
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.frMax = this.sprites.idle.frMax;
          this.image = this.sprites.idle.image;
        }
        break;
      case 'runLeft':
        if (this.image !== this.sprites.runLeft.image) {
          this.frMax = this.sprites.runLeft.frMax;
          this.image = this.sprites.runLeft.image;
        }
        break;
      case 'runRight':
        if (this.image !== this.sprites.runRight.image) {
          this.frMax = this.sprites.runRight.frMax;
          this.image = this.sprites.runRight.image;
        }
        break;
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.frMax = this.sprites.jump.frMax;
          this.image = this.sprites.jump.image;
        }
        break;
      case 'slide':
        if (this.image !== this.sprites.slide.image) {
          this.frMax = this.sprites.jump.frMax;
          this.image = this.sprites.jump.image;
        }
        break;
      case 'attack1':
        if (this.image !== this.sprites.angriff1.image) {
          this.frame = 0;
          this.frMax = this.sprites.angriff1.frMax;
          this.image = this.sprites.angriff1.image;
        }
        break;
      case 'attack2':
        if (this.image !== this.sprites.angriff2.image) {
          this.frame = 0;
          this.frMax = this.sprites.angriff2.frMax;
          this.image = this.sprites.angriff2.image;
        }
        break;
      case 'magic':
        if (this.image !== this.sprites.magic.image) {
          this.frame = 0;
          this.frMax = this.sprites.magic.frMax;
          this.image = this.sprites.magic.image;
        }
        break;
      case 'struck':
        if (this.image !== this.sprites.struck.image) {
          this.frMax = this.sprites.struck.frMax;
          this.image = this.sprites.struck.image;
        }
        break;
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.frMax = this.sprites.death.frMax;
          this.image = this.sprites.death.image;
        }
        break;
    }
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
        this.y,
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
