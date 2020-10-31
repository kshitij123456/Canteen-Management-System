const express=require('express');
const router=express.Router();


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
    
    res.render('customer/menu')
    
})
router.get('/userOrder',(req,res)=>{
    
    res.render('customer/order')
    
})



module.exports = router;