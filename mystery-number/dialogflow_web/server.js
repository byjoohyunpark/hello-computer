const express = require('express');
const app = express();
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({
  keyFilename:
    '/Users/joohyunpark/Desktop/Hello Computer/mystery-number/service-key.json'
});

const projectId = 'mystery-number-c422f';

app.use(express.static('public'));

const server = app.listen(1122, () => {
  console.log('listening on port 1122!');
});

const io = require('socket.io').listen(server);

io.on('connection', socket => {
  console.log('new user: ' + socket.id);


  socket.on('send to dialogflow', data => {
    console.log(data.query);
    sessionClient
      .detectIntent({
        session: sessionClient.sessionPath(projectId, '12345'),
        queryInput: { text: { text: data.query, languageCode: 'en-US' } }
      })
      .then(responses => {
        const result = responses[0].queryResult;
        console.log(result);
        // do stuff here
        
        socket.emit('send to browser', {
            query: result.fulfillmentText 
        });
        
      });
  });
});
