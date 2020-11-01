const express=require('express');
const router=express.Router();
const {Admin} =require('../classes/home')

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});
    
router.post('/',(req,res)=>{
         let admin= new Admin(req.body.email,req.body.password);
         let flag=admin.login();
         console.log(flag);
         if(flag)res.render('admin/dashboard');
         else res.send('error');        
    });

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard');
})

router.get('/addItem',(req,res)=>{
    res.render('admin/item');
})
router.get('/menu',(req,res)=>{
    res.render('admin/menu');
})
router.get('/customer',(req,res)=>{
    res.render('admin/customers');
})


module.exports = router;