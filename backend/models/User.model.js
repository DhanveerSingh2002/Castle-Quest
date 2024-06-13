const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"
    },
},{timestamps:true});

const User = new mongoose.model('User', userSchema);

module.exports = User;