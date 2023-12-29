const mongoose = require('mongoose')

const request = mongoose.Schema({
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
    time: {
        type: Date,
        default: Date.now()
    },
    isactiontaken: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Requested"
    },
    seen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Request', request);