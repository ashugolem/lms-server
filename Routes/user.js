const express = require('express')
const router = express.Router();
const multer = require('multer')

// Middleware : Token verification
const tokenValidator = require('../middleware/Validation/User/tokenValidator')

// API
const createUser = require('../controller/user/createUser')                 // For Creating User
const getByRole = require('../controller/user/getByRole')                   // To get list filtered by role
const updateUser = require('../controller/user/updateUser')                 // To Update user information
const getUser = require('../controller/user/getUser')                       // To check if user exists or not
const getAllUser = require('../controller/user/getAllUser')                 // To check if user exists or not
const getUserDetails = require('../controller/user/getUserDetails')         // To get the arrary of all of the users
const login = require('../controller/user/login')                           // To check if user exists or not
const {uploadAvatar, upload} = require('../controller/user/uploadAvatar')
// const upload = require('../controller/user/uploadAvatar')
const changePassword = require('../controller/user/changePassword')


// Middleware : Body Validation 
const { validation_array, handleValidationErrors } = require('../middleware/Validation/User/userValidation');
const adminValidation = require('../middleware/adminValidation');
const userValidation = require('../middleware/userValidation');
const checkPassword = require('../controller/user/checkPassword');

router.post('/', validation_array, handleValidationErrors, createUser)
router.post('/admin-create-user', adminValidation ,  createUser)
router.post('/get-user', getUser)
router.post('/login', login)
router.get('/get-user/:role', getByRole)
router.put('/:id',  updateUser)
router.get('/:id', getUserDetails)
router.get('/', getAllUser)
router.post('/upload-avatar/:id',upload.single('avatar'), uploadAvatar)
router.put('/change-password/:id', userValidation, changePassword)
router.post('/check-password/:id', userValidation, checkPassword)






module.exports = router;