const BookTansaction = require('../../model/Book-Transaction/bookTransaction')
const User = require('../../model/userModel')
const Student = require('../../model/studentModel')
const Teacher = require('../../model/teacherModel')
const Book = require('../../model/bookModel')
const Transaction = require('../../model/Book-Transaction/transactionRecord')

const moment = require("moment/moment");

const bookIssue = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        const userIssued = await BookTansaction.findOne({ user: req.body.user })
        const user = await User.findById({ _id: req.body.user })
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found' })
        }

        if (userIssued != null && req.params.id === userIssued.book.toString()) {
            // Using moment js to format issueDate
            const issueDate = moment(userIssued.issueDate).format('DD-MM-YYYY')
            const issueTime = moment(userIssued.issueDate).format('hh:mm:ss')
            return res.status(500).json({ success: false, msg: `User - ${user.name}  already has book - ${book.title}`, issuedOn: issueDate, issuedAt: issueTime })
        }
        if (!book.stock) {
            return res.status(401).json({ success: false, msg: 'Book stock has been exhausted !!' })
        }
        const BookTransaction = await BookTansaction.create({
            user: req.body.user,
            book: req.params.id,    // Book id will be coming from url
        })

        // Using moment js to format issueDate
        const issueDate = moment(BookTransaction.issueDate).format('DD-MM-YYYY')
        const issueTime = moment(BookTransaction.issueDate).format('hh:mm:ss')

        // Incrementing the Book Lent count of the Student and Teacher
        if (req.body.role === "Student") {
            const student = await Student.findOne({ user: req.body.user });
            if (!student) return res.status(404).json({ msg: "Student Not Found" });

            try {
                await Student.findOneAndUpdate(
                    { user: req.body.user },
                    {
                        $set: {
                            booksLent: (Number(student.booksLent) || 0) + 1,
                        },
                    }
                );
            } catch (error) {
                res.status(500).json({
                    msg: "Error in incrementing Books Lent : ",
                    error: error.message,
                });
            }
        }

        if (req.body.role === "Teacher") {
            const teacher = await Teacher.findOne({ user: req.body.user });
            if (!teacher) return res.status(404).json({ msg: "Teacher Not Found" });

            try {
                await Teacher.findOneAndUpdate(
                    { user: req.body.user },
                    {
                        $set: {
                            booksLent: (Number(teacher.booksLent) || 0) + 1,
                        },
                    }
                );
            } catch (error) {
                res.status(500).json({
                    msg: "Error in incrementing Books Lent : ",
                    error: error.message,
                });
            }
        }
        // Decrementing stock availablity by 1 
        await Book.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                stock: book.stock - 1
            }
        })
        

        const transaction = await Transaction.create({
            user: req.body.user,
            message: `${book.title} - book has been issued to ${user.name} at ${issueTime} on ${issueDate}`
        })
        return res.status(200).json({ success: true, msg: transaction.message })

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message })
    }
}
module.exports = bookIssue;