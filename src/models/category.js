const mongoose = require('../database');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;