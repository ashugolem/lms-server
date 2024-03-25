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
            const unseenAlertsCount = alertsWithDetails.filter(request => !request.seen).length;
            res.status(200).json({
                unseenAlertsCount,
                allAlert: alertsWithDetails.sort((a, b) => {
                    // Custom sorting logic
                    if (a.seen === b.seen) {
                        // If both alerts have the same 'seen' value, maintain the original order
                        return 0;
                    } else if (a.seen === false) {
                        // If 'seen' is false, move the alert up in the sorted order
                        return -1;
                    } else {
                        // If 'seen' is true, move the alert down in the sorted order
                        return 1;
                    }
                }).slice(0, req.params.end)
            });
        } else {
            res.status(200).json({ allAlert: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Some Error Occurred!", error: error.message });
    }
};

module.exports = getAlert;
