const bcrypt = require('bcryptjs');
const User=require('../models/User');
const Order=require('../models/Order');
const passport = require('passport');
const moment = require('moment');
const LocalStrategy = require('passport-local').Strategy;

class home{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
}



class Customer extends home{
    constructor(email,password,Name,address,wallet){
        super(email,password);
        this.name=Name;
        this.address=address;
        this.wallet=wallet;
        this.date=Date.now();
 }
  register(){
      
      const newUser = new User({
        Name:this.name,        
        email: this.email,
        password: this.password,
        address:this.address,
        balance:this.wallet,
        date:this.date
    });

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            newUser.password = hash;
            newUser.save(); 
            const less=new subcription(newUser.id,"Less Priority");
            less.nonpermium();     
            
        });
    });
  }
  async updateWallet(id,amount){
      let f=true;
      this.wallet=amount;
      await User.findOneAndUpdate({_id:id},{$inc:{'balance':amount}})
       
     
       
  
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

class subcription{
    constructor(id,category){
        this.id=id;
        this.category=category;
        this.date=Date.now();
    }
    async nonpermium(){
        const newCustomer = new Order({
            user:this.id,
            category:this.category
        })
        await newCustomer.save();
    }
    async premium(){
        const user=await Order.findOne({user:this.id});
        user.category=this.category;
        user.date=this.date;
        await user.save();
    }
    async expirydate(){
        const user=await Order.findById(this.id);
        const d=user.date.getDate();
        const m=user.date.getMonth()+3;
        const y=user.date.getFullYear();
        const ed=new Date(
                y,m,d
            )
        return moment(ed).format('DD/MM/YYYY') ;    
    }
    async cancel(){
        const user=await Order.findById(this.id);
   
     const today= moment(Date.now()).format('DD/MM/YYYY')   
     const expd=await this.expirydate();  
          
     if(today==expd){
        user.category="Less Priority"
    await user.save();
    return true;
    }
    else{
        return false;
    }
}
}

module.exports={loginCustomer , Customer, Admin,subcription}