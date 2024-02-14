const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date() }
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;