const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    bank: { type: String, required: true },
    paymentMethod: { type: String, enum: ['creditCard', 'debitCard', 'upi', 'wallet'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentDate: { type: Date, default: Date.now },
    transactionId: { type: String, unique: true, required: true },
    currency: { type: String, default: 'INR' },
  }, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment