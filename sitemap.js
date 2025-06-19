const fs = require('fs');
const path = require('path');

function generateSitemap() {
  const domain = 'https://jobbox.one';
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
}

function writeSitemapToFile() {
  const sitemapContent = generateSitemap();
  const sitemapPath = path.join(__dirname, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  //console.log('✅ sitemap.xml generated successfully at:', sitemapPath);
}

// If running this file directly
if (require.main === module) {
  writeSitemapToFile();
}

// If used as a module
module.exports = {
  generateSitemap,
  writeSitemapToFile
};
