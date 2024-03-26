const User = require('../../model/userModel') 
const JWT = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT || "IloveMERN"
const Student = require('../../model/studentModel')
const Teacher = require('../../model/teacherModel')
const bcrypt = require('bcryptjs')
const createUser = async (req, res) => {
    try {
        const { name, phone, role, status, email, password } = req.body;
        console.log(req.body)
        // Generating Salt : Additional character in Password
        const salt = await bcrypt.genSalt(10);

        // Hashing Password with generated Salt
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name,
            role: role,
            email: email,
            status: status,
            phone: phone,
            password: hashedPassword
        });

        if (role === "Student") {
            try {
                const { admissionNo, course, branch, semester } = req.body; 
                await Student.create({
                    user: user._id.toString(),
                    name: user.name,
                    admissionNo,
                    course,
                    branch,
                    semester
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, msg: "Error creating student", error: error.message });
            }
        } else if (role === "Teacher") {
            // Create Teacher logic
            try {
                const { eid, designation } = req.body;
                await Teacher.create({
                    user: user._id.toString(),
                    name: user.name, 
                    eid,
                    designation
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, msg: "Error creating teacher", error: error.message });
            }
        }

        const data = {
            user: {
                id: user._id,
                role: user.role
            }
        };
        const authToken = JWT.sign(data, JWT_SECRET_KEY);
        res.status(200).json({ success: true, authToken, id: user._id, msg: "User Created Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Error in creating user", error: error.message });
    }
};

module.exports = createUser;