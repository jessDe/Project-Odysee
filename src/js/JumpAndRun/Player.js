// Klasse für den Spieler (Jump'n'Run)
// geschrieben von: AZ
class Player {
  constructor(x, y, w, h) {
    // Position und Größe des Spielers
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.speed = 200;
    this.atkCooldown = 200;
    this.jumpStrength = 280;
    this.gravity = 0.5;
    this.airStair = 0;
    this.airStairLimit = 2;
    // Kampfwerte des Spielers
    this.hitpoints = 100;
    this.atkPow = 30;
    this.defPow = 20;
    this.magPow = 50;
    this.mag2nd = 20;
    this.hasDeflect = false;
  }
  // Methode zum Bewegen des Spielers
  puppeteer( dauer ){
    // PC nach links bewegen
    if (steuerung.links) {
      this.x -= this.speed;
      let blockiert = this.blockade( this.x, this.y, KARTE ) ;
      if( blockiert.links ) this.x = TILESIZE * blockiert.spalteLinks + TILESIZE;
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.x += this.speed;
      let blockiert = this.blockade( this.x, this.y, KARTE ) ;
      if( blockiert.rechts ) this.x = TILESIZE * blockiert.spalteRechts - this.w - 1 ;
    }
    // PC springen lassen
    if (steuerung.springen) {
      if (this.airStair <= this.airStairLimit) {
        this.y = -this.jumpStrength;
        this.airStair++;
      }
    }
    // PC rutschen lassen
    if (steuerung.rutschen) {

    }
    // PC angreifen lassen
    if (steuerung.angriff1) {

    }
    // PC angreifen lassen
    if (steuerung.angriff2) {

    }
    // Spieler Magie einsetzen lassen
    if (steuerung.magie) {

    }
    // Spiel pausieren
    if (steuerung.pause) {

    }
    // PC Fallkontrolle
    if (this.y < height - this.h) {
      this.y += this.gravity;
    } else {
      this.y = height - this.h;
      this.y = 0;
      this.airStair = 0;
    }
  }
  blockade( pixelX, pixelY, map ) {
    let zeichenLO, zeichenLU, zeichenRO, zeichenRU;
    let b = {} ;		// enthält ein "Blockade-Objekt" mit Boolean-Eigenschaften links, oben, rechts, unten
    // Berechne aus den Pixel-Koordinaten die Tilemap-Koordinaten
    b.spalteLinks = Math.floor( pixelX / TILESIZE ) ;
    b.spalteRechts = Math.floor( ( pixelX + this.w ) / TILESIZE ) ;
    b.zeileOben = Math.floor( pixelY / TILESIZE ) ;
    b.zeileUnten = Math.floor( ( pixelY + this.h ) / TILESIZE ) ;
    // Blockade-Information: true, falls in der Map an der Zeile / Spalte ein blockierendes Tile steht
    // Nimm das Zeichen aus der angegebenen Zeile und Spalte
    zeichenLO = map[ b.zeileOben ].charAt( b.spalteLinks ) ;
    zeichenLU = map[ b.zeileUnten ].charAt( b.spalteLinks ) ;
    zeichenRO = map[ b.zeileOben ].charAt( b.spalteRechts ) ;
    zeichenRU = map[ b.zeileUnten ].charAt( b.spalteRechts ) ;
    // Falls es in SOLID vorkommt, ist diese Richtung blockiert (true);
    // if( SOLID.indexOf( zeichenLO ) >= 0 || SOLID.indexOf( zeichenLU ) >= 0 ) { b.links = true } else { b.links = false } ;
    b.links = ( SOLID.indexOf( zeichenLO ) >= 0 || SOLID.indexOf( zeichenLU ) >= 0 ) ;
    b.rechts = ( SOLID.indexOf( zeichenRO ) >= 0 || SOLID.indexOf( zeichenRU ) >= 0 ) ;
    b.oben = ( SOLID.indexOf( zeichenLO ) >= 0 || SOLID.indexOf( zeichenRO ) >= 0 ) ;
    b.unten = ( SOLID.indexOf( zeichenLU ) >= 0 || SOLID.indexOf( zeichenRU ) >= 0 ) ;
    return b;
  }



  anzeigen() {
    let levelStift = level.getContext('2d');		// Stift zum Zeichnen des Level
    // Nimm aus dem Level den Ausschnitt, der sich um die aktuelle Spielerposition befindet
    let ausschnittX = ( this.x + this.width/2 - ausschnitt.width/2 );
    let bereich = levelStift.getImageData( ausschnittX,0, ausschnitt.width,ausschnitt.height );
    //
    let ausschnittStift = ausschnitt.getContext('2d');
    ausschnittStift.putImageData( bereich, 0, 0 );
    // Einzeichnen des Spieler in den Ausschnitt
    ausschnittStift.drawImage( this.sprite, this.frame*this.breite, this.animation*this.hoehe, this.breite, this.hoehe, ausschnitt.width/2-this.breite/2, this.posY, this.breite, this.hoehe );
  }

  // Fähigkeiten und Talente des Spieler
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


    // Methode zum Aktualisieren des Spielers

  update( dauer ) {
    this.puppeteer( dauer );
    this.anzeigen();
  }

}
