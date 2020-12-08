const express=require('express');
const router=express.Router(); 
const passport = require('passport');
const User=require('../models/User');
const {loginCustomer,Customer,Admin,subcription} =require('../classes/home');


 
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
    let error="";
    if(req.body.password!=req.body.confirmpassword){
        error="Password does not match";
        res.render('home/register',{error:error});
    }
   else{
    let user=new Customer(req.body.email,req.body.password,req.body.Name,req.body.address,0);
    user.register();  
                 
    req.flash('success','Registered successfully');
        res.redirect('/customer_login'); 
   }
   


});

router.get('/customer_login',(req,res)=>{
res.render('home/customer_login')
});

router.post('/customer_login', (req, res, next)=>{
    
    const newLogin=new loginCustomer(req.body.email,req.body.password);
    newLogin.login();
   passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect: '/customer_login',
    failureFlash: true
})(req, res, next);

});
router.get('/logout', (req, res)=>{

    req.logOut();
    res.redirect('/');
});
router.get('/admin',(req,res)=>{
    res.render('home/admin_login')
});
router.post('/admin',(req,res)=>{
    let admin= new Admin(req.body.email,req.body.password);
    let flag=admin.login();
    if(flag){
       res.redirect('/admin/dashboard')
    }
    else {
        let error="Invalid credentials";
       res.render('home/admin_login',{error:error});
    }
})



module.exports = router;


