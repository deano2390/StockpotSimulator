function main() {
    gameDiv = document.getElementById("gameDiv");
    canvas = document.getElementById("canvas");
    splash = document.getElementById("splash");
    projectile = document.getElementById("projectile");
    hideElement(gameDiv);
    hideElement(projectile);
    loadSounds();
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "block";
}

function loadGame() {
    hideElement(splash);
    showElement(gameDiv);

    ctx = canvas.getContext("2d");

    loadImage("bg.jpg", 0, 0, function () {
        loadImage("marco2.png", -150, 0, function () {

        });
    });


    var myAudio = new Audio('bubbling.wav');
    myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    myAudio.addEventListener('canplaythrough', function () {
        myAudio.play();
    }, false);

    splash = new Audio('splash.wav');
}

function loadImage(url, x, y, callback) {

    var image = new Image();

    image.onload = function () {
        ctx.drawImage(image, x, y);
        if (callback)
            callback();
    }

    image.src = url;
}

function addStockPot() {
    animateStockPot();
}

function animateStockPot() {
    showElement(projectile);
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
        if (pos >= 370) {
            clearInterval(id);
            hideElement(projectile);
            splash.play();
            projectile.style.top = 0;
            playRandomSound();
        } else {
            pos += 3;
            projectile.style.top = pos + 'px';
        }
    }
}

function loadSounds() {
    sounds = [];
    sounds.push(new Audio('sounds/2cubes.wav'));
    sounds.push(new Audio('sounds/12in.wav'));
    sounds.push(new Audio('sounds/delicious.wav'));
    sounds.push(new Audio('sounds/dinnerin5.wav'));
    sounds.push(new Audio('sounds/dissolve.wav'));
    sounds.push(new Audio('sounds/edible.wav'));
    sounds.push(new Audio('sounds/familyfave.wav'));
    sounds.push(new Audio('sounds/fat.wav'));
    sounds.push(new Audio('sounds/fatnotcooked.wav'));
    sounds.push(new Audio('sounds/fatsdelicious.wav'));
    sounds.push(new Audio('sounds/fatsuncooked.wav'));
    sounds.push(new Audio('sounds/generous.wav'));
    sounds.push(new Audio('sounds/herbs.wav'));
    sounds.push(new Audio('sounds/intensify.wav'));
    sounds.push(new Audio('sounds/knorrlamb.wav'));
    sounds.push(new Audio('sounds/makeapaste.wav'));
    sounds.push(new Audio('sounds/paste.wav'));
    sounds.push(new Audio('sounds/perfection.wav'));
    sounds.push(new Audio('sounds/splashofoil.wav'));
    sounds.push(new Audio('sounds/thefat.wav'));
    sounds.push(new Audio('sounds/thefat2.wav'));
    sounds.push(new Audio('sounds/unpleasant.wav'));
    sounds.push(new Audio('sounds/welldone.wav'));
    sounds.push(new Audio('sounds/welldone1.wav'));
    sounds.push(new Audio('sounds/welldone3.wav'));
}

function playRandomSound() {
    var sound = sounds[Math.floor(Math.random() * sounds.length)];
    sound.play();
}
