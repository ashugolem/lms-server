const Student = require('../../model/studentModel')
const User = require('../../model/userModel')
const getStudent = async (req, res) => {
    const student = await Student.findOne({ user: req.params.id })
    try {
        if (!student) {
            res.status(200).json({ success: false, msg: `User does not exists ` })
        }
        else {
            const user = await User.findById(req.params.id)
            res.status(200).json({student: { 
                ...student.toObject(), 
                profile: user.profile? user.profile : null
            }})
        }
    } catch (error) {
        res.status(500).json({ msg: `Error in finding student with error message --> ${error.message}` })
    }
}

module.exports = getStudent;