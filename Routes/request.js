const express = require('express')
const router = express.Router();

const getRequest = require('../controller/request/getRequest')
const createRequest = require('../controller/request/createRequest')
const updateRequest = require('../controller/request/updateRequest')

router.get('/', getRequest);
router.post('/', createRequest);
router.put('/:id', updateRequest);

module.exports = router;