const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse form data (URL encoded form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
const publicPath = path.join(__dirname, 'public'); // Ensure "public" is correctly located
app.use(express.static(publicPath));

// Route to serve the index.html file when accessing "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// POST route to handle Mad Lib form submission
app.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, animal } = req.body;

  // If any field is missing, return an error message
  if (!noun || !verb || !adjective || !place || !animal) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
  }

  // Generate the Mad Lib story
  const story = `
    Once upon a time in ${place}, there lived a ${adjective} ${animal}.<br>
    Every day, it would ${verb} around and play with a ${noun}.<br>
    They lived happily ever after!
  `;

  // Send the generated story as the response
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
