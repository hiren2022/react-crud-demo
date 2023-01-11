const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    commentReplies:{
        type:Array,
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
        type: Array,
    },
    comments:{
        type: Array,
    },
},{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        },
    }
});

module.exports = mongoose.model("comments", Comment);
