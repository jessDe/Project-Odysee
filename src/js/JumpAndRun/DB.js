
// Sigillen
const sigil = {
    dewdropS: {
        name: 'Kleiner Tautropfen',
        type: 'Sigil',
        size: {w: 18, h: 19, s: 4},
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
    },
    yamoma: {
        name: 'Yamoma',
        honorific: 'Vertilger von Hoffnung, Unbesehenes Auge, Abgesandter der Verdammis, Inkarnation der Entropie',
        type: 'Enemy',
        size: {w: 64, h: 64, s: 1},
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
}