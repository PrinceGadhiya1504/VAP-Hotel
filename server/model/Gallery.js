const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageName : { type: String, require:true },
    category : { type: String, require:true },
    description : { type: String }
})

const Gallery = mongoose.model('Gallery', gallerySchema)
module.exports = Gallery