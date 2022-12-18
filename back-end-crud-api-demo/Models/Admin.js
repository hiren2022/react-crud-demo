const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_name:{
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password:{
      type:String,
      required: true,
    },
    birth_date:{
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("admins", Admin);
