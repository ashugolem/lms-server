const Teacher = require('../../model/teacherModel')

const createTeacher = async (id, auth) => {
    try {
        const {name, eid, designation} = auth // Destructuring
        const teacher = await Teacher.create({
            user: id,
            name,
            eid, 
            designation
        })

        return { success: true, teacher }

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createTeacher;