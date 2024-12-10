const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const expenseSchema = require('../models/expense');

router.use(bodyParser.urlencoded({ extended: true }));  
router.use(bodyParser.json()); 

router.post('/expense', async (req, res) => {
    const { expensedOn, amount, expenseCategory, date } = req.body;

    const expenseData = {
        expensedOn,
        amount,
        date
    };

    if (expenseCategory === 'food') expenseData.food = expenseCategory;
    if (expenseCategory === 'transport') expenseData.transport = expenseCategory;
    if (expenseCategory === 'entertainment') expenseData.entertainment = expenseCategory;
    if (expenseCategory === 'other') expenseData.other = expenseCategory;

    const tracks = new expenseSchema(expenseData);

    try {
        const newExpense = await tracks.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/expense', async (req,res) => {
    try{
        const expenses = await expenseSchema.find();
        res.json(expenses);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


router.put('/expense/:id', async (req, res) => {
    try {
        const { expensedOn, amount, expenseCategory, date } = req.body;

        // Initialize the update object
        const updateData = {
            expensedOn,
            amount,
            date,
            food: null,
            transport: null,
            entertainment: null,
            other: null
        };

        // Set the correct category field based on expenseCategory
        if (expenseCategory === 'food') {
            updateData.food = expenseCategory;
        } else if (expenseCategory === 'transport') {
            updateData.transport = expenseCategory;
        } else if (expenseCategory === 'entertainment') {
            updateData.entertainment = expenseCategory;
        } else if (expenseCategory === 'other') {
            updateData.other = expenseCategory;
        }

        // Perform the update
        const updatedExpense = await expenseSchema.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json(updatedExpense); // Return the updated expense

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/expense/:id', async (req,res) => {
    try{
        const deletedExpense = await expenseSchema.findByIdAndDelete(req.params.id);
        res.json({message:'expense removed'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
});


module.exports = router;