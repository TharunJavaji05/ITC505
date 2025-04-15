const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the ../public directory
const publicPath = path.join(__dirname, '..', 'public');
server.use(express.static(publicPath));

// POST route to handle the Mad Lib form
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, animal } = req.body;

  if (!noun || !verb || !adjective || !place || !animal) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/">Go Back</a>
    `);
  }

  const madLib = `
    One day, a ${adjective} ${animal} went to the ${place} to ${verb} a ${noun}.
    It was the best day ever!
  `;

  res.send(`
    <h1>Here's Your Mad Lib!</h1>
    <p>${madLib}</p>
    <a href="/">Go Back</a>
  `);
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
