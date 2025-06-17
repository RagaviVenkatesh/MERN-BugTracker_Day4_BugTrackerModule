// Import JWT
const jwt = require("jsonwebtoken");

// Middleware to protect routes
// This middleware checks if the request has a valid JWT token
// If the token is valid, it adds the user information to the request object
// If the token is invalid or missing, it returns a 401 Unauthorized response
// The token is expected to be in the Authorization header in the format "Bearer <token
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not authorized" });

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded info to request
    next(); // Proceed to next middleware or route
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect };
