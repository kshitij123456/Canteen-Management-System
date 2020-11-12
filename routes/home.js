const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const User=require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {loginCustomer,Registeration} =require('../classes/home');


 
router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/',(req,res)=>{
    res.render('home/main')
})


router.get('/register',(req,res)=>{
res.render('home/register')
})
router.post('/register',(req,res)=>{
   
    let customer=new Registeration(req.body.email,req.body.password,req.body.Name,req.body.address);
    customer.register();                   

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


