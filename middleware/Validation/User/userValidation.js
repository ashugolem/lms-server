const { body, validationResult } = require('express-validator');

const validation_array = [
    body("name", "Name must be specified.").isLength({ min: 3 }),
    body("email", "Email must be specified.").isEmail(),
    body("role", "Role must be specified.").isLength({ min: 3 }),
    body("phone", "Phone must be specified.").isLength({ min: 3 }),
    body("password", "Password must be specified.").isLength({ min: 5 }),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validation_array,
    handleValidationErrors,
};
