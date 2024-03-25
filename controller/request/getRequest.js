const Request = require('../../model/requestModel');
const Book = require('../../model/bookModel');
const User = require('../../model/userModel');
const Student = require('../../model/studentModel');
const Teacher = require('../../model/teacherModel');

const getRequest = async (req, res) => {
    try {
        const allRequests = await Request.find();

        if (allRequests.length > 0) {
            const requestsWithDetails = await Promise.all(
                allRequests.map(async (request) => {
                    const user = await User.findById(request.user);
                    const book = await Book.findById(request.book);
                    if (user.role === "Student") {
                        const student = await Student.findOne({ user: request.user });
                        return {
                            ...request.toObject(),
                            userName: user ? user.name : null,
                            role: user ? user.role : null,
                            profile: user.profile ? user.profile : null,
                            bookName: book ? book.title : null,
                            bookCode: book ? book.code : null,
                            studentAdmNo: student ? student.admissionNo : null,
                            selfNo: book ? book.selfNo : null
                        };
                    }
                    const teacher = await Teacher.findOne({ user: request.user });
                    return {
                        ...request.toObject(),
                        userName: user ? user.name : null,
                        role: user ? user.role : null,
                        bookName: book ? book.title : null,
                        bookCode: book ? book.code : null,
                        profile: user.profile ? user.profile : null,
                        eid: teacher ? teacher.eid : null,
                        designation: teacher ? teacher.designation : null,
                        selfNo: book ? book.selfNo : null
                    };

                }));
            const unseenRequestsCount = requestsWithDetails.filter(request => !request.seen).length;
            const sortedRequests = requestsWithDetails.sort((a, b) => {
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
            res.status(200).json({
                unseenRequestsCount,
                allRequests: sortedRequests 
            });
        } else {
            res.status(200).json({ allRequests: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Some Error Occurred!", error: error.message });
    }
};

module.exports = getRequest;
