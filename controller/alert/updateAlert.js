const Alert = require('../../model/alertModel')

const updateRequest = async (req, res) => {
    try {
        const { seen } = req.body // Destructuring
        const request = await Alert.findById(req.params.id)
        if(!request){
            return res.status(404).json({ message: 'No Alert found with that id' })
        }
        const updatedRequest = await Alert.findByIdAndUpdate({ _id: req.params.id }, { $set: {seen} })
        const successSeen = !updatedRequest.seen
        res.json({ success: true, successSeen, updatedRequest: await Alert.findById(req.params.id) }).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = updateRequest;