require('dotenv').config();// Load environment variables
const app = require('./app');
const http = require('http');

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});