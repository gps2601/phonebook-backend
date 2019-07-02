const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1);
}

const password = process.argv[2];

mongoose.connect(
    `mongodb+srv://gps2601:${password}@fieldnote-3fejg.mongodb.net/phonebook?retryWrites=true&w=majority`
    , {useNewUrlParser: true}
);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v
    }
});


module.exports = mongoose.model('Person', personSchema);

