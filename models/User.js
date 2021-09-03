const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:[addressSchema],
    bloodgroup:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
});
const userReciever = mongoose.model('userReciever',userSchema);
module.exports = userReciever;