const express = require('express')
const router = express.Router();

const getAllActivationRequest = require('../controller/userActivation/getAllActivationRequests') // To create a creation request to approve or decline creation

const createActivationRequest = require('../controller/userActivation/createActivationRequest')
const updateActivationRequest = require('../controller/userActivation/updateActivationRequest')

// ActivationRequest route
router.get('/', getAllActivationRequest)
router.post('/', createActivationRequest)
router.put('/:id', updateActivationRequest)




module.exports = router;