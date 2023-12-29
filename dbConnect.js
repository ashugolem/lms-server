const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.connectionString

// Code for aggregation
// const Book = require('./model/bookModel')
// const agg = [
//     {
//         $match: {
//             stock: { $gt: 100 },
//         },
//     },
//     {
//         $match: {
//             author: 'Mark Vasher',
//         },
//     },
// ];



const connectTOMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

    // const result = await Book.aggregate(agg);

    // // The 'result' variable now contains the aggregated data
    // console.log(result);
}

module.exports = connectTOMongo