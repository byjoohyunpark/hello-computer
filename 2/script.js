const SpeechRecognition = webkitSpeechRecognition;
let textResult = [];
let speechResult;


const getSpeech = () => {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.continuous = true;
    recognition.interimResults = true;
    console.log('start listening');

    recognition.onresult = event => {
        speechResult = event.results[0][0].transcript;
//        console.log('result: ' + speechResult);
//        console.log('confidence: ' + event.results[0][0].confidence);

        let text = document.createElement("p");
        text.innerHTML = speechResult;
        let result = document.querySelector('#result');
        result.insertBefore(text, result.childNodes[0]);

        let num = document.createElement("p");
        num.innerHTML = compute(event.results[0][0].confidence);
        let confidence = document.querySelector('#confidence');
        confidence.insertBefore(num, confidence.childNodes[0]);


        /*************************************
            convert to binary
        *************************************/
        let code = document.createElement("p");
        let codeList = document.querySelector('#code');

        for (i = 0; i < speechResult.length; i++) {
            code.innerHTML += "0" + speechResult[i].charCodeAt(0).toString(2) + " ";
        }
        codeList.insertBefore(code, codeList.childNodes[0]);

        
        /*************************************
            align all p height to max
        *************************************/        
        let max = Math.max(text.getBoundingClientRect().height, num.getBoundingClientRect().height, code.getBoundingClientRect().height);
        
        text.style.height = max;
        num.style.height = max;
        code.style.height = max;        
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



function compute(x) {
    return Number.parseFloat(x).toFixed(2);
}
