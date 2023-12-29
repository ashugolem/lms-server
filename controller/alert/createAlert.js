const Alert = require('../../model/alertModel')

const createAlert = async (req, res) => {
    try {
        const { user, reference, message, book, stock } = req.body // Destructuring
        await Alert.create({
            book,
            user,
            stock,
            reference,
            message
        })

        res.json({ success: true }).status(200)

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = createAlert;