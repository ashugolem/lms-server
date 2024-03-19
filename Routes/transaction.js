const express = require('express')
const router = express.Router();

// API
const createTransaction = require('../controller/transaction/createTransaction')
const getTransaction = require('../controller/transaction/getBookTransactions');
const userWiseTransactions = require('../controller/transaction/userWiseTransactions');

router.get('/', getTransaction)
router.get('/:id', userWiseTransactions)
router.post('/:id', createTransaction)

module.exports = router;