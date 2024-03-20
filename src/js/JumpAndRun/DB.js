
// Sigillen
const sigil = {
    dewdropS: {
        name: 'Kleiner Tautropfen',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
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
                imageSrc: './src/img/ntt/sgl/dewdropS_death.png',
            }
        }
    },
    dewdropL: {
        name: 'Großer Tautropfen',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.healcap(50);
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    aetherS: {
        name: 'Geringer Äthertropfen',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.aether += Math.floor(Math.random() * 50) + 50;
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    aetherL: {
        name: 'Immenser Äthertropfen',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.aether += Math.floor(Math.random() * 200) + 200;
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    sglAtk: {
        name: 'Sigille des Furors',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.stats.atk += 10;
            JumpAndRun.myPlayer.stats.atkCD -= 10;
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    sglDef: {
        name: 'Sigille des Schutzes',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.sglEff.def += 1;
            JumpAndRun.myPlayer.stats.def += 10;
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    sglHst: {
        name: 'Sigille der Geschwindigkeit',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.stats.speed += 1;
            JumpAndRun.myPlayer.stats.atkCD -= 10;
        },
        image: new Image(),sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    },
    sglAet: {
        name: 'Sigille der Äthermacht',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 1},
        effect: function () {
            JumpAndRun.myPlayer.stats.atk += JumpAndRun.myPlayer.aether * 0.1;
        },
        image: new Image(),
        sprites: {
            idle:  {
                frMax: 5,
                image: new Image(),
            },
            death: {
                frMax: 4,
                image: new Image(),
            }
        }
    }
}

const enemy = {
    dummy: {
        name: 'Dummy',
        type: 'Enemy',
        size: {w: 0, h: 0, s: 1},
        atkBox: {x: 0, y: 0, w: 0, h: 0, s: 1},
        aiLevel: 0,
        rLength: 0,
        stats: {
            maxHP: 1,
            curHP: 1,
            atk: 0,
            atkCD: 0,
            def: 0,
            speed: 0
        },
        image: new Image(),
        imageSrc: './src/img/ntt/sgl/_idle.png',
        sprites: {
            idle: {
                fraMax: 5,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/_idle.png',
            },
            death: {
                fraMax: 4,
                image: new Image(),
                imageSrc: './src/img/ntt/sgl/_death.png',
            }
        },
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    slime: {
        name: 'Schleim',
        type: 'Enemy',
        aiLevel: 1,
        stats: {
            maxHP: 20,
            curHP: 20,
            atk: 5,
            atkCD: 300,
            def: 5,
            speed: 1
        },
        image: new Image(),
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    goblin: {
        name: 'Goblin',
        type: 'Enemy',
        aiLevel: 2,
        stats: {
            maxHP: 30,
            curHP: 30,
            atk: 10,
            atkCD: 200,
            def: 10,
            speed: 2
        },
        image: new Image(),
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    orc: {
        name: 'Ork',
        type: 'Enemy',
        aiLevel: 3,
        stats: {
            maxHP: 40,
            curHP: 40,
            atk: 15,
            atkCD: 250,
            def: 10,
            speed: 3
        },
        image: new Image(),
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    troll: {
        name: 'Troll',
        type: 'Enemy',
        aiLevel: 4,
        stats: {
            maxHP: 60,
            curHP: 40,
            atk: 50,
            atkCD: 500,
            def: 0,
            speed: 2
        },
        image: new Image(),
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    dragon: {
        name: 'Drache',
        type: 'Enemy',
        aiLevel: 5,
        stats: {
            maxHP: 80,
            curHP: 80,
            atk: 25,
            atkCD: 300,
            def: 20,
            speed: 3
        },
        image: new Image(),
        loot: [null, null, null, null, null, null, null, null, null, null]
    },
    dumbass: {
        name: 'Riesentrottel',
        type: 'Enemy',
        size: {w: 128, h: 128, s: 1},
        stats: {
            maxHP: 5,
            curHP: 5,
            atk: 5,
            atkCD: 500,
            def: 0,
            speed: 0
        },
        atkBox: { pos: {x: 0, y: 0, oX: 0, oY: 0}, size: {w: 0, h: 0, s: 0} },
        hasLoot: true,
        aiLevel: 0,
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
    }
}