const SpeechRecognition = webkitSpeechRecognition;
const socket = io.connect();
let array = [];

let wrapper = document.querySelector("#soju");
wrapper.style.display = "none";
//let chance = document.querySelector("#chance");


const getSpeech = () => {
    console.log('get speech');
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = event => {
        const speechResult = event.results[0][0].transcript;
        console.log('result: ' + speechResult);
        socket.emit('send to dialogflow', {
            query: speechResult
        });
        array.push(speechResult);
    };

    recognition.onend = () => {};
};

document.querySelector('#my-button').onclick = () => {
    synth.cancel();
    getSpeech();
    //    success();

};



const synth = window.speechSynthesis;

const speak = (text) => {

    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.pitch = 1.9;
    utterThis.rate = 0.8;
    synth.speak(utterThis);
};


socket.on('send to browser', data => {
    console.log(data.query);
    speak(data.query);
    document.querySelector('#txt').innerHTML = data.query;

    let filter1 = "UP";
    let filter2 = "DOWN";

    if (data.query.includes(filter1) || data.query.includes(filter2)) {
        let n = data.query.split("...")[0];
        update(n);
        var image_x = document.getElementById('h');
        image_x.parentNode.removeChild(image_x);

    }
    if (data.query.includes("You used all chance")) {
        reset();
        var image_x = document.getElementById('h');
        image_x.parentNode.removeChild(image_x);
    }
    if (data.query.includes('Congratulation')) {
        setTimeout(success, 2000);
        var image_x = document.getElementById('h');
        image_x.parentNode.removeChild(image_x);
    }


});





function success() {
    wrapper.style.display = "block";
    setInterval(function () {
        let num = 100;

        for (let i = 0; i < num; i++) {
            let soju = document.createElement('img');
            soju.src = "h.png";
            soju.width = "10";
            wrapper.appendChild(soju);
        }
    }, 40);
}




//////////////////////////////////////////////////////////////////

let rows = 10;
let cols = 10;
let cellHeight;
let cellWidth;

function setup() {
    createCanvas(windowHeight - 100, windowHeight - 100);

    cellHeight = height / rows;
    cellWidth = width / cols;

    textAlign(CENTER, CENTER);
    textSize(22);

    background(32);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            //calculate cell position
            let pixelX = cellWidth * x;
            let pixelY = cellHeight * y;

            //add half to center letters
            pixelX += cellWidth / 2;
            pixelY += cellHeight / 2;

            fill(random(40, 50));

            let yy = rows - y;
            let candidate = x + yy * 10 - 9;

            let t = text(candidate, pixelX, pixelY);
        }
    }

}


function update(n) {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            //calculate cell position
            let pixelX = cellWidth * x;
            let pixelY = cellHeight * y;

            //add half to center letters
            pixelX += cellWidth / 2;
            pixelY += cellHeight / 2;

            fill(255);

            let yy = rows - y;
            let candidate = x + yy * 10 - 9;

            for (let i = 0; i < array.length; i++) {
                if (n == candidate) {
                    let t = text(candidate, pixelX, pixelY);
                }
            }
        }
    }
}


function reset() {
    background(32);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            //calculate cell position
            let pixelX = cellWidth * x;
            let pixelY = cellHeight * y;

            //add half to center letters
            pixelX += cellWidth / 2;
            pixelY += cellHeight / 2;

            fill(random(40, 50));

            let yy = rows - y;
            let candidate = x + yy * 10 - 9;

            let t = text(candidate, pixelX, pixelY);
        }
    }
}

function windowResized() {
    resizeCanvas(windowHeight - 100, windowHeight - 100);
}
