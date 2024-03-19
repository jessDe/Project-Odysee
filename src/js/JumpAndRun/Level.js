// noinspection SpellCheckingInspection
const LEVELS = [
    {
        name: "void00",
        realm: "void",
        tileset: "./src/img/tileset/ts_void00.png",
        bgimg: "./src/img/bgimg/bgimg_void00.jpg",
        map: {
            width: 200,
            height: 17,
            pattern: [
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',//00
                'H                                                                                                                                                                                                      H',//01
                'H                                                                                                                                                                                                      H',//02
                'H                                                                                                                                                                                                      H',//03
                'H                                                                                                                                                                                                      H',//04
                'H                                                                                                                                                                                                      H',//05
                'H                                                                                                                                                                                                      H',//06
                'H                                                                               7020108                                                        70058                                                   H',//07
                'H                                                                               6     9                                                        6   9                                                   H',//08
                'H                                                            700308             6     s                                                        6   9                                                   H',//09
                'H                           700208                           6    9             6     s                             70001008           70043001H   9                                                   H',//10
                'H000000000200000000030000020H    H300100002020100040003000010H    H0000002000300H     9                             6      9           6           H000410502000000030000050000000101000000003000001002H',//11
                'H                                                                                     H40001030000020000000100003001H      H00050100000H                                                               H',//12
                'H                                                                                                                                                                                                      H',//13
                'H                                                                                                                                                                                                      H',//14
                'H                                                                                    HH                                                                                                                H',//15
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH' //16
            ],
            mask: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 's'],
            solid: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'H'],
            spawn: {
                player: { x: 120, y: 140, oX: 0, oY: 0 },
                sigils: [
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 200, y: 240, oX: 0, oY: 0 }},
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 300, y: 240, oX: 0, oY: 0 }}
                ],
                enemies: [
                    { name: 'dumbass', type: 'Enemy', pos: {x: 800, y: 140, oX: 0, oY: 0 }}
                ]
            }
        }
    },
    {
        name: "egypt01",
        realm: "egypt",
        tileset: "./src/img/tileset/ts_egypt_rock.png",
        bgimg: "./src/img/bgimg/bgimg_egyptProxy.jpg",
        map: {
            width: 280,
            height: 28,
            pattern: [
                'MMMMMMMMMMMMMMMMMSSSSSSSSSSMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMSSSSSSSSSSSMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//00
                'MMMMSSSSMMMMMSSE           DSSSMMMMMMMMMMMMMMMMMMMMMMMMMMMSSSSE           WSSSSSSMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//01
                'MMMC    WSSSE                  DSSMMMMMMMMMMMMMMMMMMMMSSSE                       DSSMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                         WMMMMMMMMMMMMMMMME      WMMMMMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//02
                'ME                                DSMMMMMMMMMMMMMMSSSE                              DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                                WMMMME                      WMMMMMMMMMMMME             WMMMMMMMMMMMMMMMMMME              WMMMMMMMMMMMMMMMMMMM',//03
                'ME                  ANNB            DMMMMMMMMMSSSE                                   DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME        WMMMMMMMMMME                                            WMMMMMMME                      WMMMMMMMMME                    WMMMMMMMMMMMMMMMM',//04
                'ME               ANNMMMMNNB          DMMMMMMME               WNNNNNNNNNNE            DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMME                                            WMME         WMME                  WME                        WMMMMMMMMMMMMMM',//05
                'MMB       ANNNNNNMMMMMMMMMMMB         DMMMMSC             WNNMMMMMMMMMMMMNNE          WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME     WMMMMMMMMMMMMMMMMMMME                   WMMMMMMMMMME                       WMMMMMMME                                         WMMMMMMMMMMMMMM',//06
                'MMMB     WMMMMMMMMMMMMMMMMMMMMB        DSSC           WNNNMMMMMMMMMMMMMMMMMME       ANMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME     WMMMMMMMMMMMMMMMMMMMMMMME            WMMMMMMMMMMMMMMMMMMME             WMMMMMMMMMMMMMMMME                                    WMMMMMMMMMMMMMM',//07
                'MMMMB   WMMMMMMMMMMMMMMMMMMMMMMB                   WNNNMMMMMMMMMMMMMMMMMMMMMMNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME     WMMMMMMMMMMMME     WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME        WMMMMMMMMMMMMMMMMMMMMMMMME                              WMMMMMMMMMMMMMM',//08
                'MMMMMNNNMMMMMMMMMMMMMMMMMMMMMMMMB                WNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME               WMMMME      WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME      WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                     WMMMMMMMMMMMMMMMM',//09
                'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNB          WNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                   WME     WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME               WMMMMMMMMMMMMMMMMMMM',//10
                'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMC       WNNMMMMMMMMMMMSSSSSSSSMMMMMMMMMMMMMMMMMMMMMMMMMSSSSSSSMMMMMMMMMMMMMMMMMME                          WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//11
                'MMMMMMMMMMSSSSSSSSSSMMMMMMMMSSSSSSC       WMMMMMMMMMMMMMC        WSSSSSSMMMMMMMMMMMMMMMMME       DMMMMMMMMMMMMMMMMMMME   WMMMMMMMMMME        WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//12
                'MMMMMMMMME          WSSSSSSE              WMMMMMMMMMMMME                WSMMMMMMMMMMMMMME         DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME      WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//13
                'MMMMMMSSC                                 WMMMMMMMMMMMME                  WMMMMMMMMMMMMME          DSSMMMMMMMMMMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//14
                'MMMMSC                                    WMMMMMMMMMMMSC                   WMMMMMMMMMMMMMNNB          WMMMMMMMMMMMMMMMMMMMMMMMMMMMMME      WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//15
                'MMSE                                   WMMMMMMMMMMMMMC        WNNNNE       WMMMMMMMMMMMMMMSC          DMMMMMMMMMMMMMMMMMMMMMMMMMMMME     WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//16
                'ME           ANNNNE            WNNNNNNMMMMMMMMMMMMMME        WMMMMMMNE      WMMMMMMMMMMMME             DSMMMMMMMMMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//17
                'ME         ANMMMMMMNNNNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMC       WMMMMMMMME      WMMMMMMMMMMMMMNNNNNNNB       WMMMMMMMMMMMMMMMMMMMMMMMMME        WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//18
                'MMB       AMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME         WMMMMMMMME      WMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                              WMMMMMMMMMM',//19
                'MMB       WMMMMMMMMMMMMMMMSSSSSSSSSMMMMMMMMMMMMMMMMMB        WMMMMMMME        WMMMMMMMMMMMMMMMMMME     WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                 WMMMMMMMMMMMMMMMMMMMMMMMME                        WMMMMMMMMMMMMMMMMMMMMMMMMMMME                                      WMMMMMMMM',//20
                'MMC       WMMMMMMMMMSSSSSE         WSSMMMMMMMMMMMMMMC        WMMMMMMME        WMMMMMMMMMMMMMMMMMME       WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                  WMMMMMMMMMMMMMMME                                   WMMMMMMMMMMMMMMMMMMMME                                         WMMMMMMM',//21
                'MMC     ANMMMMMMSSSE                  WSSMMMMMMSSSSC        AMMMMMMMMMME         WMMMMMMMMMMMMMMMMME          WSSSSSSSSMMMMMMMMMMMMSSSSSSSSE                       WMME                       WMMMMME               WMMMMMMMMMMMMMMME                                            WMMMMMM',//22
                'ME      DSSSSSSE                         WSSSSSC            WMMMMMMMMMME                                               WMMMMMMMMMME               WMMMME                            WMMMMMMMMMMMMMMMMMMME             WMMMMMMMMMME        WE                                    WMMMMMMM',//23
                'MMB                        ANNNNB                          AMMMMMMMMMMMME                               WE                                      WMMMMMMMMME                     WMMMMMMMMMMMMMMMMMMMMMMMMMMME                            WMME                                  WMMMMMMMM',//24
                'MMMB                  ANNNNMMMMMMNB                   ANNNNMMMMMMMMMMMMMMME                      WMMMMMMMMME                                 WMMMMMMMMMMMMMMMMME           WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME                      WMMMMME                                WMMMMMMMMM',//25
                'MMMMNB            ANNNMMMMMMMMMMMMMNB          ANNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME        WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMME      WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',//26
                'MMMMMMNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM' //27
                //	'0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
            ],
            mask: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C'],
            solid: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C'],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 200, y: 240, oX: 0, oY: 0 }},
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 300, y: 240, oX: 0, oY: 0 }}
                ],
                enemies: [
                    { name: 'dumbass', type: 'Enemy', pos: {x: 800, y: 140, oX: 0, oY: 0 }}
                ]
            },

        },
    },
    {
        name: "egypt02",
        realm: "egypt",
        tileset: "./src/img/tileset/ts_egypt_sand.png",
        bgimg: "",
        map: {
            width: 200,
            height: 15,
            pattern: [
                'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',//00
                'M                                                                                                                                                                                                                                                                                       ',//01
                'M                                                                                                                                                                                                                                                                                       ',//02
                'M                                                                                                                                                                                                                                                                                       ',//03
                'M               PP         PP                                                                                                PPPP                                                                                                                                                       ',//04
                'M                                                                                                                                    PP                                                                                                                                                 ',//05
                'M                                                      PPPPPPPPP                                                                                                                                                                                          PP                            ',//06
                'M         PP                                                                                                                               XX                                                                                                            PPPP                           ',//07
                'M                                                                 XX                                                                                                                                                                                      PP                            ',//08
                'M                                                                                                                                               PP                                                                                                       PPPP                           ',//09
                'M                                                              P                                                                              PPPPPP                                                                                                      PP                            ',//10
                'M     PPPP                                                                                                                                      PP                                                                                                       PPPP                           ',//11
                'M                 PP                                                                                                                            PP                                                                     PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP                         ',//12
                'M                                                          XX         EEEE                                                                    PPPPPP                                                               PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP                         ',//13
                'M                                                                   EEEEEEEEEE                                                                  PP                                                       PPPP       PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP                         ',//14
                'M                     PPPP                                        EEEEEEEEEEEEEEEEEEEEEEEEE           EE  EE                                    PP             PPPP                              PPPP                 PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP                           ',//15
                'M                                                               EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                  PPPPPP                                     PPPP                             PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP                               ',//16
                'M             PPPP                                            EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                 PP                               PPPP                                                                                                   ',//17
                'M                                                           EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                               PP                                                                                                                                      ',//18
                'M                               EE  EEEE    EE            EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                           PPPPPP                                                                                                                                    ',//19
                'EEEEEEE            EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                     PP                                                                 ',//20
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE         EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE   EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE           PP          PP                                                                             ',//21
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                   EEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                             PPPP                                                   ',//22
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                      EEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                                                                                    ',//23
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                    EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                                                                                    ',//24
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                         EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                                                                                      ',//25
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                  EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                                                                                        ',//26
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                                                                                          ' //27
                //	'0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
            ],
            mask: ['', '', '', '', '', '', '', '', '', ''],
            solid: ['', '', '', '', '', '', '', '', '', ''],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    {}
                ],
                enemies: [
                    {}
                ]
            },

        }
    }
]