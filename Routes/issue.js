const express = require('express')
const router = express.Router();

const bookIssue = require('../controller/issue/bookIssue')
const getAllCreation = require('../controller/userActivation/getAllActivationRequests')

router.post('/:id', bookIssue)
router.get('/get-all-creations', getAllCreation)

module.exports = router;