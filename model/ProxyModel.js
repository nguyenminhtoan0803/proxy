const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    proxy: {
        type: String,
        unique: true,
        index: true
    },

    port: {
        type: Number,
        default: 3128
    },

    type: {
        type: Number,
        default: 1
    },

    active: {
        type: Boolean,
        default: true,
        index: true
    },

    last_used: {
        type: Number,
        default: 0,
        index: true
    },

    used: {
        type: Number,
        default: 0,
        index: true
    },

    country: {
        type: String,
        default: 'US'
    }

});

module.exports = mongoose.model('ProxyList', schema);