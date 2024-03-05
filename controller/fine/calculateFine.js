const Transaction = require('../../model/Book-Transaction/bookTransaction');
const FineParameter = require('../../model/fineParametersModal')
const FineHistory = require('../../model/fineHistory')
const Students = require('../../model/studentModel')
const moment = require('moment');
let latestFine = 0
const currentDate = new Date

const calculateFine = async (req, res) => {
    let filteredTransaction = []
    let k = 0
    let transactions = await Transaction.find()
    const fines = await FineParameter.find()
    latestFine = fines[fines.length - 1]
    transactions.map(async (transaction) => {
        if (!transaction.isReturned) {
            try {
                const transactionBySameUser = transactions.filter(t => t.user.toString() === transaction.user.toString());
                filteredTransaction[k++] = transactionBySameUser;
                const newTransaction = transactions.filter(t => t.user.toString() != transaction.user.toString())
                transactions = [...newTransaction]
            } catch (error) {
                console.log(error)
            }
        }
    })
    filteredTransaction = filteredTransaction.filter(transaction => transaction.length > 0);
    fineList = []
    a = 0
    filteredTransaction.map(async (transaction) => {
        totalFinePerUser = 0
        let counterForDate = 0
        transaction.map(async (t
        ) => {
            const timeDifference = Math.abs(currentDate.getTime() - t.issueDate.getTime());
            let DayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            if (DayDifference > latestFine.deadline) {
                const numberOfDaysLate = DayDifference - latestFine.deadline;
                try {
                    const newFine = numberOfDaysLate * latestFine.finePerDay
                    totalFinePerUser += newFine;
                    let fineDate = moment(t.issueDate).add(latestFine.deadline, 'day').toISOString();
                    let date = moment()
                    let loopCounter = moment(date).diff(fineDate, 'days');
                    while (loopCounter>0) {
                        await FineHistory.create({
                            book: t.book,
                            user: t.user,
                            date: moment(fineDate).add(counterForDate++, 'day').toISOString(),
                            fineAmount: latestFine.finePerDay
                        })
                        loopCounter--;
                    }
                }
                catch {
                    console.log("Error")
                }
            }
        })
        // Updating the student's Fine  with New fine
        try {
            fineList.push(totalFinePerUser)
            const student = await Students.findOne({ user: transaction[0].user })
            await Students.updateOne({ _id: student._id }, { $set: { fine: fineList[a++] } })
        } catch (error) {
            console.log(error)
        }
    })
    res.status(200).json({ success: true });
}


module.exports = calculateFine;