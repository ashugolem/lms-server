const Book = require('../../model/bookModel')

const updateBook = async (req, res) => {
    try {
        // const { title, author, total, isbn, subject, selfNo, isAvailable, stock, price, publishedOn } = req.body // Destructuring

        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(400).json({ message: 'Book Not Found' })
        }

        // const newBook = {
        //     title: title,
        //     author: author,
        //     isbn: isbn,
        //     subject: subject,
        //     isAvailable: isAvailable,
        //     stock: stock,
        //     total: total,
        //     price: price,
        //     selfNo: selfNo,
        //     publishedOn: publishedOn,
        //     code: code
        // }

        // Update the book in database
        const updatedBook = await Book.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })

        res.json({ success: true, updatedBook }).status(200)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = updateBook;