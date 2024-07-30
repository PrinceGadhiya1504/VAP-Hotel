const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
    specialRequests: { type: String, default: '' },
    // numberOfGuests: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking