const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomCategory', required: true },
    status: { type: String, enum: ['available', 'booked'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room