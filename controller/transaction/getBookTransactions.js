const TransactionRecord = require('../../model/Book-Transaction/transactionRecord')

const getTransaction = async (req, res) => {
    try {
        const transactions = await TransactionRecord.find();
        res.status(200).json({ transactions })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getTransaction;