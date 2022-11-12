const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    gender:{
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    contact:{
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("users", User);
