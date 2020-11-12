const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
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
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
    
});

module.exports =mongoose.model('user',UserSchema);