const User = require('../../model/userModel')
const JWT = require('jsonwebtoken')
const JWT_SECRET_KEY = "IloveMERN"

const bcrypt = require('bcryptjs')
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({ success: false, msg: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            res.status(404).json({ success: false, msg: "Invalid Credentials" })
        }

        const data = {
            user: {
                id: user._id,
                role: user.role,
                status: user.status
            }
        }
        const authToken = JWT.sign(data, JWT_SECRET_KEY)
        res.cookie("auth-token", authToken, {
            httpOnly: true,
            sameSite: "None",
            secure: false,
            expires: new Date( Date.now() + 259200000 )
        })
        res.status(200).json({ success: true, authToken, msg: "Logged In Successfully", id: user._id, username: user.name })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in Logging In", error: error.message })
    }
}
module.exports = createUser;