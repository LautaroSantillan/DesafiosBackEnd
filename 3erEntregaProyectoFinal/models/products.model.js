const { Schema } = require('mongoose');

const productsSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    title: {
        type: String, 
        required: true,
        trim: true
    },
    price: { 
        type: Number, 
        required: true,
        trim: true
    },
    thumbnail: {
        type: String, 
        required: true,
        trim: true
    },
    code: {
        type: String, 
        required: true,
        trim: true
    },
    stock: {
        type: Number, 
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    }
});

module.exports = productsSchema