const mongoose = require('mongoose')

const issueSchema = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    issueDate: {
        type: Date,
        default: Date.now()
    },
    isReturned: {
        type: Boolean,
        default: false
    },
    returnDate: {
        type: Date
    }
})

module.exports = mongoose.model('BookTransaction', issueSchema);