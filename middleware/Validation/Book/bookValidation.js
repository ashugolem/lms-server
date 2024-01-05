// validationMiddleware.js

const { body, validationResult } = require('express-validator');

const validation_array = [
    body("title", "Title must be specified.").isLength({ min: 3 }),
    body("author", "Author must be specified.").isLength({ min: 3 }),
    body("isbn", "ISBN must be specified.").isLength({ min: 3 }),
    body("subject", "Subject must be specified.").isLength({ min: 3 }),
    body("price", "Price must be specified.").isLength({ min: 3}),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
    }
    next();
};

module.exports = {
    validation_array,
    handleValidationErrors,
};
