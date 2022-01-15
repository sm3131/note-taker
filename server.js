const express = require('express');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

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

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});
