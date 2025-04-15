const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// Enable logging for development
app.use(logger('dev'));

// CORS setup (replace the origin URL with your GitHub Pages URL)
const corsOptions = {
  origin: "https://tharunjavaji05.github.io/ITC505/Lab-7/public/index.html",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to handle Mad Lib form submission
app.post('/madlib', (req, res) => {
  const { adjective, noun, verb, place, pluralnoun } = req.body;

  // Validate that all fields are filled
  if (!adjective || !noun || !verb || !place || !pluralnoun) {
    return res.send(`
      <h2>Submission Failed</h2>
      <p>Please fill out all fields!</p>
    `);
  }

  // Generate the Mad Lib story
  const madLib = `
    <h2>Here’s Your Story!</h2>
    <p>Once upon a time, in a <strong>${adjective}</strong> ${place}, there lived a ${noun} who loved to ${verb} with ${pluralnoun}.</p>
  `;

  // Send the generated story back as the response
  res.send(madLib);
});

// Route for testing server status
app.get("/", (req, res) => {
  res.send("Server is running and ready to receive requests!");
});

// Set the port and start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
