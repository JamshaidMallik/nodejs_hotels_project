const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

personSchema.pre('save', function (next) {
    const person = this;
    // hash the password only if password is has been modified or (it is new)
    if (!person.isModified('password')) return next();
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compareSync(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;