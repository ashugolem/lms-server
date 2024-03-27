const Transaction = require('../../model/Book-Transaction/bookTransaction');
const FineParameter = require('../../model/fineParametersModal')
const FineHistory = require('../../model/fineHistory')
const Students = require('../../model/studentModel')

const addFineToStudentAccount = async (req, res) => {
    let transactions = await Transaction.find()
    const fines = await FineParameter.find()
    const currentDate = new Date
    const latestFine = fines[fines.length - 1]
    try {
        transactions.map(async (transaction) => {
            if (!transaction.isReturned) {
                // find the student who borrowed this book
                const student = await Students.findOne({ user: transaction.user.toString() })
                const timeDifference = Math.abs(currentDate.getTime() - transaction.issueDate.getTime());
                let DayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                if (DayDifference > latestFine.deadline) {
                    await FineHistory.create({
                        user: transaction.user,
                        book: transaction.book,
                        fineAmount: latestFine.finePerDay,
                        date: currentDate
                    })
                    await Students.updateOne({ _id : student._id }, { $set: { fine: (student.fine + latestFine.finePerDay) } })
                }
            }
        })
        console.log({ success: true })
    } catch (error) {
        console.log({ success: false, error: error.message })
    }
}

module.exports = addFineToStudentAccount;