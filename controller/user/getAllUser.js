const User = require('../../model/userModel');

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        if (!users || users.length === 0) {
            return res.status(200).json({ success: false, msg: 'No users found' });
        }

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ success: false, msg: `Error in getting all users with error message: ${error.message}` });
    }
};

module.exports = getAllUser;
