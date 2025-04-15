const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const server = express();

// Middleware
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from /public
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Route to test random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Handle Mad Lib form submission
server.post('/ITC505/lab-7/', (req, res) => {
  const { name, adjective, noun, verb, place } = req.body;

  if (!name || !adjective || !noun || !verb || !place) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
    `);
    return;
  }

  const story = `
    <h1>Your Mad Lib Story</h1>
    <p>Once upon a time, <strong>${name}</strong> went on a(n) <strong>${adjective}</strong> adventure.</p>
    <p>They brought their trusty <strong>${noun}</strong> and decided to <strong>${verb}</strong> all the way to <strong>${place}</strong>.</p>
    <p>It was a journey to remember!</p>
  `;

  res.send(story);
});

// Port logic
let port = 8080;
if (process.argv[2] === 'local') {
  port = 8080;
}

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
