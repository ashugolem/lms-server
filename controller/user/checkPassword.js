const User = require('../../model/userModel')
const bcrypt = require('bcryptjs')

const checkPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, msg: "Invalid  User ID" });
        }
        else if (req.user.id !== req.params.id) {
            res.status(403).json({ success: false, msg: "You are not authorised" });
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                res.status(200).json({ success: true, msg: "Password Matched" })
            }
            else{
                res.status(403).json({ success: false, msg: "Password Not Matched" })
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in checking password", error: error.message })
    }
}
module.exports = checkPassword;