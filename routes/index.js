const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

// Redirect root to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Process login POST
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user;
    res.redirect('/home');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

// Register page
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Process register POST
router.post('/register', async (req, res) => {
  const { username, password, fullname, email, phone } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.render('register', { error: 'Username already taken' });
  }
  const newUser = new User({ username, password, fullname, email, phone });
  await newUser.save();
  res.redirect('/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Home with search and category filters
router.get('/home', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const { search = '', category = 'All' } = req.query;
  let query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (category && category !== 'All') {
    if (category === 'New Arrivals') {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      query.releaseDate = { $gte: last30Days.toISOString() };
    } else if (category === 'Bestsellers') {
      query.salesCount = { $gte: 100 }; // example threshold
    } else {
      query.category = category;
    }
  }

  const books = await Book.find(query);
  res.render('home', { books, user: req.session.user, search, category });
});

// Genres page route (assumed implemented)
router.get('/genres', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const genres = await Book.distinct('category');
  res.render('genres', { genres, user: req.session.user });
});
// Route to list all authors for sidebar and navigation
router.get('/authors', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  // Aggregate distinct authors from books collection
  const authors = await Book.aggregate([
    { $group: { _id: "$author._id", name: { $first: "$author.name" }, image: { $first: "$author.image" }, bio: { $first: "$author.bio" } } }
  ]);

  res.render('authorsList', { authors, user: req.session.user });
});

// Profile route showing logged-in user's info
router.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('profile', { user: req.session.user });
});

// Book details
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.render('book', { book });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Author details
router.get('/authors/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || !book.author) return res.status(404).send('Author not found');
    res.render('author', { author: book.author });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add to cart
router.post('/add-to-cart/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  if (!req.session.cart) req.session.cart = [];
  const existingItem = req.session.cart.find(item => item._id.toString() === book._id.toString());
  if (existingItem) existingItem.quantity += 1;
  else req.session.cart.push({ ...book.toObject(), quantity: 1 });
  res.redirect('/cart');
});

// View cart
router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render('cart', { cart, total });
});

// Remove from cart
router.post('/remove-from-cart/:id', (req, res) => {
  const id = req.params.id;
  if (!req.session.cart) return res.redirect('/cart');
  req.session.cart = req.session.cart.filter(item => item._id.toString() !== id);
  res.redirect('/cart');
});

// Checkout clears cart
router.post('/checkout', (req, res) => {
  req.session.cart = [];
  res.render('cart', { cart: [], total: 0 });
});

module.exports = router;
