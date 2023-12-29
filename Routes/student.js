const express = require('express')
const router = express.Router()

const createStudent = require('../controller/student/createStudent')
const getStudent = require('../controller/student/getStudent')
const updateStudent = require('../controller/student/updateStudent')

router.post('/:id', createStudent)
router.get('/details/:id', getStudent)
router.put('/update/:id', updateStudent)

module.exports = router