const functions = require('firebase-functions');
const {
    dialogflow
} = require('actions-on-google');

const app = dialogflow();


// random answer 1-100
//let answer = Math.floor((Math.random() * 100) + 1);
//let guessing = 0;

app.intent('Default Welcome Intent', conv => {
    conv.data.guessing = 0;
    conv.data.answer = Math.floor((Math.random() * 100) + 1);
    conv.ask('Guess the mystery number between 1 and 100! Ask "Are you 24?" or "Is it 12?" or just "61". If the answer is higher, you will get "up" in response. If lower, "Down". You have up to 7 chances. Good luck!');
});

app.intent('guess', (conv, params) => {
    let phrase = ["You are so terrible at math.", "Maybe next time.", "Nice try though."];
    let punchLine = ["Idiot.", "Come on.", "Seriously?", "", "", "", "", ""];
    console.log(conv.data);
    console.log(params);

    if (params.number == conv.data.answer) {
        conv.ask(`${conv.data.answer}. Congratulation. You got it.`);

    } else {
        conv.data.guessing += 1;
        if (conv.data.guessing == 7) {
            conv.ask(`You used all chance. The answer is ${conv.data.answer}. ${phrase[Math.floor(Math.random() * 3)]}`);
        } else {
            if (params.number < conv.data.answer) {
                conv.ask(`${params.number}... UP. ${punchLine[Math.floor(Math.random() * 8)]}`);
            }
            else if (params.number > conv.data.answer) {
                conv.ask(`${params.number}... DOWN. ${punchLine[Math.floor(Math.random() * 8)]}`);
            }
            //            if (conv.data.guessing == 4) {
            ////                response += 'You have 3 chances left. Keep going!';
            //                conv.ask('You have 3 chances left. Keep going!');
            //            }
            //            if (conv.data.guessing == 5) {
            ////                 response += `${punchLine[Math.floor(Math.random() * 2)]}`;
            //                conv.ask(`${punchLine[Math.floor(Math.random() * 2)]}`);
            //            }
            //            if (conv.data.guessing == 6) {
            //                 response += 'Next is your last chance.';
            ////                conv.ask('Next is your last chance.');
            //            } 
            else {
                conv.ask('try again');
            }
        }
    }

});



exports.mysteryNumber = functions.https.onRequest(app);
