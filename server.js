const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World! this is new backend developer in the house');
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// comment to see github chagnes live
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})