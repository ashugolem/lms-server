const Fine = require('../../model/fineParametersModal');
const User = require('../../model/userModel');

const createFine = async (req, res) => {
    try {
        const { finePerDay, deadline } = req.body // Destructuring
        const user = req.params.id;
        const foundUser = await User.findById(user)
        if(foundUser.role==="Admin"){
            await Fine.create({
                user,
                finePerDay,
                deadline
            })
            res.json({ success: true }).status(200)
        }
        else{
            res.json({ success: false, message: "User must be admin is order to update fine" }).status(200)
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = createFine;