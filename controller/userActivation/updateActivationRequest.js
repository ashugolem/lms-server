const ActivationModel = require('../../model/userCreation')

const updateActivationRequest = async (req, res) => {
    try {
        const activationRequest = await ActivationModel.findById(req.params.id);
        if (!activationRequest) {
            res.status(404).json({ success: false, msg: "User does not exists!" })
        }
        await ActivationModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
        res.status(200).json({ success: true, user: activationRequest.user })
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message })
    }
}
module.exports = updateActivationRequest;