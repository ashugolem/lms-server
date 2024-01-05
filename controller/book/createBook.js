const Book = require('../../model/bookModel')

const createBook = async (req, res) => {
    // Code for aggregation
    // const Book = require('./model/bookModel')
    const agg = [
        {
            $count: 'Books'
        }
    ];
    const result = await Book.aggregate(agg);

    // The 'result' variable now contains the aggregated data
    console.log(result[0].Books);

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
            publishedOn: publishedOn,
            code: result[0].Books+1
        })

        res.json({ success: true, book }).status(200)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error" }).status(400)
    }
}

module.exports = createBook;