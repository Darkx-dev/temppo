const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../models/UserModel');
const connectDb = require('../utils/db');

const app = express();
const PORT = 8080;

// Establish DB connection once
connectDb();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to create a user
app.post('/', async (req, res) => {
    const { name, email, phone, course } = req.body;

    // Check for missing fields
    if (!name || !email || !phone || !course) {
        return res.status(400).send("Please provide all the fields to create a user.");
    }

    try {
        // Check if user already exists by phone
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.status(409).send("User already exists in the database.");
        }

        // Create and save new user
        const newUser = new UserModel({ name, email, phone, course });
        await newUser.save();

        res.status(201).send(newUser);
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).send("An error occurred while creating the user.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
