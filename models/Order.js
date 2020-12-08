const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    item:[{
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
          
        quantity:{
            type:String,
            
        },
        category:{
            type:String,            
        },
        status:{
            type:String
        },
        date:{
            type:Date,
        },
        time:{
            type:String
        }

      

    }],
    category:{
        type:String,
        
    }, 
    date:{
        type:Date,
    }
    
    
});

module.exports =mongoose.model('order',menuSchema);