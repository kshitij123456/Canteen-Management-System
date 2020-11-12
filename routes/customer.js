const express=require('express');
const router=express.Router();
const Menu=require('../models/Menu');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'customer';
    next();
});



router.get('/',(req,res)=>{
    
    res.render('customer/dashboard')
    
})
router.get('/dashboard',(req,res)=>{
    
    res.render('customer/dashboard')
    
})
router.get('/menu',(req,res)=>{
    
    const menu=Menu.find({})
    .then(item=>res.render('admin/menu',{item:item}));
    
    
})
router.get('/userOrder',(req,res)=>{
    
    res.render('customer/order')
    
})



module.exports = router;