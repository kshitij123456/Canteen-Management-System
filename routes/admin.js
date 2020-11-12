const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Menu=require('../models/Menu');
const {Admin} =require('../classes/home');
const {menu} =require('../classes/customerorder');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});
router.get('/dashboard',(req,res)=>{    
    User.find({}).then(customer=>{
        res.render('admin/dashboard',{customer:customer})});
})

router.post('/dashboard',(req,res)=>{
         let admin= new Admin(req.body.email,req.body.password);
         let flag=admin.login();
         if(flag){
            User.find({}).then(customer=>{
                res.render('admin/dashboard',{customer:customer})});
         }
         else res.send('error'); 


    });



router.get('/addItem',(req,res)=>{
    res.render('admin/item');
})
router.post('/addItem',(req,res)=>{
   let item=new menu(req.body.Name,req.body.price,req.body.category);
   item.addItem();
    res.render('admin/item');
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
                    res.render('admin/menu',{item:item,item1:item1,item2:item2,item3:item3}); 
                })
            })
        })
    }); 
       
    
})
router.post('/:id',(req,res)=>{
    Menu.findOne({_id:req.params.id})
    .then(item=>{
        item.remove()
        .then(rem=>
            res.redirect('admin/menu')
            )
    })
    
})
router.get('/customer',(req,res)=>{
    res.render('admin/customers');
})


module.exports = router;