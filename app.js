//Student name: Abel Teklemariam | Student number: 301224352
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Use the "views" directory to store views
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

// Define the routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', isAuthenticated, (req, res) => {
  res.render('about');
});

app.get('/projects', isAuthenticated, (req, res) => {
  res.render('projects');
});

app.get('/services', isAuthenticated, (req, res) => {
  res.render('services');
});

app.get('/contact', isAuthenticated, (req, res) => {
  res.render('contact');
});

app.post('/contact', isAuthenticated, (req, res) => {
  res.render('contact-success');
});

app.get('/login', (req, res) => {
  res.render('login', { error: false });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.render('login', { error: true });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/business-list', isAuthenticated, (req, res) => {
  const businesses = getBusinesses();
  res.render('business-list', { businesses });
});

app.get('/update/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const businesses = getBusinesses();
  const business = businesses.find(b => b.id === id);
  if (business) {
    res.render('update', { business });
  } else {
    res.redirect('/business-list');
  }
});

app.post('/update/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const businesses = getBusinesses();
  const index = businesses.findIndex(b => b.id === id);
  if (index !== -1) {
    businesses[index] = { id, name, description };
    saveBusinesses(businesses);
  }
  res.redirect('/business-list');
});

// Start the server on the port specified in the `PORT` environment variable, or on port 3000 if it is not set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Middleware function to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Helper functions
function getUsers() {
const data = fs.readFileSync('data/users.json');
return JSON.parse(data);
}

function getBusinesses() {
const data = fs.readFileSync('data/businesses.json');
return JSON.parse(data);
}

function saveBusinesses(businesses) {
const data = JSON.stringify(businesses, null, 2);
fs.writeFileSync('data/businesses.json', data);
}

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something went wrong!');
});