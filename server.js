const express = require('express');
const routes = require('./routes');

const app = express();

// Set the port to use
const port = process.env.PORT || 5000;

// Load routes from the routes/index.js file
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
