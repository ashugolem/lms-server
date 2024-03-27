const Request = require('../../model/requestModel');
const Transaction = require('../../model/Book-Transaction/bookTransaction');
const User = require('../../model/userModel');
const Book = require('../../model/bookModel');
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Types;

const getUserWiseRequest = async (req, res) => {
    try {
        const allRequests = await Request.find({ user: req.params.id });

        if (allRequests.length > 0) {
            const requestsWithDetails = await Promise.all(
                allRequests.map(async (request) => {
                    const transaction = await Transaction.aggregate([
                        {
                            '$match': {
                                'book': request.book,
                                'user': request.user
                            }
                        }
                    ]).exec();
                    const book = await Book.findById(request.book);

                    return {
                        ...request.toObject(),
                        issueDate: transaction.length > 0 ? transaction[0].issueDate : null,
                        isReturned: transaction.length > 0 ? transaction[0].isReturned : null,
                        bookName: book ? book.title : null,
                        bookCode: book ? book.code : null,
                    };
                })
            );

            const sortedRequests = requestsWithDetails.reverse();
            res.status(200).json({
                success: true,
                count: sortedRequests.length,
                transactions: sortedRequests
            });
        } else {
            res.status(200).json({ allRequests: [] });
        }
    } catch (error) {
        res.status(500).json({ message: "Some Error Occurred!", error: error.message });
    }
};



module.exports = getUserWiseRequest;
