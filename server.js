const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'dist')));

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Adjust this if your main HTML is different
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
