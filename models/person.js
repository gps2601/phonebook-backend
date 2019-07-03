const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(
    process.env.MONGO_DB_URL
    , {useNewUrlParser: true}
);

const personSchema = new mongoose.Schema({
    name: {type: String, minlength: 3},
    number: {type: String, minlength: 8, unique: true},
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v
    }
});
personSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Person', personSchema);

