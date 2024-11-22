const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Makes this field mandatory
        trim: true // Removes leading/trailing spaces
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email addresses
        trim: true,
        // match: [/.+@.+\..+/, 'Please enter a valid email address'] // Regex validation
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        // match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Example: 10 digits
    },
    course: {
        type: String,
        trim: true,
        default: 'Not specified' // Default value if not provided
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);
