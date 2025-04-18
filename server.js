const express = require('express');
const path = require('path');
const fs = require('fs'); // <-- Import filesystem module
const app = express();
const port = process.env.PORT || 3001;

// Serve static files (HTML, CSS, JS) from the root folder
app.use(express.static(path.join(__dirname)));

// Sitemap generation logic
const generateSitemap = () => {
  // const domain = 'http://localhost:3001';
  const domain = 'https://jobbox.one';
  // const appdomain = 'http://localhost:3000';
  const appdomain = 'https://app.jobbox.one';

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url><loc>${domain}/</loc></url>
   <url><loc>${domain}/about.html</loc></url>
   <url><loc>${domain}/companies.html</loc></url>
   <url><loc>${domain}/jobseekers.html</loc></url>
   <url><loc>${appdomain}/hr-signup</loc></url>
   <url><loc>${appdomain}/hr-sign-in</loc></url>
   <url><loc>${appdomain}/candidate-signup</loc></url>
   <url><loc>${appdomain}/signin</loc></url>
   <url><loc>${appdomain}/browse-jobs</loc></url>
   <url><loc>${appdomain}/jobbox-companies-sitemap.xml</loc></url>
   <url><loc>${appdomain}/jobbox-jobs-sitemap.xml</loc></url>
  </urlset>`;
};

// Write sitemap.xml file on server start
const sitemapContent = generateSitemap();
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);
console.log('sitemap.xml generated successfully.');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pricing.html'));
});
app.get('/blog-grids', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-grids.html'));
});
app.get('/blog-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog-details.html'));
});

// Serve the static sitemap file
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
