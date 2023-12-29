const User = require('../../model/userModel')

const getUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    try {
        if(!user){
            res.status(200).json({success: false, msg: `User does not exists `})
        } 
        else{
            res.status(200).json({success: true, msg: `User exists with name : ${user.name}`})        
        }       
    } catch (error) {
        res.status(500).json({msg: `Error in checking with error message --> ${error.message}`})        
    }
}

module.exports = getUser;