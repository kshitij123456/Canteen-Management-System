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
    
    const item=Menu.find({category:'Breakfast'})
    .then(item=>{
        Menu.find({category:'Lunch'})
        .then(item1=>{
            Menu.find({category:'Dinner'})
            .then(item2=>{
                Menu.find({category:'Desert'})
                .then(item3=>{
                    res.render('customer/menu',{item:item,item1:item1,item2:item2,item3:item3}); 
                    
                })
            })
        })
    }); 
    
    
})
router.get('/userOrder',(req,res)=>{
    
    res.render('customer/order')
    
})



module.exports = router;