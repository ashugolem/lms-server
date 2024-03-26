const User = require('../../model/userModel')
const bcrypt = require('bcryptjs')

const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        console.log(req.user.id)
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, msg: "Invalid  User ID" });
        }
        else if(req.user.id !== req.params.id){
            res.status(403).json({ success: false, msg: "You are not authorised" });
        }
        else {
            // Hashing the Password before saving it to database
            // Generating Salt : Additional character in Password
            const salt = await bcrypt.genSalt(10);

            // Hashing Password with generated Salt
            const hashedPassword = await bcrypt.hash(password, salt);
            // Saving Newly created and Hashed Password into Database
            await User.updateOne({ _id: user._id }, { $set: { 'password': hashedPassword } })
                .then(() => {
                    res.status(200).json({ success: true, msg: "Password updated successfully" })
                })
        }
    } catch (error) {
    res.status(500).json({ success: false, msg: "Error in changing password", error: error.message })
}
}
module.exports = changePassword;