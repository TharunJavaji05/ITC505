const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "../public"
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Route to serve index.html when accessing "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// POST route for Mad Lib submission
app.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, animal } = req.body;

  if (!noun || !verb || !adjective || !place || !animal) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
  }

  const story = `
    Once upon a time in ${place}, there lived a ${adjective} ${animal}.<br>
    Every day, it would ${verb} around and play with a ${noun}.<br>
    They lived happily ever after!
  `;

  res.send(`
    <h1>Your Mad Lib</h1>
    <p>${story}</p>
    <a href="/">Go Back to Form</a>
  `);
});

// Use the port provided by Render or default to 8080 locally
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
