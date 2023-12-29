const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    total:{
        type: Number,
        required: true,
    },
    code:{
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    registeredAT: {
        type: Date,
        default: Date.now()
    },
    selfNo: {
        type: Number,
        default: 1
    },
    publishedOn: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Book',BookSchema);