const mongoose = require('mongoose')

const creationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Pending"
    },
    isactiontaken:{
        type: Boolean,
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String, // Student or Teacher
        required: true
    }
})

module.exports = mongoose.model('Creation', creationSchema);