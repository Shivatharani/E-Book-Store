const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/ebook-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('MongoDB Connection Error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
  secret: 'ebooksecret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/', routes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
