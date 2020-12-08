const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Menu=require('../models/Menu');
const {Admin, subcription} =require('../classes/home');
const {menu} =require('../classes/customerorder');
const Order=require('../models/Order');
const moment = require('moment');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});
router.get('/dashboard',async(req,res)=>{
    
    const customer=await User.find({});
    res.render('admin/dashboard',{customer:customer});
    
})

router.post('/dashboard',(req,res)=>{
        


    });
router.post('/dashboard/:id',async(req,res)=>{
    
    const user=await User.findOne({_id:req.params.id})
    const order=await Order.findOne({user:req.params.id})
    if(order){
        await order.remove();
    }
    
    await user.remove();                 
     res.redirect('/admin/dashboard');
                        
                    
})
router.get('/order/:id',async(req,res)=>{
    
    const order=await Order.findOne({user:req.params.id});   
    res.render('admin/order',{order:order});
   
     
})
router.get('/orders',async(req,res)=>{
    const order=await Order.find({})
    .populate('user', ['Name'])   
        res.render('admin/orders',{order:order});
    
});

router.post('/orders/:userid',async(req,res)=>{
    const user=await Order.findOne({user:req.params.userid});
    user.item.forEach(item=>{
        const d=moment(item.date).format('DD/MM/YYYY');
        const td=moment(Date.now()).format('DD/MM/YYYY');
        if(d==td){
            item.status="received";
        }
    });
    await user.save();
    res.redirect('/admin/orders');
     
})

 

router.get('/premium',async(req,res)=>{
    const order=await Order.find({}).populate('user', ['Name','address','email']);
    const pre=[]
    order.forEach(user=>{
        if(user.category=='Top Priority'){pre.push(user)
        }
    }
        );
     
    res.render('admin/pre',{user:pre});
})
router.post('/premium/:id',async(req,res)=>{
     const cancelSub=new subcription(req.params.id,"Top Priority")
      const sub=await cancelSub.cancel();
     if(sub){
    req.flash('success','subscription cancelled successfully');
    res.redirect('/admin/premium'); 
     } 
     else{
         const expd=await cancelSub.expirydate();
        req.flash('success',`Can't cancel subscription is valid till ${expd}`); 
        res.redirect('/admin/premium');
     }
     
})

router.get('/nonpremium',async(req,res)=>{
    const order=await Order.find({}).populate('user', ['Name','address','email','date']);;
    const nonpre=[]
     
        order.forEach(user=>{
            if(user.category=='Less Priority'){nonpre.push(user)
            }
        }
            );
         if(nonpre){
            res.render('admin/nonpre',{customer:nonpre});
         }    
         else{
            req.flash('success','No user are present in this category'); 
            res.render('admin/nonpre');
         }
        
    
    
    
}) 


router.get('/addItem',(req,res)=>{
    res.render('admin/item');
})
router.post('/addItem',(req,res)=>{

   let item=new menu(req.body.Name,req.body.price,req.body.category);
   item.addItem();
    res.render('admin/item');
})
router.get('/menu',async(req,res)=>{

    const item=await Menu.find({category:'Breakfast'});
    const item1=await Menu.find({category:'Lunch'});
    const item2=await Menu.find({category:'Dinner'});
    const item3=await Menu.find({category:'Desert'});
     
    res.render('admin/menu',{item:item,item1:item1,item2:item2,item3:item3}); 
                
       
    
})
router.post('/menu/:id',(req,res)=>{
    Menu.findOne({_id:req.params.id})    
    .then(item=>{
        item.remove()
        .then(rem=>
            res.redirect('/admin/menu')

            )
    })
    
})
router.get('/customer',(req,res)=>{
    res.render('admin/customers');
})


module.exports = router;