


const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// // Serve static files (HTML, CSS, JS)
// app.use(express.static(path.join(__dirname, 'dist')));

// // Basic route to check if the server is running
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html')); // Adjust this if your main HTML is different
// });

// Serve static files from the 'public' directory (adjust this as needed)
app.use(express.static(path.join(__dirname)));

// Serve your HTML files directly, if necessary
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Add more routes for other pages as needed
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Add more routes for other pages as needed
app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
  });
  // Add more routes for other pages as needed
app.get('/blog-grids', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog-grids.html'));
  });
    // Add more routes for other pages as needed
app.get('/blog-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog-details.html'));
  });

      // Add more routes for other pages as needed
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, '404.html'));
  });

app.listen(port, () => {
 // console.log(`Server is running at http://127.0.0.1:${port}`);
});