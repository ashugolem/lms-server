const bodyParser = require('body-parser');
const connectToMongo = require('./dbConnect');
const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Enable CORS
app.use(cors());

// Body Parser
app.use(bodyParser.json());

// Routes
app.use('/book', require('./Routes/book'));
app.use('/user', require('./Routes/user'));
app.use('/issue', require('./Routes/issue'));
app.use('/request', require('./Routes/request'));
app.use('/alert', require('./Routes/alert'));
app.use('/transaction', require('./Routes/transaction'));
app.use('/student',require('./Routes/student'))
app.use('/activation-request',require('./Routes/activation'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
