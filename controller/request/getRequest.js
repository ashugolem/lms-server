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
                    if(user.role==="Student"){
                        const student = await Student.findOne({user: request.user});
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
                    const teacher = await Teacher.findOne({user: request.user});
                    return {
                        ...request.toObject(),
                        userName: user ? user.name : null,
                        role: user ? user.role : null,
                        bookName: book ? book.title : null,
                        bookCode: book ? book.code : null,
                        profile: user.profile ? user.profile : null,
                        eid: teacher? teacher.eid : null,
                        designation: teacher? teacher.designation : null,
                        selfNo: book ? book.selfNo : null
                    };

                }));

            res.status(200).json({ allRequests: requestsWithDetails });
        } else {
            res.status(200).json({ allRequests: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Some Error Occurred!", error: error.message });
    }
};

module.exports = getRequest;
