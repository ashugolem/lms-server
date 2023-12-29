const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending" // This can be Pending, Aprooved or Declined (Blocked if Declined)
    },    
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    registeredAT: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", UserSchema);