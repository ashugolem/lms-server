const express = require('express')
const router = express.Router();

const createFine = require('../controller/fine_parameters/createFine')
const getFine = require('../controller/fine_parameters/getFine')

router.post('/:id', createFine)
router.get('/', getFine)

module.exports = router;