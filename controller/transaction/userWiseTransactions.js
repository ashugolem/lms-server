const TransactionRecord = require('../../model/Book-Transaction/bookTransaction')
const Book = require('../../model/bookModel')

const userWiseTransactions = async (req, res) => {
    try {
        const transactions = await TransactionRecord.find({ user: req.params.id });
        if (!transactions || transactions.length === 0) {
            return res.status(200).json({success: false, msg: "No transactions found for this user"});
        }
        else{
            const promises = transactions.map(async (transaction) => {
                const bookDetails = await Book.findById(transaction.book.toString());
                return {
                    bookName: bookDetails.title,
                    isReturned: transaction.isReturned,
                    date: transaction.issueDate
                };
            });
    
            const bookTransactions = await Promise.all(promises);
    
            res.status(200).json({success: true, transactions: bookTransactions});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = userWiseTransactions;
