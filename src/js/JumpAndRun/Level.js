// JS-Datei für eine Auswahl an Leveln, wird später in eine JSON-Datei ausgelagert
// geschrieben von: AZ
const LEVELS = [
    {
        name: "void00",
        theme: "void",
        tileset: "./src/img/tileset/ts_void00.png",
        bgimg: "./src/img/bgimg/bgimg_void00.jpg",
        map: {
            width: 200,
            height: 15,
            pattern: [
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',//00
                'H                                                                                                                                                                                                      H',//01
                'H                                                                                                                                                                                                      H',//02
                'H                                                                                                                                                                                                      H',//03
                'H                                                                                                                                                                                                      H',//04
                'H                                                                                                                                                                                                      H',//05
                'H                                                                               7020108                                                        70058                                                   H',//06
                'H                                                                               6     9                                                        6   9                                                   H',//07
                'H                                                            700308             6     9                                                        6   9                                                   H',//08
                'H                           700208                           6    9             6     9                             70001008           70043001H   9                                                   H',//09
                'H000000000200000000030000020H    H300100002020100040003000010H    H0000002000300H     9                             6      9           6           H000410502000000030000050000000101000000003000001002H',//10
                'H                                                                                     H40001030000020000000100003001H      H00050100000H                                                               H',//11
                'H                                                                                                                                                                                                      H',//12
                'H                                                                                                                                                                                                      H',//13
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH' //14
            ],
            mask: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            solid: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'H'],
            spawn: {
                player: { x: 120, y: 140 }
            }
        }
    },
    {
        name: "egypt01",
        theme: "egypt",
        tileset: "",
        bgimg: "",
        map: {
            width: 200,
            height: 15,
            pattern: [
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//00
                'EEEEEEEEEEEEEEEEEE         EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE           EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//01
                'EEEE    EEEEEEEE             EEEEEEEEEEEEEEEEEEEEEEEEEEEEE                       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                         EEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//02
                'EE                               EEEEEEEEEEEEEEEEEEEEE                              EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                EEEEEE                      EEEEEEEEEEEEEE             EEEEEEEEEEEEEEEEEEEE              EEEEEEEEEEEEEEEEEEEE',//03
                'EE                  EEEE           EEEEEEEEEEEEEEEEE            EEEEEEE              EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE        EEEEEEEEEEEE                                            EEEEEEEEE                      EEEEEEEEEEE                    EEEEEEEEEEEEEEEEE',//04
                'EE               EEEEEEEEEE         EEEEEEEEEEE             EEEEEEEEEEEEEE            EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEE                                            EEEE         EEEE                  EEE                        EEEEEEEEEEEEEEE',//05
                'EEE      EEEEEEEEEEEEEEEEEEEE        EEEEEEEE            EEEEEEEEEEEEEEEEEEE          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEE                   EEEEEEEEEEEE                       EEEEEEEEE                                         EEEEEEEEEEEEEEE',//06
                'EEEE    EEEEEEEEEEEEEEEEEEEEEEE       EEEE            EEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEE            EEEEEEEEEEEEEEEEEEEEE             EEEEEEEEEEEEEEEEEE                                    EEEEEEEEEEEEEEE',//07
                'EEEEE   EEEEEEEEEEEEEEEEEEEEEEEE                 EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE        EEEEEEEEEEEEEEEEEEEEEEEEEE                              EEEEEEEEEEEEEEE',//08
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE              EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE               EEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                     EEEEEEEEEEEEEEEEE',//09
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                   EEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE               EEEEEEEEEEEEEEEEEEEE',//10
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//11
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEEE        EEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEE   EEEEEEEEEEEE        EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//12
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEE                EEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//13
                'EEEEEEEEEE          EEEEEEEE              EEEEEEEEEEEEEE                  EEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//14
                'EEEEEE                                   EEEEEEEEEEEEEEEE      EEEEEE     EEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//15
                'EEEE                                   EEEEEEEEEEEEEEEE      EEEEEEEEE     EEEEEEEEEEEEEEEEE          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//16
                'EE       EEEEEEEEE            EEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEE     EEEEEEEEEEEEEEEE           EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//17
                'EE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE        EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//18
                'EEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                              EEEEEEEEEEE',//19
                'EEEE     EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                 EEEEEEEEEEEEEEEEEEEEEEEEEE                        EEEEEEEEEEEEEEEEEEEEEEEEEEEEE                                      EEEEEEEEE',//20
                'EEEE     EEEEEEEEEEEEEEEEE         EEEEEEEEEEEEEEEEEEEEE     EEEEEEEEE     EEEEEEEEEEEEEEEEEEEEEEE       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                  EEEEEEEEEEEEEEEEE                                   EEEEEEEEEEEEEEEEEEEEEE                                         EEEEEEEE',//21
                'EEE    EEEEEEEEEEEEE                  EEEEEEEEEEEEEEEE      EEEEEEEEEEEE    EEEEEEEEEEEEEEEEEEEEEEEE          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                       EEEE                       EEEEEEE               EEEEEEEEEEEEEEEEE                                            EEEEEEE',//22
                'EE     EEEEEEEE                        EEEEEEEEE            EEEEEEEEEEEE      EEEEEEEEEEEEEEEE                         EEEEEEEEEEEE               EEEEEE                            EEEEEEEEEEEEEEEEEEEEE             EEEEEEEEEEEE        EE                                    EEEEEEEE',//23
                'EEE      EEEE              EEEEEE       EEEE               EEEEEEEEEEEEEE                               EE                                      EEEEEEEEEEE                     EEEEEEEEEEEEEEEEEEEEEEEEEEEEE                            EEEE                                  EEEEEEEEE',//24
                'EEEE                  EEEEEEEEEEEEE                   EEEEEEEEEEEEEEEEEEEEE                      EEEEEEEEEEE                                 EEEEEEEEEEEEEEEEEEE           EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE                      EEEEEEE                                EEEEEEEEEE',//25
                'EEEEEE         EEEEEEEEEEEEEEEEEEEEEE          EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE        EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE      EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',//26
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE' //27
                //	'0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
            ],
            mask: ['', '', '', '', '', '', '', '', '', ''],
            solid: ['', '', '', '', '', '', '', '', '', ''],
            spawn: [
                player = {x: 120, y: 360}
            ]
        },
    },
    {
        name: "egypt02",
        theme: "egypt",
        tileset: "",
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
            spawn: [
                player = {x: 120, y: 360}
            ]
        }
    }
]