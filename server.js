const express = require('express');
const notes = require('./db/db.json');
console.log(notes);
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    const fileName = __dirname + '/public/index.html'
    res.sendFile(fileName);
});

app.get('/notes', (req, res) => {
    const fileName = __dirname + '/public/notes.html'
    res.sendFile(fileName);
});

app.get('*', (req, res) => {
    const fileName = __dirname + '/public/index.html'
    res.sendFile(fileName);
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    req.body.id = uniqid();
    console.log(req.body);
    console.log(req.body.id);

    const note = createNewNote(req.body, notes);

    res.json(note);
});

function createNewNote(body, notesArray) {
    console.log(body);
    // our function's main code will go here!
    const note = body;
    notesArray.push(note);

    // return finished code to post route for response
    return note;
}

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});
