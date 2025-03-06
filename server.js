const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
    console.log([new Date().toLocaleString()], 'Request made to: ' + req.originalUrl);
    next();
};
app.use(logRequest);
app.use(passport.initialize()); 
const localAuthMiddleWare = passport.authenticate('local', {session: false});
app.get('/', function (req, res) { 
    res.send('Hello World! this is new backend developer in the house');
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person', localAuthMiddleWare ,personRoutes);
app.use('/menu', menuItemRoutes);



// comment to see github chagnes live
app.listen(port, () => {
    console.log('Server is running on port 3000');
})