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

app.use(express.json)

let students = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Keegan', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('provide a name stupid')
    } else {
        rollbar.error('student already added')
        res.status(400).send('you already added that one')
    }

})

const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`Up and running on port ${port}`)});