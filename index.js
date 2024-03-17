const bodyParser = require('body-parser');
const connectToMongo = require('./dbConnect');
const cors = require('cors');
const express = require('express');
const cron = require('node-cron');
const addFineToStudentAccount = require('./controller/fine/cronJobForFine');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Enable CORS
app.use(cors());

// Serving static files 
app.use('/upload', express.static(__dirname + '/upload'))
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
app.use('/teacher',require('./Routes/teacher'))
app.use('/fine',require('./Routes/fine_parameters'))
app.use('/calculate-fine',require('./Routes/calculateFine'))
app.use('/activation-request',require('./Routes/activation'))


//   * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
// second(optional)

cron.schedule('0 0 * * 1-5', () => {
    addFineToStudentAccount();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
