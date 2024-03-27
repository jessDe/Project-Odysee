// Datenbank für Level, mit zusätzlichen Informationen für jedes Level - geschrieben von AZ
const LEVELS = [
    {
        name: "void00",
        realm: "void",
        tileset: "./src/img/tileset/ts_void00.png",
        bgimg: "./src/img/bgimg/bgimg_void00.jpg",
        type: "tutorial",
        map: {
            width: 200,
            height: 17,
            pattern: [
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',//00
                'H                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                      H',//02
                'H                                                                                                                                                                                                      H',//03
                'H                                                                                                                                                                                                      H',//04
                'H                                                                                                                                                                                                      H',//05
                'H                                                                               7020108                                                                                                                H',//06
                'H                                                                               6     9                                                        70058                                                   H',//07
                'H                                                                               6     9                                                        6   9                                                   H',//08
                'H                                                            700308             6     9                                                        6   9                                                   H',//09
                'H                           700208                           6    9             6     9                             70001008           70043001H   9                                                   H',//10
                'H000000000200000000030000020H    H300100002020100040003000010H    H0000002000300H     9                             6      9           6           H000410502000000030000050000000101000000003000001002H',//11
                'H                                                                                     H40001030000020000000100003001H      H00050100000H                                                               H',//12
                'H                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                      H',//14
                'H                                                                                    HH                                                                                                                H',//15
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH' //16
            ],
            mask: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 's'],
            solid: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'H'],
            spawn: {
                player: { x: 120, y: 140, oX: 0, oY: 0 },
                sigils: [
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 200, y: 260, oX: 0, oY: 0 }},
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 2100, y: 288, oX: 0, oY: 0 }},
                    { name: 'Portal', type: 'Sigil', pos: {x: 6200, y: 200, oX: 0, oY: 0 }}
                ],
                enemies: [
                    { name: 'ichtophis', type: 'Enemy', pos: {x: 3232, y: 280, oX: 0, oY: 0 }}
                ]
            }
        }
    },
    {
        name: "egypt01",
        realm: "egypt",
        tileset: "./src/img/tileset/ts_egypt_full.png",
        bgimg: "./src/img/bgimg/bgimg_egypt_v2.png",
        type: "underground",
        map: {
            width: 280,
            height: 29,
            pattern: [
                'mmscmmmdssscmmmmsssssssssssmmmmmmdmmmmmmmmmmmmmmsscmmmmmmmmmmmmsssssssssssmmmmmmmdssmmmmmmmmmmmmsssscmdssmmmmmmmmsssscmmmwmmmmmmmmmmmmmmsssscmmmmmmmmmmmmmdsssmmmmmmmmemmmmmmsscmdsssmmmmmmmmmssssssssmmmmmmmmmmmmssssscmmmmmmmmdssmmmmmmmmmmmmmmmmmssssssssscmmdssmmmmmmmemmmmmmmmmmmmm',
                'scmmssssmmmmmssc           dsssmmmdsssmmmmmmmmmemmmmmmmmssssssc           dssssssmmmdsmmmmmmmmmemmmmmmmmmwmmmmmmemmmmmmmmdmmmmmmmmmsssscmmssssssssssssssssmmmmdssssssscmmmmmcmmmmmmmmdssssssscmmmmmmmmdssssmmmmmscmmmmsssssssssssmmdsmmmmmmmmmssssscmmmmmmmmmmmmmmmdsssssscmmmmmmmmmmmmm',
                'mmmc    dsssc                  dssmmmmdsmmmmssscmmmmmssc                         dssmmwmmmmmsscmmmmmmmmmmdsssssscmmmmmmmmmwmmmmmmmcmmmmssc                dsmmmmmmmmmdssssscmmsssssssssmmmmmmmmsssssssssmmmdssscmmmssc           dmmmdssssmmmemmmmmmmmmsssssssssssssmmmmmmmmmmmmmmmmmmmm',
                'mmc                               dsmmmmdsscmmmmmsssc                               dmdsssscmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmwmmmmmmemmmmc                     dssssssssssssssssc         dssssssc         dsmmmmmmssc               dsssssmmdsscmmmmmsssc             dssmmmmmmmmmmmmmmmmm',
                'we                  annb            dmmmmmmmmmssc                                    xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimwmmmmmmemmmc                                                                    dmmmsc                        dsssssmmmsc                    dssmmmmmmmmmmmmmm',
                'we               annmmmmnnb          dmmmmmmme               annnnnnnnnnb             uiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimdmmmmmmcmme         annnb                                                        dsc                                dsc                         uiiiiiiiiiiimm',
                'wmb      annnnnnnmmannnnbmmnb         dmmmssc             annmmmmmannnbmmnnb          uiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimmdsssscmmmmb      anmmabmnnb                                                                   annnb                                            uiiiiiiiiiiimm',
                'bme      wmannnnnnnmmmmmmbmmmnb        dsc            annnmmannnnnmmmmemmmmmb       anmannbmmmmmmmmmmmmmmmmmmmmmmmmmmsyyyssmmmmmmmmmmmb     dsmmwmnnbmnnb                                                            annnmmmme                                            uiiiiiiiiiiimm',
                'mbmb    ammwmmmmmmmmmmmmmmnnbmmb                   annmmannnmmmmmmmmmmmnbmmmmnnnnnnnmanmmmmbmmmannbmmannnnnbmmmmmmmmc      dssssssmmmmmnb     dmdmmmmnnbmnnnnnnnnnb     annb    anb                annb            anmmmmmanbmnnnnnnnb                                   ammmmannnbiiimm',
                'memmnnnnmmammmmmmmssssmmmmmscmmmnb               anmannnmmmmsssssssmmmmmmnnnbmmmmmannmmssmmmnnnmmmcmamannbmemmmabmme              dsssssc      wmwmmmmmcmmmmmmmmmsc     wmmmnnnnmmmnb           annmmmmb        annmannnnnmmemmmmmmmmmnnnnnb        anb                anmmmmmwmssciiimm',
                'mmnnnnbmmmdsssssscmmmmdssscmmmmmmmnb          annmmmwmmmmsscmmmmmmmdssssmmmmmnnnnnmmmmemmdssssssscmmwmdsmmbemmmdmnbe                           wmwmmmmemmanbiiiio      ammmanbmmmmmmmnnnnnnnnnnnmmannbmmnnnnnnnnnnnnmmmmmmmmmnnnbmmmmmmmmmmmnnnnnnnnmme             annannbmmmwmnbmiiimm',
                'mmmmmmemmmssssssssssmmmmmmmmsssssssc       annmmmmmmwmsscmmmsssssmmmmmmmdsmmmmmmmmmmmmmbmmssssssmmmmwmmmdmembmmmwmee                          ammwmmmmemmwmeiiiio      dmmmwmmnnnbmmmmmmmmmmmannnnmmmemmmmmmmabmababmabababmabannnbmannbmmmannnbmmmmmmmnnnnnnnnnnnnnmmammmemmmdssmbiiimm',
                'mmmmmmcmme          dsmmmmmc              ammmannbmmdcmmmssc     dsssssmmmdssmmmmmmmmmmemc      dsmmdssmmwmnnnnnnbee                         ammammmmmmnnmmeiiiio       wmmwmmmmmmnnnnnbmmmmmwmmmmmmmmnnnbmmmwemweweamcwewmbwewmsscamsscmmammmmmnnbmmmmmmmmmmmannnnnnnmmmmemmmannmciiimm',
                'mmmsscmmmc            ssssc              ammanmmmemmmmmsc              dsmmmmwmmmmmmmmmee         dmmmmwmwmmmmmmmece             annb      anmmmwmmmmmmmmmmeiiiannb     wmammmmmmmmmmmmmnbmmmdsmmmmmmmmmmemmmwemwewmmcmwewmmweweabmdmmbmmmwmmmmmmmmnnnnnnnnnnnmmmmmmmmmmmmemmmdsscmiiimm',
                'sscmmmssc                                dsmdsmmmmnbmsc                  dmmmwmmmssssmmee          dsmmwmdsssmmmmemmb      annnnnmmmc      wmmanmmmmmmmmmmmeiiiwmmmnnnnnmmwmmmmmmmmmmmmmmemmmmmwmmmmmmmmmemmmdemwcwmmbmwewemmewedmbmdmmbmmwmmssssssssssssssssssssssssssssscssmmmmmmiiimm',
                'mmmmsc                                     wmmwmmmmee                     dmmdsscmmmmdmemnnnb        dmdsssmmwmmmemmmnnnnnnmmmmmmmme     anmmmdsmmmmmmmmmmmeiiiwmannbmmmmmwmmmmmmmmmmmmmscmmmmammmmsssssscmmmmwnemwedmbwewedmewmnmeannmcmmdscmmsssssssssssssssssssssssssssssmdmmmmmiiimm',
                'mmsc                                   annnmmmdssmmee         annnnb       wmmwemmssmmdcmmmme         dsmmmwmdmmmennnnbmmmmannbmmmmc     dsssmmmdsmmmmmmmmsciiidammmmnnnnnmmmmmmmmssssscmmmmmmdssscmmmmmmmmmmmdscmdcmdcdcdcmdcdssscdsscmmmmmmmc                             dmwmmmmiiimm',
                'we           annnnb            annnnnnnmmmmanbmmmbmee       anmmanbmb      dmmdcme  dmmmmanbmb          wmmwmmdsscmmmmmnnnnmmmmbmme          dsmmmdsssssscmmiiimwmmmmmmmmmmmmmmmscmmmmmmmmssssssssssssssssmmmmmwmmmmmmmmmmmmmmsmmmmscmmssssssc                               wwmmmmiiimm',
                'we       annnmannbmnnnnnnnnnnnnmmmmmmmmmannmmemmmememnnb    dmanmmmbmb      dmmmme   dmmammemmnnb     anmanmmmmmmmmmmmmmmmmmmmmemmmb           dsmmmmmmmmmmmyyymwmmmmmmmmsssssscmmsssssssc                dsmmmdssssmmmmmmmmmemdsscmmsc                                      wwmmmmiiimm',
                'wmb      wannnmmmmnnnnbmmmssssssssmmmmmammmmmmnnnnmemmmc     wdmmmmemmb      wmmmmb   wmwmmmnnbme    ammmdsssssmmmmmmmmmmmmmmmmmnbmmnb           dssssssssme   wdsssmmmmcmmmmssssc                          dsmmmmmmwmmmmmmmmemmmmmsc                                        wwmmmmiiimm',
                'bme      wwmmmsssssssscmsc        dsmmmdssmmmmssssscmmc      wmwmmmmbmc      wmmmme   wmdssssscmmb   dssssssmmmdsmmmmmmmmmmmmmmmmcmmmmnb                  dc   dsmmmdsscmsssc                                 dssssmdsssssssscmmmsc                                          wwmmmmiiimm',
                'cme     amdsscmmmmmssssc            dssmmmdsscmmmmmmsc       wmwmmmmee        dssme   wmmssssssssc          dsssmdsssssssmmmmmmmemmmmmmmnb                       dsmmmmsc                                          dssssssssssssc                                            wwmmmmiiimm',
                'wmc     wmmmmmssssc                    dssmmmmmssssc       anmmwmmmmemnb         dc   dsc                       dssssssmmdsssssscmsssssssc                         dssc                       annnnnb                                     annb                               wwmmmmiiimm',
                'we      dssssc                            dsssc            wmmamannbmbme                                               dsssssssssc                                                   annnnnnnnmmmmmmmnnb                                 ammme                               wwmmmmiiimm',
                'wmnb                       annnb                          amanmammmememmb                                                                       annnnnnnnnb                     annnnmmmmmmmmmmannnbmmmmnnb                             ammmmmb                             amwmmmmiiimm',
                'nbme                  annnnmmmmmnnb                    annmmwmmwmmmmbmbmmnb                 annb annnnnnnb                                    anmmmmmmmmmmmnb               annnmmmmmmmannnnnnnmmmmmnnbmmmmnnnb                      annmmmanbmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnmammmmmiiimm',
                'mmbmb             annnmmmmmmannbmmmnb               annmmmmammmwmmmmemmnbmmnnnnnnnb   annnnnmmmmnmmannnbmmnnnnnnnnb                    annnnnnmmmmannnnnbmmmmnnnnnnnnnnnnnnnmmmmmmannnnmmmmmmmmannbmmmmnbmmmmmmnnnnnnnnnb      annnnnmmmmannbemmmannnnnnnnnnnnnnnnnnnnnnnnnnnmmmmmmiiimm',
                'mmemmnnnnnnnnnnnnnmmmmmannnnmmmmnbmmmnnnnnnnnnnnnnnnmmannnnmmmammmmmmnbmmnnnnnnnnbmnnnmmmmmannbmmmammmmmnnbmmmmmmmmnnnnnnnnnnnnnnnnnnnnmmmmmmmmmmammmmmmmnnnnbmmmmmmmmmmmmmmmannnnmmmmmannbmmmammmmbmmmmmnnbmmmmmmmmmmmmmnnnnnnmmmmmmannnmmmmnbmmwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   mm',
                'mmmbmannnnnnnnnbmannnnnmmmmmmmmmmmnnnnnbmmmmmmmmmmmmanmmmmmmmmwmmmmmmmemmmmannnnnnnbmmmmannnnnnnnnmmmmmmmmmnnnnnnbmmmmmmmmmmmmmmmmmmmmmmmannnnnnnmmannnnnnnbmmnnnnnnnnnnnnnnnmmmmmmmannmmmmnnnmmmmmmnnnnbmmmnnnnnnnbmmmannnnnnbmmmmmmwmmmmmmmmmnnnbmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmHHHmm'
            ],
            mask: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'q', 'r', 't', 'u', 'i', 'o', 'x', 'y', 'z'],
            solid: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'H'],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    {name: 'rawlight', type: 'Sigil', pos: {x: 384, y: 100, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 512, y: 68, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 644, y: 36, oX: 0, oY: 0}},
                    {name: 'Portal', type: 'Sigil', pos: {x: 8448, y: 650, oX: 0, oY: 0}}
                ],
                enemies: [
                    //{name: 'yamoma', type: 'Enemy', pos: {x: 8810, y: 840, oX: 0, oY: 0 }}
                ]
            },

        },
    },
    {
        name: "egypt02",
        realm: "egypt",
        tileset: "./src/img/tileset/ts_egypt_full.png",
        bgimg: "./src/img/bgimg/bgimg_egyptPyramids.jpg",
        type: "openair",
        map: {
            width: 280,
            height: 35,
            pattern: [
                'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
                'H                                                                                                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                                                                                                      H',
                'H                                                                                                                                                                                                                                                                                 ab   H',
                'H       ab        annb                                                                                                                                                                                                                                                           ammb  H',
                'H       dc        dssc                                                                                                                                                                                                                                                           dmmc  H',
                'H                                                                annnnb        ab                                                                                                                                                                                                 we   H',
                'H                                                                dssssc        dc                                                                     anb                                                                                                                        ammb  H',
                'H                                                                                                                                                     wme                                                                                                                        dmmc  H',
                'H    anb                                                                                                                                            ananbnb                                                                                                                       we   H',
                'H    dsc                                                                                                                                            dsdscsc                                                                                                                      ammb  H',
                'H                                                                              HH                                                                     wme                                                                                                                        dmmc  H',
                'H             ab                                                               HH                                                                     wme                                                                                                                         we   H',
                'H             dc                                                                           anb               ab                                       wme                                                                                                                        ammb  H',
                'H                                                                                          wme    anb        dc                                     ananbnb                                                                                                annnnnnnnnnnnnnnnnnnnnnnnnb H',
                'H                                                                                        annnnnnnnnnnnnnnnnnnnnnnnb                                 dsdscsc                                                                                                wmmmmsssmmmmsssmmmmsssmmmme H',
                'H      annb                                                                              wmmmmmmmmmmmmmmmmmmmmmmmme                                   wme         ab                                                                               annb    wmmme   wmmc   dmme   wmmme H',
                'H      dssc                                                                            annnnnnnnnnnnnnnnnnnnnnnnnnnnb                                 wme         dc                                                                               dssc    dsmmmnnnmme     wmmnnnmmmsc H',
                'H                                                                                      wmmmmmmmmmmmmmmmmmmmmmmmmmmmme                                 wme                                                                                  annb              dssmmmmmmb   ammmmmmssc   H',
                'H                                                                                    annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb  ab                         ananbnb                                                                                dssc                 dssssmmb ammssssc      H',
                'H                                ANNNNNNNBB                                          wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme  dc                         dsdscsc                           ANNNNNNNNNNNNNNB                             annb                              dmmnmmc           H',
                'H                             ANNMMMMMMMMMMNB                                      annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb                           wme                      ANNNNNNMMMMMMMMMMMMMMMMNNNNNB                       dssc                               dsssc            H',
                'HNNNB                      ANNMMMMMMMMMMMMMMMNNB   ANB                             wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme                           wme                ANNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNB                                                                     H',
                'HMMMMNB  NN             ANNMMMMMMMMMMMMMMMMMMMMMANBMMMANB                        annnnnnnnnnnnnnrrrrnnnnnnnnnnnnnnnnnnnnnnnnb                         wme           ANNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNB                                                                 H',
                'HMMMMMMNNNNNNNNNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNB                wmmmmmmmmmmmmmiiiiiiiiimmmmmmmmmmmmmmmmmmmme             ANNNNNNNNNananbnbNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNB   annb                                                       H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNB            annnnnnnnnnnnnnnrrrrrrrrrrrrnnnnnnnnnnnnnnnnnnrt  ab    ANNMMMMMMMMMMdsdscscMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNammmmb                                                      H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNB     wmmmmmmmmmmmmmmmiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiio  dcANNNMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammmmmmb                                                     H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNBannnnnnnnnnnnnnnnnnnnrrrrrrrrrrrrrrrrrrrrrrrrrrrrtANNMMMMMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammannbmmb                            annnnb                  H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmmiiiiiiiiiiiiiiiiiiiiiiiioMMMMMMMMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammmwmmemmmb        ab      ab         dssssc                  H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnbMMMMMMMMMMMMMMMMMMMananbnbMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmanmmmmnbme        dc      dc                                 H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmeMMMMMMMMMMMMMMMMMMMdsdscscMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmeme                                                   H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmeMMMMMMMMMMMMMMMMMMMMMmmmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmeme                                                   H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMMMMMMMMMMMMMMMMmmmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmemeHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'
            ],
            mask: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'q', 'r', 't', 'u', 'i', 'o', 'x', 'y', 'z'],
            solid: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'H'],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    {name: 'Portal', type: 'Sigil', pos: {x: 8512, y: 350, oX: 0, oY: 0}}
                ],
                enemies: [
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 1150, y: 600, oX: 0, oY: 0 }}
                ]
            },

        }
    }
]