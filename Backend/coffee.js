const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "Coffee_Img": String,
    "Customer_id": Number,
    "Customer_Name": String,
    "Order_item": String,
    "No_Of_Item": Number,
    "Table_No": Number,
    "Category": String,
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'In Progress'], 
        default: 'Pending', 
    }
});

module.exports = mongoose.model("Customers", schema, "Customers");