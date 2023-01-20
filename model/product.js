const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);