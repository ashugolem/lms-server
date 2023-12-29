const Student = require('../../model/studentModel')

const getStudent = async (req, res) => {
    const student = await Student.findOne({ user: req.params.id })
    try {
        if (!student) {
            res.status(200).json({ success: false, msg: `User does not exists ` })
        }
        else {
            res.status(200).json({ success: true, student })
        }
    } catch (error) {
        res.status(500).json({ msg: `Error in finding student with error message --> ${error.message}` })
    }
}

module.exports = getStudent;