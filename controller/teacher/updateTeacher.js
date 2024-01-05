const Teacher = require('../../model/teacherModel')

const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            res.status(404).json({ success: false, msg: "Student does not exists!" })
        }
        await Teacher.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}
module.exports = updateTeacher;