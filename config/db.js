const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected....")
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;