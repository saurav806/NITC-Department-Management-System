const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/admin";

// const URI = "mongodb+srv://sauravkr806:finalyearproject@cluster0.bopm0hl.mongodb.net/adminpanel?retryWrites=true&w=majority&appName=Cluster0";
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    } catch (error) {
        console.error("DB connection failed");
        process.exit(0);
    }
}


module.exports = connectDB;