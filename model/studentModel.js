const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    admissionNo: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    registeredAT: {
        type: Date,
        default: Date.now()
    },
    course: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
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

module.exports = mongoose.model("Student", StudentSchema);