const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    menu:{
        type:Schema.Types.ObjectId,
        ref:'menu'
    },
    category:{
        type:String,
        required:true
    }, 
    
    
});

module.exports =mongoose.model('menu',menuSchema);