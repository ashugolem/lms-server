const mongoose = require('mongoose')

const alert = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    seen: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    },
    reference: {
        type: String, //Fine or Report or Book
        required: true
    }
})

module.exports = mongoose.model('Alert', alert);