// Datenbank für Level, mit zusätzlichen Informationen für jedes Level - geschrieben von AZ
const LEVELS = [
    {
        name: "void00",
        realm: "void",
        tileset: "./src/img/tileset/ts_void00.png",
        bgimg: "./src/img/bgimg/bgimg_void00.jpg",
        type: "openair",
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
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 200, y: 240, oX: 0, oY: 0 }},
                    { name: 'dewdropS', type: 'Sigil', pos: {x: 300, y: 240, oX: 0, oY: 0 }},
                    { name: 'Portal', type: 'Sigil', pos: {x: 5000, y: 300, oX: 0, oY: 0 }}
                ],
                enemies: [
                    { name: 'dumbass', type: 'Enemy', pos: {x: 800, y: 280, oX: 0, oY: 0 }}
                ]
            }
        }
    },
    {
        name: "egypt01",
        realm: "egypt",
        tileset: "./src/img/tileset/ts_egypt_full.png",
        bgimg: "./src/img/bgimg/bgimg_egyptProxy.jpg",
        type: "underground",
        map: {
            width: 280,
            height: 29,
            pattern: [
                'mmscmmmdssscmmmmsssssssssssmmmmmmdmmmmmmmmmmmmmmsscmmmmmmmmmmmmsssssssssssmmmmmmmdssmmmmmmmmmmmmsssscmdssmmmmmmmmsssscmmmwmmmmmmmmmmmmmmsssscmmmmmmmmmmmmmdsssmmmmmmmmemmmmmmsscmdsssmmmmmmmmmssssssssmmmmmmmmmmmmssssscmmmmmmmmdssmmmmmmmmmmmmmmmmmssssssssscmmdssmmmmmmmemmmmmmmmmmmmm',
                'scmmssssmmmmmssc           dsssmmmdsssmmmmmmmmmemmmmmmmmssssssc           dssssssmmmdsmmmmmmmmmemmmmmmmmmwmmmmmmemmmmmmmmdmmmmmmmmmsssscmmssssssssssssssssmmmmdssssssscmmmmmcmmmmmmmmdssssssscmmmmmmmmdssssmmmmmscmmmmsssssssssssmmdsmmmmmmmmmssssscmmmmmmmmmmmmmmmdsssssscmmmmmmmmmmmmm',
                'mmmc    dsssc                  dssmmmmdsmmmmssscmmmmmssc                         dssmmwmmmmmsscmmmmmmmmmmdsssssscmmmmmmmmmwmmmmmmmcmmmmssc                dsmmmmmmmmmdssssscmmsssssssssmmmmmmmmsssssssssmmmdssscmmmssc           dmmmdssssmmmemmmmmmmmmsssssssssssssmmmmmmmmmmmmmmmmmmmm',
                'mmc                               dsmmmmdsscmmmmmsssc                               dmdsssscmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmwmmmmmmemmmmc                     dssssssssssssssssc         dssssssc         dsmmmmmmssc               dsssssmmdsscmmmmmsssc             dssmmmmmmmmmmmmmmmmm',
                'me                  annb            dmmmmmmmmmssc                                    xiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimwmmmmmmemmmc                                                                    dmmmsc                        dsssssmmmsc                    dssmmmmmmmmmmmmmm',
                'me               annmmmmnnb          dmmmmmmme               annnnnnnnnnb             uiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimdmmmmmmcmme         annnb                                                        dsc                                dsc                         uiiiiiiiiiiimm',
                'mmb      annnnnnnmmannnnbmmnb         dmmmssc             annmmmmmannnbmmnnb          uiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimmdsssscmmmmb      anmmabmnnb                                                                   annnb                                            uiiiiiiiiiiimm',
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
                'me           annnnb            annnnnnnmmmmanbmmmbmee       anmmanbmb      dmmdcme  dmmmmanbmb          wmmwmmdsscmmmmmnnnnmmmmbmme          dsmmmdsssssscmmiiimwmmmmmmmmmmmmmmmscmmmmmmmmssssssssssssssssmmmmmwmmmmmmmmmmmmmmsmmmmscmmssssssc                               wwmmmmiiimm',
                'me       annnmannbmnnnnnnnnnnnnmmmmmmmmmannmmemmmememnnb    dmanmmmbmb      dmmmme   dmmammemmnnb     anmanmmmmmmmmmmmmmmmmmmmmemmmb           dsmmmmmmmmmmmyyymwmmmmmmmmsssssscmmsssssssc                dsmmmdssssmmmmmmmmmemdsscmmsc                                      wwmmmmiiimm',
                'mmb      wannnmmmmnnnnbmmmssssssssmmmmmammmmmmnnnnmemmmc     wdmmmmemmb      wmmmmb   wmwmmmnnbme    ammmdsssssmmmmmmmmmmmmmmmmmnbmmnb           dssssssssme   wdsssmmmmcmmmmssssc                          dsmmmmmmwmmmmmmmmemmmmmsc                                        wwmmmmiiimm',
                'bme      wwmmmsssssssscmsc        dsmmmdssmmmmssssscmmc      wmwmmmmbmc      wmmmme   wmdssssscmmb   dssssssmmmdsmmmmmmmmmmmmmmmmcmmmmnb                  dc   dsmmmdsscmsssc                                 dssssmdsssssssscmmmsc                                          wwmmmmiiimm',
                'cme     amdsscmmmmmssssc            dssmmmdsscmmmmmmsc       wmwmmmmee        dssme   wmmssssssssc          dsssmdsssssssmmmmmmmemmmmmmmnb                       dsmmmmsc                                          dssssssssssssc                                            wwmmmmiiimm',
                'mmc     wmmmmmssssc                    dssmmmmmssssc       anmmwmmmmemnb         dc   dsc                       dssssssmmdsssssscmsssssssc                         dssc                       annnnnb                                     annb                               wwmmmmiiimm',
                'me      dssssc                            dsssc            wmmamannbmbme                                               dsssssssssc                                                   annnnnnnnmmmmmmmnnb                                 ammme                               wwmmmmiiimm',
                'mmnb                       annnb                          amanmammmememmb                                                                       annnnnnnnnb                     annnnmmmmmmmmmmannnbmmmmnnb                             ammmmmb                             amwmmmmiiimm',
                'nbme                  annnnmmmmmnnb                    annmmwmmwmmmmbmbmmnb                 annb annnnnnnb                                    anmmmmmmmmmmmnb               annnmmmmmmmannnnnnnmmmmmnnbmmmmnnnb                      annmmmanbmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnmammmmmiiimm',
                'mmbmb             annnmmmmmmannbmmmnb               annmmmmammmwmmmmemmnbmmnnnnnnnb   annnnnmmmmnmmannnbmmnnnnnnnnb                    annnnnnmmmmannnnnbmmmmnnnnnnnnnnnnnnnmmmmmmannnnmmmmmmmmannbmmmmnbmmmmmmnnnnnnnnnb      annnnnmmmmannbemmmannnnnnnnnnnnnnnnnnnnnnnnnnnmmmmmmiiimm',
                'mmemmnnnnnnnnnnnnnmmmmmannnnmmmmnbmmmnnnnnnnnnnnnnnnmmannnnmmmammmmmmnbmmnnnnnnnnnbnnnmmmmmmmmmmmmammmmmnnbmmmmmmmmnnnnnnnnnnnnnnnnnnnnmmmmmmmmmmammmmmmmnnnnbmmmmmmmmmmmmmmmannnnmmmmmannbmmmammmmbmmmmmnnbmmmmmmmmmmmmmnnnnnnmmmmmmannnmmmmnbmmwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   mm',
                'mmmbmannnnnnnnnbmannnnnmmmmmmmmmmmnnnnnbmmmmmmmmmmmmanmmmmmmmmwmmmmmmmemmmmannnnnnnbmmmmannnnnnnnnmmmmmmmmmnnnnnnbmmmmmmmmmmmmmmmmmmmmmmmannnnnnnmmannnnnnnbmmnnnnnnnnnnnnnnnmmmmmmmannmmmmnnnmmmmmmnnnnbmmmnnnnnnnbmmmannnnnnbmmmmmmwmmmmmmmmmnnnbmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmHHHmm'
            ],
            mask: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'q', 'r', 't', 'u', 'i', 'o', 'x', 'y', 'z'],
            solid: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'H'],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    {}
                ],
                enemies: [
                    {name: 'yamoma', type: 'Enemy', pos: {x: 8810, y: 840, oX: 0, oY: 0 }}
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
                'H                                                                                                                                                                                                                                                                                ammb  H',
                'H       ab      annb                                                                                                                                                                                                                                                             dmmc  H',
                'H       dc      dssc                                               annnnb                                                                                                                                                                                                         we   H',
                'H                                                                  dssssc         ab                                                                  anb                                                                                                                        ammb  H',
                'H                                                                                 dc                                                                  wme                                                                                                                        dmmc  H',
                'H                                                                                                                                                   anmmmnb                                                                                                                       we   H',
                'H    anb                                                                                                                                            dsmmmsc                                                                                                                      ammb  H',
                'H    dsc                                                                                                                                              wme                                                                                                                        dmmc  H',
                'H           ab                                                                  HH                                                                    wme                                                                                                                         we   H',
                'H           dc                                                                  HH         anb               ab                                       wme                                                                                                                        ammb  H',
                'H                                                                                          wme    anb        dc                                     anmmmnb                                                                                                annnnnnnnnnnnnnnnnnnnnnnnnb H',
                'H                                                                                        annnnnnnnnnnnnnnnnnnnnnnnb                                 dsmmmsc                                                                                                wmmmmsssmmmmsssmmmmsssmmmme H',
                'H                                                                                        wmmmmmmmmmmmmmmmmmmmmmmmme                                   wme        ab                                                                                annb    wmmme   wmmc   dmme   wmmme H',
                'H      annb                                                                            annnnnnnnnnnnnnnnnnnnnnnnnnnnb                                 wme        dc                                                                                dssc    dsmmmnnnmme     wmmnnnmmmsc H',
                'H      dssc                                                                            wmmmmmmmmmmmmmmmmmmmmmmmmmmmme                                 wme                                                                                  annb              dssmmmmmmb   ammmmmmssc   H',
                'H                                                                                    annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb  ab                         anmmmnb                                                                                dssc                 dssssmmb ammssssc      H',
                'H                                ANNNNNNNBB                                          wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme  dc                         dsmmmsc                           ANNNNNNNNNNNNNNB                             annb                              dmmnmmc           H',
                'H                             ANNMMMMMMMMMMNB                                      annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb                           wme                      ANNNNNNMMMMMMMMMMMMMMMMNNNNNB                       dssc                               dsssc            H',
                'HNNNB                      ANNMMMMMMMMMMMMMMMNNB   ANB                             wmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmme                           wme                ANNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNB                                                                     H',
                'HMMMMNB  NN             ANNMMMMMMMMMMMMMMMMMMMMMANBMMMANB                        annnnnnnnnnnnnnrrrrnnnnnnnnnnnnnnnnnnnnnnnnb                         wme           ANNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNB                                                                 H',
                'HMMMMMMNNNNNNNNNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNB                wmmmmmmmmmmmmm       iimmmmmmmmmmmmmmmmmmmme             ANNNNNNNNNanmmmnbNNNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNB   annb                                                       H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNB            annnnnnnnnnnnnnn           rnnnnnnnnnnnnnnnnnnrt  ab    ANNMMMMMMMMMMdsmmmscMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNammmmb                                                      H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNB     wmmmmmmmmmmmmmmm                   iiiiiiiiiiiio  dcANNNMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammmmmmb                                                     H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNBannnnnnnnnnnnnnnnnnnn               rrrrrrrrrrrrrtANNMMMMMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammannbmmb                            annnnb                  H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmm           iiiiiiiiiiiiioMMMMMMMMMMMMMMMMMMMMMMwmeMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMammmwmmemmmb        ab      ab         dssssc                  H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnbMMMMMMMMMMMMMMMMMMManmmmnbMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmanmmmmnbme        dc      dc                                 H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmeMMMMMMMMMMMMMMMMMMMdsmmmscMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmeme                                                   H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmeMMMMMMMMMMMMMMMMMMMMMmmmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmeme                                                   H',
                'HMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMMMMMMMMMMMMMMMMmmmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMwmwmmmmmmemeHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'
            ],
            mask: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'q', 'r', 't', 'u', 'i', 'o', 'x', 'y', 'z'],
            solid: ['A', 'N', 'B', 'W', 'M', 'E', 'D', 'S', 'C', 'a', 'n', 'b', 'w', 'm', 'e', 'd', 's', 'c', 'H'],
            spawn: {
                player: {x: 180, y: 160, oX: 0, oY: 0},
                sigils: [
                    {
                        name: 'Portal',
                        type: 'Sigil',
                        pos: {x: 8448, y: 650, oX: 0, oY: 0}
                    }
                ],
                enemies: [
                    {}
                ]
            },

        }
    }
]