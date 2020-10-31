const bcrypt = require('bcryptjs');
const User=require('../models/User');

class home{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
}



 class registerUser extends home{
    constructor(email,password){
        super(email,password);
 }
 getRegister(){
    
    const newUser = new User({        
        email: this.email,
        password: this.password
    });

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            newUser.password = hash;
            newUser.save();     
            
        });
    });
}
}



class Admin extends home{
    constructor(email,password){
        super(email,password);
    }
    login(){
        if(this.email==="mohit123@gmail.com" && this.password==="1234567")
        {
            return true

            
        }
        else{
            return false;
        }
        }
    }
module.exports=home;
module.exports=registerUser;
module.exports=Admin;