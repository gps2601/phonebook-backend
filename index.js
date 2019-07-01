const express = require('express');
const app = express();

let persons = [
    {
        "name": "Geoffrey",
        "number": "921038",
        "id": 1
    },
    {
        "name": "Sam",
        "number": "213890382",
        "id": 2
    },
    {
        "name": "Oeter",
        "number": "iu123u3",
        "id": 3
    },
    {
        "name": "Dave",
        "number": "012310",
        "id": 4
    },
    {
        "name": "Daisy",
        "number": "9283012983",
        "id": 5
    }
];

app.get('/api/persons', (req, res) => {
    res.send(persons);
});

app.get('*', (req, res) => {
    res.status(404);
    res.send('<h1>404: Not found</h1>')
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});
