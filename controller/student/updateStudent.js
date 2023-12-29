const Student = require('../../model/studentModel')

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            res.status(404).json({ success: false, msg: "Student does not exists!" })
        }
        await Student.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}
module.exports = updateStudent;