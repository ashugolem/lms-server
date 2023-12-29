const Alert = require('../../model/alertModel');
const User = require('../../model/userModel');
const Book = require('../../model/bookModel')
const getAlert = async (req, res) => {
    try {
        const allAlert = await Alert.find();
        if (allAlert.length > 0) {
            const alertsWithDetails = await Promise.all(
                allAlert.map(async (alert) => {
                    const user = await User.findById(alert.user);
                    const book = await Book.findById(alert.book);

                    return {
                        ...alert.toObject(),
                        userName: user ? user.name : null,
                        bookName: book ? book.title : null,
                        selfNo: book ? book.selfNo : null,                        
                        code: book ? book.code : null,                        
                    };
                }));

            res.status(200).json({ allAlert: alertsWithDetails });
        } else {
            res.status(200).json({ allAlert: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Some Error Occurred!", error: error.message });
    }
};

module.exports = getAlert;
