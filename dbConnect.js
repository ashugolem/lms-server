const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.connectionString




const connectTOMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}

module.exports = connectTOMongo