// Klasse für den Spieler (Jump'n'Run)
class Player {
  constructor(x, y, w, h) {
    // Position und Größe des Spielers
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Bewegungsgeschwindigkeit, Sprungkraft, Schwerkraft und Air-Stair
    this.speed = 5;
    this.jumpStrength = 10;
    this.gravity = 0.5;
    this.airStair = 0;
    this.airStairLimit = 2;
    // Kampfwerte des Spielers
    this.hitpoints = 100;
    this.atkPow = 30;
    this.defPow = 20;
    this.magPow = 50;
    this.mag2nd = 20;
  }

  // Methode zum Zeichnen des Spielers
  draw() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  // Methode zum Bewegen des Spielers
  puppeteer(){
    // PC nach links bewegen
    if (steuerung.links) {
      this.x -= this.speed;
    }
    // PC nach rechts bewegen
    if (steuerung.rechts) {
      this.x += this.speed;
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
}
