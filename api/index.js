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
app.use(cors(
{
    origin: ['https://onlinemanipalmba.in','onlinemanipalmba.in'],
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true, // If cookies or credentials are involved
}
));

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
        console.log('field missing')
        return res.send("Missing field")
    }

    try {
        // Check if user already exists by phone
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.send("Existing user")
        }

        // Create and save new user
        const newUser = new UserModel({ name, email, phone, course });
        await newUser.save();

        res.send(newUser)
    } catch (err) {
        console.error(err)
        res.redirect("https://onlinemanipalmba.in/");
    }
});



// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.timeout = 120000
