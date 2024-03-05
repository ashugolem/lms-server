const express = require('express')
const router = express.Router();

const calculateFine = require('../controller/fine/calculateFine')
const getFineHistory = require('../controller/fineHistory/getFine')

router.get('/', calculateFine)
router.get('/fine-history/:id', getFineHistory)

module.exports = router;