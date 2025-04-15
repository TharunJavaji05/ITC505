const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.post('/madlib', (req, res) => {
  const { adjective, noun, verb, place, pluralnoun } = req.body;

  if (!adjective || !noun || !verb || !place || !pluralnoun) {
    return res.send(`
      <h2>Submission Failed</h2>
      <p>Please fill out all fields!</p>
    `);
  }

  const madLib = `
    <h2>Here’s Your Story!</h2>
    <p>Once upon a time, in a <strong>${adjective}</strong> ${place}, there lived a ${noun} who loved to ${verb} with ${pluralnoun}.</p>
  `;

  res.send(madLib);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
