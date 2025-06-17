// Import Mongoose library
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect using connection string
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Stop process if connection fails
  }
};

// Export the function for use in server.js
module.exports = connectDB;
