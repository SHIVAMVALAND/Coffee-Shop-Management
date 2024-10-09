const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Customers = require('./coffee');
const cors = require('cors');

mongoose.connect("mongodb+srv://Shivam_Valand:MongoDB123@cluster0.3ktnj.mongodb.net/CoffeeShop").then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); 
    app.use(cors());

    app.get('/coffees',async (req,res) =>{
        const ans = await Customers.find();
        res.send(ans);
    });

    app.get('/coffees/:_id',async (req,res) =>{
        const ans = await Customers.findOne({_id : req.params._id});
        res.send(ans);
    });

    app.post('/coffees/add', async (req, res) => {
        try {
            const coffee = new Customers({...req.body});
            const ans = await coffee.save();
            res.status(201).send(ans); // Respond with 201 Created status
        } catch (error) {
            console.error("Error adding coffee:", error); // Log the error for debugging
            res.status(400).json({ message: 'Error adding coffee', error: error.message }); // Respond with an error message
        }
    });
    
    app.delete('/coffees/:_id', async (req,res) =>{
        const ans = await Customers.deleteOne({_id : req.params._id});
        res.send(ans);
    });

    app.patch('/coffees/update/:_id', async (req,res) =>{
        const coffee =await Customers.findOne({_id : req.params._id});
        coffee.Customer_Name = req.body.Customer_Name;
        const ans = await coffee.save();
        res.send(ans);
    });

    app.patch('/coffees/:_id/status', async (req, res) => {
        const { status } = req.body;
        try {
            const updatedCoffee = await Customers.findByIdAndUpdate(req.params._id, { status }, { new: true });
            if (!updatedCoffee) return res.status(404).json({ message: 'Coffee not found' });
            res.json(updatedCoffee);
        } catch (error) {
            res.status(500).json({ message: 'Error updating coffee status' });
        }
    });
      

    app.listen(4000, () => {
        console.log("Server Started");
    });
});