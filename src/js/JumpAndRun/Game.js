// Variablen
let steuerung = {
    links: false,
    rechts: false,
    springen: false,
    rutschen: false,
    angriff1: false,
    angriff2: false,
    magie: false,
    pause: false
};

function init() {
    myPlayer = new Player( 200, 250, 50, 50 );

    window.addEventListener('keydown', steuern);
    window.addEventListener('keyup', steuern);

    window.requestAnimationFrame( updateGame );
}
function steuern(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowLeft":
            steuerung.links = (event.type === 'keydown'); break;
        case "ArrowRight":
            steuerung.rechts = (event.type === 'keydown'); break;
        case "ArrowDown":
            steuerung.rutschen = (event.type === 'keydown'); break;
        case "ArrowUp":
            steuerung.springen = (event.type === 'keydown'); break;
        case "Space":
            steuerung.angriff1 = (event.type === 'keydown'); break;
        case "Shift":
            steuerung.angriff2 = (event.type === 'keydown'); break;
        case "Control":
            steuerung.magie = (event.type === 'keydown'); break;
        case "Escape":
            steuerung.pause = (event.type === 'keydown'); break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    event.preventDefault();        // Cancel the default action to avoid it being handled twice
}

function updateGame() {
    myPlayer.draw();
    myPlayer.puppeteer();
    window.requestAnimationFrame( updateGame );
}