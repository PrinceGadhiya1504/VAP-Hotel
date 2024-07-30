const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    bank: { type: String, required: true },
    paymentMethod: { type: String, enum: ['creditCard', 'debitCard', 'upi', 'wallet'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentDate: { type: Date, required: true, default: Date.now },
    transactionId: { type: String, unique: true },
    // currency: { type: String, default: 'INR' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment