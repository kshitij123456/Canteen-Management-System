const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    Name:{
        type:String,
        
        required:true
    },
    price:{
        type:String,

        required:true,
         
    },
    file: {
        type: String
    },
    category:{
        type:String,
        required:true
    }, 
    
    
});

module.exports =mongoose.model('menu',menuSchema);