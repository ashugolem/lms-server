const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyAuth = (req, res) => {
    //check if the user authToken is correct
    const token = req.header('auth-token');
    //Check if there's a token in the header
    if (!token) {
        return res.status(401).json({ msg: 'No Token Provided!' });
    }
    else {
        try {
            const roleToVerify = req.params.role;
            const decoded = jwt.verify(token, (process.env.JWT));
            req.user = decoded.user;
            if (decoded.user.role === roleToVerify) {
                return res.status(403).json({ success: true })
            }
            else {
                return res.status(403).json({ success: false, msg: 'You are not authorized to perform this action.' })
            }
        } catch (err) {
            return res.status(401).json({ success: false, msg: 'Auth Failed!', error: err.message });
        }
    }

}
module.exports = verifyAuth;