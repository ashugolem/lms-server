const User = require('../../model/userModel')

const getUserData = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    try {
        if (!user) {
            res.status(200).json({ success: false, msg: `User does not exists ` })
        }
        else {
            res.status(200).json({ success: true, user })
        }
    } catch (error) {
        res.status(500).json({ msg: `Error in checking with error message --> ${error.message}` })
    }
}

module.exports = getUserData;