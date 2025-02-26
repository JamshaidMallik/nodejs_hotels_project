const mongoose = require('mongoose');

// Define the Mongodb URL 
const mongoURL = 'mongodb://localhost:27017/hotels';
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// define event handlers for the connection
db.on('connected',()=>{console.log('Mongoose connected to ' + mongoURL);});
db.on('error',(err)=>{console.log('Mongoose connection error: ' + err);});
db.on('disconnected',()=>{console.log('Mongoose disconnected');});

// export the database connection
module.exports = db;