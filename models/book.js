const mongoose = require('mongoose'); 
const bookSchema = new mongoose.Schema({ title: String, description: String, price: Number, coverImage: String, author: { name: String, bio: String, image: String } });
module.exports = mongoose.model('Book', bookSchema);