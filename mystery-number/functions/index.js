const functions = require('firebase-functions');
const {
    dialogflow
} = require('actions-on-google');

const app = dialogflow();

// random answer 1-100
let answer = Math.floor((Math.random() * 100) + 1);
let guessing = 0;

app.intent('Default Welcom Intent', conv => {
    conv.ask('Guess the mystery number between 1 and 100! Ask "Are you 24?" or "Is it 12?" or just "61". If the answer is higher, you will get "up" in response. If lower, "Down". You have up to 7 chances. Good luck!');
    guessing = 0;
});

app.intent('guess', (conv, params) => {
    let phrase = ["You are so terrible at math.", "Maybe next time.", "Nice try though."];
    let punchLine = ["Idiot.", "Come on.", " "];

    if (params.number == answer) {
        conv.ask("Congratulation. You got it.");
        answer = Math.floor((Math.random() * 100) + 1);
        guessing = 0;
    } else {
        guessing += 1
        if (guessing == 7) {
            conv.ask(`You used all chance. The answer is ${answer}. ${phrase[Math.floor(Math.random() * 3)]}`);
            answer = Math.floor((Math.random() * 100) + 1);
            guessing = 0;
        } else {
            if (params.number < answer) {
                conv.ask(`UP.`);
            }
            if (params.number > answer) {
                conv.ask(`DOWN.`);
            }
            if (guessing == 4) {
                conv.ask(' You have 3 chances left. Keep going!');
            }
            if (guessing == 5) {
                conv.ask(` ${punchLine[Math.floor(Math.random() * 3)]}`);
            }
            if (guessing == 6) {
                conv.ask(' Next is your last chance.');
            }
        }
    }
});



exports.mysteryNumber = functions.https.onRequest(app);
