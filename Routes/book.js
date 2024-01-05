const express = require('express')
const router = express.Router()

// API's
// Create Book API
const createBook = require("../controller/book/createBook")
// Get Book API
const getAllBook = require("../controller/book/getAllBook")
// API for updating Book
const updateBook = require('../controller/book/updateBook')
// API for deleting Book
const deleteBook = require('../controller/book/deleteBook')

// const bookIssue = require('../controller/issue/bookIssue')

// Middleware for body validation
const {validation_array, handleValidationErrors} = require('../middleware/Validation/Book/bookValidation')
const userValidation = require('../middleware/userValidation')


// Routes
router.post('/',userValidation , validation_array, handleValidationErrors, createBook)
router.get('/', getAllBook);
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

// router.post('/issue/:id', bookIssue)

module.exports = router;