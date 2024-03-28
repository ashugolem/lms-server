const express = require('express')
const router = express.Router();

const calculateFine = require('../controller/fine/calculateFine')
const getFineHistory = require('../controller/fineHistory/getFine');
const addFineToStudentAccount = require('../controller/fine/cronJobForFine');

router.get('/', calculateFine)
router.get('/fine-cron', addFineToStudentAccount)
router.get('/fine-history/:id', getFineHistory)

module.exports = router;