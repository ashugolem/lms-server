const BookTansaction = require('../../model/Book-Transaction/bookTransaction')
const User = require('../../model/userModel')
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
            return res.status(200).json({ success: false, msg: `User - ${user.name}  already has book - ${book.title}`, issuedOn: issueDate, issuedAt: issueTime })
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