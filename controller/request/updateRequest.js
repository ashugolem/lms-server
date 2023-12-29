const Request = require('../../model/requestModel')

const updateRequest = async (req, res) => {
    try {
        const { status, seen, isactiontaken } = req.body // Destructuring
        const request = await Request.findById(req.params.id)
        if(!request){
            return res.status(404).json({ message: 'No request found with that id' })
        }
        const updatedRequest = await Request.findByIdAndUpdate({ _id: req.params.id }, { $set: { status, seen, isactiontaken } })
        const successSeen = !updatedRequest.seen
        res.json({ success: true, successSeen, updatedRequest: await Request.findById(req.params.id) }).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = updateRequest;