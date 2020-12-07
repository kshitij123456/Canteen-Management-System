const bcrypt = require('bcryptjs');
const User=require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
class home{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
}



class Registeration extends home{
    constructor(email,password,Name,address){
        super(email,password);
        this.name=Name;
        this.address=address;
 }
  register(){
      
      const newUser = new User({
        Name:this.name,        
        email: this.email,
        password: this.password,
        address:this.address,
    
    });

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            newUser.password = hash;
            newUser.save();     
            
        });
    });
  }
  
}

class loginCustomer extends home {
    constructor(email,passport){
        super(email,passport);
    }
    login(){
        passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=> {
            User.findOne({email:email}).then(user=>{
                if(!user) return done(null, false, {message: 'no user found'});
                bcrypt.compare(password, user.password, (err, matched)=>{
                    if (err) return err;
                    if (matched) {
                        return done(null, user);                
                    } else {
                        return done(null, false, {message:'password is incorrect'});
                        
                    }
                });
            });
        }));
        
        passport.serializeUser(function(user, done) {
            done(null, user.id);
            
          });
          
          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
}
}

class Admin extends home{
    constructor(email,password){
        super(email,password);
    }
    login(){
        if(this.email==="admin123@gmail.com" && this.password==="1234567")
        {
            return true

            
        }
        else{
            return false;
        }
        }
    }
module.exports={loginCustomer , Registeration, Admin}