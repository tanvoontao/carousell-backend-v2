const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    images: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);