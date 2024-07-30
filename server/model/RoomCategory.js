const mongoose = require('mongoose')

const roomCategorySchema = new mongoose.Schema({
    name: { type: String, required:true },
    price: { type: Number, required: true },
    maxPerson: { type: Number, required: true }, // Count with child 
    facilities: { type: String, required: true },
    description: { type: String, required: true },
    // imageUrls: { type: [String] }, // Array of image URLs
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const RoomCategory = mongoose.model('RoomCategory', roomCategorySchema)
module.exports = RoomCategory