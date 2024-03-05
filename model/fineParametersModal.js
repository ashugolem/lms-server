const mongoose = require('mongoose')

const fine = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    finePerDay: {
        type: Number,
        default: Date.now()
    },
    deadline: {
        type: Number,
        default: Date.now()
    },
})

module.exports = mongoose.model('Fine_parameters', fine);