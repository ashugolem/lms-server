const User = require('../../model/userModel')

const getByRole = async (req, res) => {
    try {
        let users = await User.find();
        users = users.filter((user)=>{
            return user.role === req.params.name
        })
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in getting Students", error: error.message })
    }
}
module.exports = getByRole;