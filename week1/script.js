const synth = window.speechSynthesis;
let x, y;

const speak = (text) => {

    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.pitch = 1 + ((window.innerHeight / 2 - y) * (2 / window.innerHeight));
    utterThis.rate = 1 + (-1 * ((window.innerWidth / 2 - x) * (2 / window.innerWidth)));
    synth.speak(utterThis);
};



function showCoords(event) {
    x = event.clientX;
    y = event.clientY;
    //    console.log(x, y);
    synth.cancel();
    speak(x + 'by' + y);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    ellipseMode(CENTER);
}

function draw() {
    background(0);
    noStroke();
    ellipse(mouseX, mouseY, 6);
    stroke(255);
    line(mouseX, 0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
