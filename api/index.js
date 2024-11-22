const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const UserModel = require('../models/UserModel');
const connectDb = require('../utils/db');

const app = express();
const PORT = 8080;

// Establish DB connection once
connectDb();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect("https://onlinemanipalmba.in/")
});

// POST endpoint to create a user
app.post('/', async (req, res) => {
    const { name, email, phone, course } = req.body;

    // Check for missing fields
    if (!name || !email || !phone || !course) {
        return res.redirect("https://onlinemanipalmba.in/");
    }

    try {
        // Check if user already exists by phone
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.redirect("https://onlinemanipalmba.in/");
        }

        // Create and save new user
        const newUser = new UserModel({ name, email, phone, course });
        await newUser.save();

        res.redirect("https://onlinemanipalmba.in/");
    } catch (err) {
        res.redirect("https://onlinemanipalmba.in/");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
