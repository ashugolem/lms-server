const Request = require('../../model/requestModel')

const createRequest = async (req, res) => {
    try {
        const { user, book, status, type  } = req.body // Destructuring
        await Request.create({
           user: user,
           book: book,
           status: status,
           type: type
        })

        res.json({ success: true}).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = createRequest;