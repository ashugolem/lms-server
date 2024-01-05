const Teacher = require('../../model/teacherModel')

const createTeacher = async (req, res) => {
    try {
        const {name, eid, designation, dob } = req.body // Destructuring
        const teacher = await Teacher.create({
            user: req.params.id,
            name,
            eid, 
            designation,
            dob
        })

        res.json({ success: true, teacher }).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createTeacher;