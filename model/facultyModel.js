const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    TId: {
        type: String,
        required: true,
    },
    desgnation: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true,
    },
    registeredAT: {
        type: Date,
        default: Date.now()
    },
    branch: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Faculy", FacultySchema);