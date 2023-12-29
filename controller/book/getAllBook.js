const Book = require('../../model/bookModel')
const getAllBook = async (req, res) => {
    try {
        let books = await Book.find()
        res.json(books).status(200)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = getAllBook;