const jwt = require('jsonwebtoken')
require('dotenv').config();

const userValidation = (req, res, next) => {
    //check if the user authToken is correct
    const token = req.header('auth-token');
    //Check if there's a token in the header
    if (!token) {
        return res.status(401).json({ msg: 'No Token Provided!' });
    }
    else {
        try {
            const decoded = jwt.verify(token, (process.env.JWT));
            req.user = decoded.user;
            console.log('User Validation Middleware', decoded);
            next();
        } catch (err) {
            return res.status(401).json({ msg: 'Auth Failed!', error: err.message });
        }
    }

}
module.exports = userValidation;