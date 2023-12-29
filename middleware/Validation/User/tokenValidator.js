const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'IloveMERN'

const tokenValidator = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ success: false, error: 'No Token Provided' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).send({ success: false, error: 'Please authenticate using valid token' })
    }
}


module.exports = tokenValidator;