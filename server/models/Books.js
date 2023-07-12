const { Schema, default: mongoose } = require("mongoose")

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    stars: {
        type: Number,
    },
    category: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Book', BookSchema)