const express = require('express');
const router = express.Router();
const MenuItems = require('../models/Menu');



router.post('/create', async (req, res) => {
    try {
        var data = req.body;
        const newMenu = new MenuItems(data);
        let response = await newMenu.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/list', async (req, res) => {
    try {
        let response = await MenuItems.find();
        res.status(200).json({
            message: 'Menu list',
            data: response
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let response = await MenuItems.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Menu deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let response = await MenuItems.findByIdAndUpdate(id, data,{
            new: true,
            useFindAndModify: true
        });
        res.status(200).json({
            message: 'Menu updated successfully',
            data: response
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;