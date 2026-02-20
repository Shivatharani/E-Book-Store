const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes/index');
const Book = require('./models/Book'); // Ensure your model path is correct

const app = express();

// === MongoDB Connection ===
mongoose.connect('mongodb://127.0.0.1:27017/ebook-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// === Middleware Setup ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// === Static Assets Path ===
app.use(express.static(path.join(__dirname, 'public')));

// === Session Middleware ===
app.use(session({
  secret: 'ebooksecret',
  resave: false,
  saveUninitialized: false
}));

// === EJS View Engine Setup ===
app.set('view engine', 'ejs');

// === Load Authors Middleware (for Sidebar) ===
app.use(async function (req, res, next) {
  try {
    // Fetch distinct author names directly and include at least one book ID for routing (avoids duplication or missing names)
    const authors = await Book.aggregate([
      { $match: { "author.name": { $exists: true, $ne: "" } } },
      { $group: { _id: "$author.name", bookId: { $first: "$author._id" } } },
      { $sort: { _id: 1 } }
    ]);
    res.locals.allAuthors = authors.map(a => ({ _id: a.bookId, name: a._id }));
  } catch (err) {
    console.error('⚠️ Error fetching authors:', err);
    res.locals.allAuthors = [];
  }
  next();
});

// === Authentication Routes (GET) ===
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// === Main Application Routes ===
app.use('/', routes);

// === Handle Undefined Routes ===
app.use((req, res) => {
  res.status(404).send('<h2 style="text-align:center;margin-top:50px;">404 - Page Not Found</h2>');
});

// === Start Express Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 SHIVA'S E BOOK STORE running at http://localhost:${PORT}`);
});
