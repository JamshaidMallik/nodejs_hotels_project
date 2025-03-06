const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// define event handlers for the connection
db.on('connected',()=>{console.log('Mongoose connected to Onlline Database');});
db.on('error',(err)=>{console.log('Mongoose connection error: ' + err);});
db.on('disconnected',()=>{console.log('Mongoose disconnected');});

// export the database connection
module.exports = db;