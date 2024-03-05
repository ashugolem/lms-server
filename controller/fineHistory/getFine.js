const Book = require('../../model/bookModel')
const fineHistories = require('../../model/fineHistory')

const getFineHistory = async (req, res) => {
    const fines = await fineHistories.find({ user: req.params.id })
    const response = []
    try {
        if (!fines) {
            res.status(200).json({ success: true, message: "No Fines Found for the user" })
        }
        else {
            let totalFine =  0;
            await Promise.all(fines.map(async (fine) => {
                try {
                    const book = await Book.findOne({ _id: fine.book });
                    if (!book) {
                        throw new Error(`Book with ID ${fine.book} does not exist`);
                    }
                    totalFine += fine.fineAmount;
                    const obj = {
                        date: fine.date,
                        bookName: book.title,
                        bookCode: book.code,
                        fine: fine.fineAmount
                    };
                    response.push(obj);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ success: false, msg: error.message });
                }
            }));
            response.sort((a, b) => new Date(a.date) - new Date(b.date));
            res.status(200).json({totalFine, response})
        }
    } catch (error) {
        res.status(500).json({ msg: `Error in finding student with error message --> ${error.message}` })
    }
}

module.exports = getFineHistory;