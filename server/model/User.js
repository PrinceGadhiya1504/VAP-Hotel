const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city : { type: String, required: true },
    state : { type: String, required: true },
    country : { type: String, required: true },
    dateOfBirth: { type: Date },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Hash Password 
    role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
module.exports = User