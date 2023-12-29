const Student = require('../../model/studentModel')

const createStudent = async (req, res) => {
    try {
        const {name, admissionNo, course, branch, semester  } = req.body // Destructuring
        const student = await Student.create({
            user: req.params.id,
            name,
            admissionNo, 
            course, 
            branch, 
            semester
        })

        res.json({ success: true, student }).status(200)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createStudent;