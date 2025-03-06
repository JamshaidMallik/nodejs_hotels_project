const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/create', async (req, res) => {
    try {
        var data = req.body;
        const newPerson = new Person(data);
        let response = await newPerson.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/list', async (req, res) => {
    try {
        let response = await Person.find();
        res.status(200).json({
            message: 'Person list',
            data: response
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        let workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            let response = await Person.find({ work: workType });
            res.status(200).json({
                message: 'success',
                data: response
            });
        } else {
            res.status(402).json({ message: 'Invalid work type' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;