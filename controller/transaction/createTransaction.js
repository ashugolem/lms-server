const Transaction = require('../../model/Book-Transaction/bookTransaction')
const TransactionRecord = require('../../model/Book-Transaction/transactionRecord')
const Book = require('../../model/bookModel')
const User = require("../../model/userModel")

const createTransaction = async (req, res) => {
    try {
        const {user} = req.body
        await Transaction.Create({
            user: user,
            book: req.params.id
        })
        await TransactionRecord.Create({
            user: user,
            type: 'Issue',
            message: `Book - ${await Book.findById(req.params.id).title} has been issued to ${await User.findById(user).name}` 
        })
        res.status(200).json({success: true})
    } catch (error) {
        
    }
}

module.exports = createTransaction;