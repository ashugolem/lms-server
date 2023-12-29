const User = require('../../model/userModel')

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({success: false, msg: "User does not exists!"})
        }
        await User.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})        
    }
}
module.exports = updateUser;