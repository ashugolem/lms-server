const Teacher = require('../../model/teacherModel')

const getTeacher = async (req, res) => {
    const teacher = await Teacher.findOne({ user: req.params.id })
    try {
        if (!teacher) {
            res.status(200).json({ success: false, msg: `User does not exists ` })
        }
        else {
            res.status(200).json({ success: true, teacher })
        }
    } catch (error) {
        res.status(500).json({ msg: `Error in finding student with error message --> ${error.message}` })
    }
}

module.exports = getTeacher;