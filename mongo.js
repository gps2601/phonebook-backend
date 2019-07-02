const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

mongoose.connect(
    `mongodb+srv://gps2601:${password}@fieldnote-3fejg.mongodb.net/phonebook?retryWrites=true&w=majority`
    , {useNewUrlParser: true}
);

let personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

let Person = mongoose.model('Person', personSchema);
let newPerson = new Person({name: name, number: number});

// newPerson.save().then(response => {
//     console.log('person saved!');
//     mongoose.connection.close();
// });
//
Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});
