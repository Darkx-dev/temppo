const mongoose = require('mongoose');


const uri = "mongodb://localhost:27017/manipal";
// const uri = "mongodb+srv://admin:admin123@cluster0.2sqv3.mongodb.net/manipal?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(uri);
        console.log("Successfully connected to database")
        return connection;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDb