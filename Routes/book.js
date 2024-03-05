const express = require('express')
const router = express.Router()

// API's Function
const createBook = require("../controller/book/createBook")
const getAllBook = require("../controller/book/getAllBook")
const updateBook = require('../controller/book/updateBook')
const deleteBook = require('../controller/book/deleteBook')

// const bookIssue = require('../controller/issue/bookIssue')

// Middleware for body validation
const {validation_array, handleValidationErrors} = require('../middleware/Validation/Book/bookValidation')
const userValidation = require('../middleware/userValidation')


// Routes
router.post('/',userValidation , validation_array, handleValidationErrors, createBook)
router.get('/:start/:end', getAllBook);
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

// router.post('/issue/:id', bookIssue)

module.exports = router;