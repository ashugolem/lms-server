const express = require('express')
const router = express.Router()

const createTeacher = require('../controller/teacher/createTeacher')
const getTeacher = require('../controller/teacher/getTeacher')
const updateTeacher = require('../controller/teacher/updateTeacher')

router.post('/:id', createTeacher)
router.get('/details/:id', getTeacher)
router.put('/update/:id', updateTeacher)

module.exports = router