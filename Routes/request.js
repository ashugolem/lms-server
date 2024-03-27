const express = require('express')
const router = express.Router();

const getRequest = require('../controller/request/getRequest')
const createRequest = require('../controller/request/createRequest')
const updateRequest = require('../controller/request/updateRequest');
const getUserWiseRequest = require('../controller/request/getUserWiseRequest');

router.get('/:end', getRequest);
router.get('/user/:id', getUserWiseRequest);
router.post('/', createRequest);
router.put('/:id', updateRequest);

module.exports = router;