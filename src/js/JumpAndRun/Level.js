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
                    {name: 'rawlight', type: 'Sigil', pos: {x: 165, y: 750, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 1971, y: 446, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 2676, y: 700, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 7000, y: 756, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 5239, y: 306, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 8319, y: 180, oX: 0, oY: 0}},
                    {name: 'rawlight', type: 'Sigil', pos: {x: 3800, y: 415, oX: 0, oY: 0}},
                    {name: 'Portal', type: 'Sigil', pos: {x: 8448, y: 650, oX: 0, oY: 0}}
                ],
                enemies: [
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 1020, y: 478, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 2115, y: 95, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 479, y: 479, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 507, y: 799, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 1372, y: 799, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 2468, y: 767, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 3223, y: 735, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 4395, y: 767, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 5911, y: 671, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 4000, y: 383, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 4600, y: 95, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 5927, y: 254, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 6995, y: 127, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 8003, y: 286, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 8155, y: 287, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 7800, y: 735, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 8000, y: 735, oX: 0, oY: 0 }},
                    {name: 'regalmummy', type: 'Enemy', pos: {x: 8200, y: 735, oX: 0, oY: 0 }}
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
                'H                                ANNNNNNNNB                                          wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme  dc                         dsdscsc                           ANNNNNNNNNNNNNNB                             annb                              dmmnmmc           H',
                'H                             ANNMMMMMMMMMMNB                                      annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb                           wme                      ANNNNNNMMMMMMMMMMMMMMMMNNNNNB                       dssc                               dsssc            H',
                'HNNNB                      ANNMMMMMMMMMMMMMMMNNB   ANB                             wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme                           wme                ANNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNB                                                                     H',
                'HMMMMNB                 ANNMMMMMMMMMMMMMMMMMMMMMANBMMMANB                        annnnnnnnnnnnnnrrrrnnnnnnnnnnnnnnnnnnnnnnnnb                         wme           ANNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNB                                                                 H',
                'HMMMMMMNNNB     ANNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNB                wmmmmmmmmmmmmmiiiiiiiiimmmmmmmmmmmmmmmmmmmme             ANNNNNNNNNananbnbNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNB   annb                                                       H',
                'HMMMMMMMMMMNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNB            annnnnnnnnnnnnnnrrrrrrrrrrrrnnnnnnnnnnnnnnnnnnrt  ab    ANNMMMMMMMMMMdsdscscMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNammmmb                                                      H',
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
                    {name: 'dewdropS', type: 'Sigil', pos: {x: 2056, y: 150, oX: 0, oY: 0}},
                    {name: 'dewdropS', type: 'Sigil', pos: {x: 2200, y: 190, oX: 0, oY: 0}},
                    {name: 'dewdropS', type: 'Sigil', pos: {x: 8280, y: 800, oX: 0, oY: 0}},
                    {name: 'dewdropS', type: 'Sigil', pos: {x: 8160, y: 800, oX: 0, oY: 0}},
                    {name: 'Portal', type: 'Sigil', pos: {x: 8600, y: 340, oX: 0, oY: 0}}
                ],
                enemies: [
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 627, y: 703, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 2000, y: 767, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 3400, y: 479, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 4590, y: 767, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 5743, y: 670, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 6120, y: 639, oX: 0, oY: 0 }},
                    {name: 'royalkitty', type: 'Enemy', pos: {x: 6650, y: 702, oX: 0, oY: 0 }},
                    {name: 'ichtophis', type: 'Enemy', pos: {x: 5190, y: 510, oX: 0, oY: 0 }},
                    {name: 'ichtophis', type: 'Enemy', pos: {x: 7070, y: 767, oX: 0, oY: 0 }}
                ]
            },

        }
    }
]