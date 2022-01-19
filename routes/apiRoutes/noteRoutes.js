const router = require('express').Router();
const notes = require('../../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);

    res.json(note);
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

router.delete('/notes/:id', (req, res) => {
    const result = deleteNote(req.params.id, notes)

    res.json(result);
});

function deleteNote(id, notesArray) {
    const filterArr = notesArray.filter(note => note.id === id);
    const i = notesArray.indexOf(filterArr[0]);
    notesArray.splice(i, 1);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return notesArray;
};

module.exports = router;