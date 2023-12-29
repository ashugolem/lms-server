const ActivationModel = require('../../model/userCreation')

const createActivationRequest = async (req, res) => {
    try {
        const { user, type } = req.body // Destructuring
        await ActivationModel.create({
            user: user,
            type: type
        })

        res.json({ success: true }).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = createActivationRequest;