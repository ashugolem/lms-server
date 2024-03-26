const jwt = require('jsonwebtoken')
require('dotenv').config();

const adminValidation = (req, res, next) => {
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
            if (decoded.user.role === "Admin") {
                next();
            }
            else{
                return res.status(403).json({msg:'You are not authorized to perform this action.'})
            }
        } catch (err) {
            return res.status(401).json({ msg: 'Auth Failed!', error: err.message });
        }
    }

}
module.exports = adminValidation;