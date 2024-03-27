const TransactionRecord = require('../../model/Book-Transaction/transactionRecord')

const getTransaction = async (req, res) => {
    try {
        const transactions = await TransactionRecord.find();
        if (!transactions || transactions.length === 0){
            res.status(200).json({success: false, message: 'No transaction records found'})
        }
        else{
            res.status(200).json({ success: true, transactions })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getTransaction;