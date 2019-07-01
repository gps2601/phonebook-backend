const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

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

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const person = request.body;
    const id = getRandomArbitrary(0, 1000000);
    if(!person.name || !person.number || persons.filter(person => person.name !== person.name) > 0){
        response.status(404).end();
    } else {
        const newPerson = {
            name: person.name,
            number: person.number,
            id: id
        };
        persons = persons.concat(newPerson);
        response.json(newPerson);
    }
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
