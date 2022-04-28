const express = require('express');
const path = require('path');

const app = express();

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'd7803681b68d4030a7026f055bd40a40',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

try {
    app.get('/', fakeFunc())
}   catch(err) {console.error(error)};

const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`Up and running on port ${port}`)});