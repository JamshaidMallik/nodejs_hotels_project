const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World! this is new backend developer in the house');
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



// comment to see github chagnes live
app.listen(port, () => {
    console.log('Server is running on port 3000');
})