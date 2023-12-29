const express = require('express')
const router = express.Router();

// API
const createTransaction = require('../controller/transaction/createTransaction')
const getTransaction = require('../controller/transaction/getBookTransactions')

router.get('/', getTransaction)
router.post('/:id', createTransaction)

module.exports = router;