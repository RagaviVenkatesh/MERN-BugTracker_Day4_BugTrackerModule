// Import Express framework
const express = require("express");
// To read variables from .env file
const dotenv = require("dotenv");
// To enable CORS (Cross-Origin Resource Sharing)
const cors = require("cors");
// Import database connection function
const connectDB = require("./config/db");
// Load environment variables from .env into process.env
dotenv.config();
// Connect to MongoDB
connectDB();

// Create an Express application
const app = express();
// Enable CORS to allow requests from frontend
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// Route group for authentication APIs
app.use("/api/auth", require("./routes/authRoutes"));
// Route group for project management APIs
app.use("/api/projects", require("./routes/projectRoutes"));
// Route group for bug tracking APIs
app.use("/api/bugs", require("./routes/bugRoutes"));

// Use port from .env or default to 5000
const PORT = process.env.PORT || 5000;
// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
