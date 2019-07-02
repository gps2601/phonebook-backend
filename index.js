const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'))
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler);

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
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    });
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON());
    });
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
    const person = request.body;

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    });
    newPerson.save().then(savedPerson => {
        response.json(savedPerson.toJSON());
    })
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
