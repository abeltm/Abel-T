const express = require('express');
const app = express();

// Set the view engine to use ejs
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => {
  res.render('home');
});

// About me route
app.get('/about', (req, res) => {
  res.render('about');
});

// Project page route
app.get('/projects', (req, res) => {
  res.render('projects');
});

// Service page route
app.get('/services', (req, res) => {
  res.render('services');
});

// Contact me page route
app.get('/contact', (req, res) => {
  res.render('contact');
});m

// Start the Express app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
