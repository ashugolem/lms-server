const Book = require('../../model/bookModel')

const createBook = async (req, res) => {
    try {
        const { title, author, isbn, selfNo, total, subject, stock, price, publishedOn } = req.body // Destructuring
        const book = await Book.create({
            title: title,
            author: author,
            isbn: isbn,
            subject: subject,
            isAvailable: true,
            total: total,
            stock: stock,
            price: price,
            selfNo: selfNo,
            publishedOn: publishedOn
        })

        res.json({ success: true, book }).status(200)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createBook;