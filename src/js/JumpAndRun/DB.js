// Datenbank für Entitäten (mit Ausnahme des Spielers) - geschrieben von AZ
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
    // Portal, ergänzt von LP
    Portal: {
        name: 'Portal',
        type: 'Sigil',
        size: {w: 261, h: 469, s: 0.3},
        effect: function () {
            JumpAndRun.GameRunning = false;
            if(JumpAndRun.curlevel === 0){
                Unlocks[0].unlocked = true;
            } else if(JumpAndRun.curlevel === 1){
                Unlocks[0].Unlock.Level2 = true;
            }else if(JumpAndRun.curlevel === 2){
                Unlocks[0].Unlock.Level3 = true;
            }
            GameMode = 0;

        },
        image: new Image(),
        frMax: 6,
        imageSrc: './src/img/Portal.png',
        sprites: {
            idle:  {
                frMax: 6,
                image: new Image(),
                imageSrc: './src/img/Portal.png',
            },
            death: {
                frMax: 6,
                image: new Image(),
                imageSrc: './src/img/Portal.png',
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
            maxHP: 25,
            curHP: 25,
            atk: 35,
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