const mongoose = require('mongoose')

const fineHistory = mongoose.Schema({
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
    date:{
        type : Date ,
        required: true
    },
    fineAmount: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('FineHistory', fineHistory);