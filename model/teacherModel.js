const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    eid: {
        type: String,
        required: true,
    },
    registeredAT: {
        type: Date,
        default: Date.now()
    },
    designation: {
        type: String,
        required: true,
    },
    address: {
        type: Number,
    },
    booksLent: {
        type: Number,
        default: 0
    },
    booksSubmitted: {
        type: Number,
        default: 0
    },
    fine: {
        type: Number,
        default: 0
    },
    finePaid: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("Teacher", TeacherSchema);