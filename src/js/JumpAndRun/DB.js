// Datenbank für Entitäten (mit Ausnahme des Spielers) - geschrieben von AZ
const SIGIL = {
    dewdropS: {
        name: 'Kleiner Tautropfen',
        type: 'Sigil',
        size: {w: 32, h: 32, s: 1},
        velocity: {x: 5, y: 5},
        effect: function () {
            JumpAndRun.myPlayer.healcap(15);
        },
        frMax: 5,
        image: new Image(),
        imageSrc: './src/img/ntt/sgl/dewdropS_idle.png',
        sprites: {
            idle:  {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/dewdropS_idle.png',
            },
            death: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/dewdropS_idle.png',
            }
        }
    },
    // Portal, ergänzt von LP
    Portal: {
        name: 'Portal',
        type: 'Sigil',
        size: {w: 71, h: 128, s: 1},
        velocity: {x: 0, y: 0},
        effect: function () {
            setScore(0,JumpAndRun.curlevel, (new Date().getTime()- JumpAndRun.StartTime.getTime())/1000);

            JumpAndRun.GameRunning = false;
            MainMenuObj.MainMenuMode = 2;
            if(JumpAndRun.curlevel === 0){
                UnlockLevel(0);
            } else{
                UnlockLevel(0,JumpAndRun.curlevel + 1);
            }
            fade("Level Cleared!", function () {
                GameMode = 0;
            });

        },
        image: new Image(),
        frMax: 6,
        imageSrc: './src/img/Portal2.png',
        sprites: {
            idle:  {
                frMax: 6,
                image: new Image(),
                imageSrc: './src/img/Portal2.png',
            },
            death: {
                frMax: 6,
                image: new Image(),
                imageSrc: './src/img/Portal2.png',
            }
        }
    },
    rawlight: {
        name: 'Lichttropfen',
        type: 'Sigil',
        size: {w: 37, h: 52, s: 1},
        velocity: {x: 0, y: 0},
        effect: function () {
            JumpAndRun.lumina += 50;
        },
        frMax: 8,
        image: new Image(),
        imageSrc: './src/img/ntt/sgl/rawlight_idle.png',
        sprites: {
            idle:  {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/rawlight_idle.png',
            },
            death: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/rawlight_idle.png',
            }
        }
    },
    empty: {
        name: 'Leereintrag',
        type: 'Sigil',
        size: {w: 0, h: 0, s: 1},
        velocity: {x: 0, y: 0},
        effect: function () {
        },
        frMax: 1,
        image: new Image(),
        imageSrc: '',
        sprites: {
            idle:  {
                fraMax: 1,
                image: new Image(),
                imageSrc: '',
            },
            death: {
                fraMax: 1,
                image: new Image(),
                imageSrc: '',
            }
        }
    },
}

const ENEMY = {
    dumbass: {
        name: 'Riesentrottel',
        type: 'Enemy',
        size: {w: 128, h: 128, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 25,
            curHP: 25,
            atk: 35,
            atkCD: 500,
            def: 0,
            speed: 1
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 0} },
        hasLoot: true,
        aiLevel: 1,
        aggroRange: 100,
        rLength: 100,
        loot: ['dewdropS'],
        frMax: 4,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
        sprites: {
            idle: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            },
            angriffL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            },
            angriffR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            },
            struckL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            },
            struckR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            },
            death: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/dumbass_idle.png',
            }
        }
    },
    ichtophis: {
        name: 'Ichtophis',
        type: 'Enemy',
        ammo: 'venomshot',
        size: {w: 64, h: 32, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 40,
            curHP: 40,
            atk: 5,
            atkCD: 50,
            def: 15,
            speed: 1
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 32, h: 32, s: 0} },
        hasLoot: true,
        aiLevel: 2,
        aggroRange: 500,
        rLength: 10,
        loot: ['dewdropS', 'empty', 'empty', 'empty'],
        frMax: 4,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
        sprites: {
            idle: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
            },
            attackL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
            },
            attackR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runRight.png',
            },
            runLeft: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
            },
            runRight: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runRight.png',
            },
            struckL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
            },
            struckR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runRight.png',
            },
            death: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/chim-snake_runLeft.png',
            }
        }
    },
    regalmummy: {
        name: 'Königsmumie',
        type: 'Enemy',
        size: {w: 64, h: 64, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 40,
            curHP: 40,
            atk: 10,
            atkCD: 100,
            def: 30,
            speed: 3
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 32, h: 32, s: 0} },
        hasLoot: true,
        aiLevel: 1,
        aggroRange: 200,
        rLength: 10,
        loot: ['dewdropS', 'dewdropS', 'empty', 'empty'],
        frMax: 8,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/mummy_idleL.png',
        sprites: {
            idle: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_idleL.png',
            },
            attackL: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_attackL.png',
            },
            attackR: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_attackR.png',
            },
            runLeft: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_runL.png',
            },
            runRight: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_runR.png',
            },
            struckL: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            },
            struckR: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runRight.png',
            },
            death: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/mummy_idleL.png',
            }
        }
    },
    royalkitty: {
        name: 'Königsflausch',
        type: 'Enemy',
        size: {w: 96, h: 48, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 60,
            curHP: 60,
            atk: 20,
            atkCD: 100,
            def: 10,
            speed: 3
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 32, h: 32, s: 0} },
        hasLoot: true,
        aiLevel: 1,
        aggroRange: 200,
        rLength: 10,
        loot: ['dewdropS', 'empty', 'empty', 'empty'],
        frMax: 8,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
        sprites: {
            idle: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            },
            attackL: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            },
            attackR: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runRight.png',
            },
            runLeft: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            },
            runRight: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runRight.png',
            },
            struckL: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            },
            struckR: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runRight.png',
            },
            death: {
                fraMax: 8,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/royalkitty_runLeft.png',
            }
        }
    },
    yamoma: {
        name: 'Yamoma',
        honorific: 'Vertilger von Hoffnung, Unbesehenes Auge, Abgesandter der Verdammis, Inkarnation der Entropie',
        type: 'Enemy',
        size: {w: 64, h: 64, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 99999,
            curHP: 99999,
            atk: 99999,
            atkCD: 1,
            def: 99999,
            speed: 0
        },
        atkBox: { pos: {x: 1, y: 1, oX: 1, oY: 1}, size: {w: 1, h: 1, s: 1} },
        hasLoot: false,
        aiLevel: 0,
        aggroRange: 0,
        rLength: 0,
        loot: [],
        frMax: 1,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/yamoma_idle.png',
        sprites: {
            idle: {
                fraMax: 1,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/yamoma_idle.png',
            }
        }
    }
    // Vorlage für weitere Gegner
    /*
    changethis: {
        name: '_',
        type: 'Enemy', //
        size: {w: 64, h: 64, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 25,
            curHP: 25,
            atk: 25,
            atkCD: 25,
            def: 25,
            speed: 1
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 0} },
        hasLoot: true,
        aiLevel: 1,
        aggroRange: 300,
        rLength: 100,
        loot: ['beispiel1','beispiel2'],
        frMax: 4,
        image: new Image(),
        imageSrc: './src/img/ntt/nmy/changethis_idle.png',
        sprites: {
            idle: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_idle.png',
            },
            attackL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_attackL.png',
            },
            attackR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_attackR.png',
            },
            struckL: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_struckL.png',
            },
            struckR: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_struckR.png',
            },
            death: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/nmy/changethis_death.png',
            }
        }
    }
    */
}

// Projektile
const MISSILE = {
    venomshot: {
        name: 'Giftschuss',
        type: 'Missile',
        size: {w: 34, h: 28, s: 1},
        velocity: {x: 0, y: 0},
        stats: {
            maxHP: 150,
            curHP: 150,
            atk: 10,
            atkCD: 100,
            def: 0,
            speed: 1
        },
        effect: function () {
            JumpAndRun.struck(this, JumpAndRun.myPlayer);
        },
        invulnerable: true,
        frMax: 5,
        image: new Image(),
        imageSrc: './src/img/ntt/prj/venomshot_idle.png',
        sprites: {
            idle: {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/prj/venomshot_idle.png',
            },
            death: {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/prj/venomshot_idle.png',
            }
        }
    }
    /*
    // Vorlage für weitere Projektile
    venomshot: {
        name: 'Giftschuss',
        type: 'Projectile',
        size: {w: 34, h: 28, s: 1},
        velocity: {x: 0, y: 0},
        damage,
        effect: function () {
            JumpAndRun.myPlayer.healcap(15);
        },
        frMax: 5,
        image: new Image(),
        imageSrc: './src/img/ntt/prj/venomshot_idle.png',
        sprites: {
            idle: {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/prj/venomshot_idle.png',
            },
            death: {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/prj/venomshot_idle.png',
            }
        }
    }
    */
}

const TUTSHEETS = [
    {start: 32, end: 300, image: './src/img/tut/ts01.png'}, // Bewegen links/rechts
    {start: 700, end: 950, image: './src/img/tut/ts02.png'}, // Springen
    {start: 1300, end: 1650, image: './src/img/tut/ts03p.png'}, //Angreifen
    {start: 1900, end: 2100, image: './src/img/tut/ts04.png'}, // Einsammeln/Tautropfen
    {start: 2300, end: 2475, image: './src/img/tut/ts05.png'}, // Double Jump
    {start: 2600, end: 3000, image: './src/img/tut/ts06.png'}, // Fernkampfgegner
    {start: 3700, end: 3950, image: './src/img/tut/ts07.png'}, // Slide/Dash
    {start: 4550, end: 5000, image: './src/img/tut/ts08p.png'}, // "Bosskampf"
    {start: 5800, end: 6100, image: './src/img/tut/ts09.png'} // Portal
]