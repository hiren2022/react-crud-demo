const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String
    },
    hashTags:{
      type:Array
    },
    title:{
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdTime:{
        type: Date,
        required: true,
    },
    updatedTime:{
        type: Date,
        required: true,
    },
    likes: {
        type: Array
    },
    comments:{
        type: Array
    },
});

module.exports = mongoose.model("posts", Post);
