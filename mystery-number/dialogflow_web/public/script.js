const SpeechRecognition = webkitSpeechRecognition;
const socket = io.connect();
let array = [];

//socket.emit('hi', { name: 'Joohyun' });

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
    getSpeech();
};



const synth = window.speechSynthesis;

const speak = (text) => {

    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.pitch = 1.9 ;
    utterThis.rate = 0.8 ;
    synth.speak(utterThis);
};


  socket.on('send to browser', data => {
    console.log(data.query);
      speak(data.query);
      update();
  });

        
        









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


function update(){
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
            
            for(let i=0; i<array.length; i++){
               if(array[i] == candidate){                   
            let t = text(candidate, pixelX, pixelY);
               } 
            }
        }
    }
    
    
}

function windowResized() {
    resizeCanvas(windowHeight - 100, windowHeight - 100);
}
