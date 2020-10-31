const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const User=require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const home =require('../classes/home');
const registerUser =require('../classes/home');

class loginCustomer extends home {
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

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});




router.get('/',(req,res)=>{
res.render('home/main')
})
router.post('/register',(req,res)=>{
   
    let newCustomer=new registerUser(req.body.email,req.body.password);
    newCustomer.getRegister();                   
        res.redirect('/customer_login');    


});

router.get('/customer_login',(req,res)=>{
res.render('home/customer_login')
});

router.post('/customer_login', (req, res, next)=>{
   
   let newLogin=new loginCustomer();
   newLogin.login();
   passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect: '/',
    //failureFlash: true
})(req, res, next);

});
router.get('/logout', (req, res)=>{

    req.logOut();
    res.redirect('/');
});
router.get('/admin',(req,res)=>{
    res.render('home/admin_login')
});



module.exports = router;


