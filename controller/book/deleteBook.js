const Book = require('../../model/bookModel')

const deleteBook = async (req, res) =>{
    try {
        const book = Book.findById( req.params.id)
        if(!book){
            return res.status(404).json({message:'No such book is found'});
        }
        await Book.findByIdAndDelete( req.params.id )
        res.status(200).json({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error in deleting the book' });
    }
}
module.exports = deleteBook;