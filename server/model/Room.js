const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['single', 'double'], required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  facility: { type: String }, // Array of amenities
  // imageUrls: { type: [String] }, // Array of image URLs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},
);

const Room = mongoose.model('Room', roomSchema)
module.exports = Room