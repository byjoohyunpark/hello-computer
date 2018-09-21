const SpeechRecognition = webkitSpeechRecognition;
let textResult = [];
let speechResult;


const getSpeech = () => {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.continuous = true;
    recognition.interimResults = true;
    console.log('listening');

    recognition.onresult = event => {
        speechResult = event.results[0][0].transcript;
        console.log('result: ' + speechResult);
        console.log('confidence: ' + event.results[0][0].confidence);

        let text = document.createElement("p");
        text.innerHTML = speechResult + '&emsp;' + event.results[0][0].confidence;
        let list = document.querySelector('#result-div')
        list.insertBefore(text, list.childNodes[0]);

        convert();
    };

    recognition.onend = () => {
        console.log('update listening');

        // for "endless" mode, comment out the next line and uncomment getSpeech()
        //    recognition.stop(); 
        getSpeech();

    };

    recognition.onerror = event => {
        console.log('something went wrong: ' + event.error);
    };
};


document.body.onload = () => {
    getSpeech();
};



const convert = () => {

    let codeVal = document.createElement("p");
    let codeList = document.querySelector('#code')

    for (i = 0; i < speechResult.length; i++) {
        codeVal.innerHTML += "0" + speechResult[i].charCodeAt(0).toString(2) + " ";
    }
    codeList.insertBefore(codeVal, codeList.childNodes[0]);

}
