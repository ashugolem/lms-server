const express = require('express')
const router = express.Router();

const getAlert = require('../controller/alert/getAlert')
const createAlert = require('../controller/alert/createAlert')
const updateAlert = require('../controller/alert/updateAlert')

router.get('/:end', getAlert);
router.post('/', createAlert);
router.put('/:id', updateAlert);

module.exports = router;