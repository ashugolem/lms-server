const User = require('../../model/userModel')

const getUser = async (req, res) => {
    let user
    if (req.body.email){
        user = await User.findOne({email: req.body.email})
    }
    if (req.body.id){
        user = await User.findOne({_id: req.body.id})
    }
    try {
        if(!user){
            res.status(200).json({success: false, msg: `User does not exists `})
        } 
        else{
            res.status(200).json({ success: true, msg: `User exists with name : ${user.name}`, profile: (user.profile ? user.profile : null)})        
        }       
    } catch (error) {
        res.status(500).json({msg: `Error in checking with error message --> ${error.message}`})        
    }
}

module.exports = getUser;