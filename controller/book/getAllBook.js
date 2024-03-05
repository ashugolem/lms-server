const Book = require('../../model/bookModel');

const getAllBook = async (req, res) => {
    try {
        const start = Number(req.params.start); // Start number for pagination
        const end = Number(req.params.end);     // End number for pagination

        // Skipping the first  'start' elements and limiting to 'end - start + 1' elements
        const totalBooks = await  Book.countDocuments();
        if(start>totalBooks){
            return res.status(400).json({message: "Invalid page number!"});
        }
        if(start>=end){
            return res.status(400).json({message: "Initial index must be smaller"})
        }
        const books = await Book.find().skip(start).limit(end - start);
        res.json({books, totalBooks}).status(200);

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Internal Server Error" }).status(400);
    }
};

module.exports = getAllBook;
