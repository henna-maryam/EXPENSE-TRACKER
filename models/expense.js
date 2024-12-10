const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    expensedOn: {type:String, required:true},
    amount: {type:Number, required:true},

    food: {type:String, required:false},
    transport: {type:String, required:false},
    entertainment: {type:String, required:false},
    other: {type:String, required:false},

    date: {type:Date, required:true}
});

module.exports = mongoose.model('Expense',expenseSchema);