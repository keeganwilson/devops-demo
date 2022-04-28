const express = require('espress');
const path = require('path');

const app = express();

app.get('/', (rex, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log('Up and running on port 4545'));