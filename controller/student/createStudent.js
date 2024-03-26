const Student = require('../../model/studentModel')

const createStudent = async (id, auth) => {
    try {
        const {name, admissionNo, course, branch, semester  } = auth // Destructuring
        console.log("Name : ",auth.name)
        const student = await Student.create({
            user: id.toString(),
            name,
            admissionNo, 
            course, 
            branch, 
            semester
        })

        return { success: true, student }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createStudent;