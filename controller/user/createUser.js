const User = require('../../model/userModel') 
const JWT = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT || "IloveMERN"

const bcrypt = require('bcryptjs')
const createUser = async (req, res) => {
    try {
        const { name, phone, role, email, password } = req.body;
        
        // Generating Salt : Additional character in Password
        const salt = await bcrypt.genSalt(10)
        
        // Hashing Password with generated Salt
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = await User.create({
            name: name,
            role: role,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        const data = {
            user:{
                id: user._id,
                role: user.role
            }
        }
        const authToken = JWT.sign(data, JWT_SECRET_KEY)
        res.status(200).json({ success: true, authToken, msg: "User Created Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in creating user", error: error.message })
    }
}
module.exports = createUser;