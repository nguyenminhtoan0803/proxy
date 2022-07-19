const ProxyDao = require("../db/ProxyDAO");
const mongoose = require("mongoose");

const dao = new ProxyDao();
dao.connectionDB(mongoose);

const ProxyList = mongoose.model("proxylists", {
    proxy: {
        type: String,
        unique: true,
        index: true,
    },

    port: {
        type: Number,
        default: 3128,
    },

    type: {
        type: Number,
        default: 1,
    },

    active: {
        type: Boolean,
        default: true,
        index: true,
    },

    lastused: {
        type: Number,
        default: 0,
        index: true,
    },

    used: {
        type: Number,
        default: 0,
        index: true,
    },

    country: {
        type: String,
        default: "US",
    },
});

module.exports = ProxyList;
