const express=require('express');
const router=express.Router();
const Menu=require('../models/Menu');
const User = require('../models/User');
const Order=require('../models/Order');

const {orders}=require('../classes/customerorder');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'customer';
    next();
});



router.get('/',async(req,res)=>{
    const user=await User.findById(req.user.id);
    const order=await Order.findOne({user:req.user.id});
    if(order){
        res.render('customer/dashboard',{user:user });
    }
    else{
        const newCustomer = new Order({
            user:req.user.id,
            category:"Less Priority"
        })
        await newCustomer.save();
        res.render('customer/dashboard',{user:user });
    
    }
    
        
})
router.get('/dashboard',(req,res)=>{
    res.render('customer/dashboard');  
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
    
    
});
router.get('/subcription',async (req,res)=>{
    const user=await Order.findOne({user:req.user.id});
    if(user.category=="Top Priority"){
        req.flash('success','You already have permium subcription');

            res.redirect('/user/dashboard');
    }
    else{
        res.render('customer/subcription');
    }
   
})
router.post('/subcription',async(req,res)=>{
    const user=await Order.findOne({user:req.user.id});
    const customer=await User.findOne({_id:req.user.id});
    
        user.category="Top Priority";
        user.date=Date.now();
        await user.save();
        const sub ={
            category:"Top Priority",
            date:Date.now()
        }
        customer.subcription.unshift(sub);
        await customer.save();
        res.render('customer/dashboard');
    
    
   



    
       
    
    
})

 

router.post('/menu/:id',async(req,res)=>{
    const item=await Menu.findById(req.params.id);
    const user=await User.findOne({_id:req.user.id});
    const customer=await Order.findOne({user:req.user.id});
    if(user.balance>=item.price){
       
        await User.findOneAndUpdate({_id:req.user.id},{$inc:{'balance': -item.price}});
        if(customer){
            if(customer.category=="Top Priority"){
                const order=new orders(item.Name,item.price,"top",req.body.quantity);
                customer.item.unshift(order.neworder());
            }
            else{
                const order=new orders(item.Name,item.price,"less",req.body.quantity);
                customer.item.unshift(order.neworder());
            }
            await customer.save();
            req.flash('success','Order placed successfully and money has been deducted from wallet');

            res.redirect('/user/menu');
        }
        else{
            const newCustomer = new Order({
                user:req.user.id,
                category:"Less Priority"
            })
            await newCustomer.save();
            const order=await Order.findOne({user:req.user.id});
            const norder=new orders(item.Name,item.price,"less",req.body.quantity);
                order.item.unshift(norder.neworder());
                await order.save();
                req.flash('success','Order placed successfully and money has been deducted from wallet');
                res.redirect('/user/menu');
        }
    }
    else{
    
        req.flash('success','Order cannot placed due to insufficent balance');
                res.redirect('/user/menu');        
    }
             
   }
    );
    
    


router.post('/orders/:id',async(req,res)=>{
    const order=await Order.findOne({user:req.user.id});

    const Item=order.item.find(item=>item.id==req.params.id); 
    await User.findOneAndUpdate({_id:req.user.id},{$inc:{'balance': Item.price}});
    const it=order.item=order.item.filter(
        ({id})=>id!=req.params.id
    );
    order.save();
    res.redirect('/user/orders');
})



router.get('/orders',async(req,res)=>{
    const order=await Order.findOne({user:req.user.id});
  if(order){
    let top=0;
    let less=0;
    let pre=0;
    order.item.forEach(item=>{
        if(item.category=="top"){
            top++;
        }
        else if(item.category=="less"){
            less++;
        }
        else{
            pre++;
        }
    })
   
            res.render('customer/orderhistory',{order:order,top:top,less:less,pre:pre});
        
  }
  else{
    req.flash('success','You have not placed any order yet');
    res.redirect('/user/menu');    
  }
    
     
    
    
})

router.get('/preorder',async(req,res)=>{
    const user=await Order.findOne({user:req.user.id});
    if(user){
        const item=await Menu.find({category:'Breakfast'});
        const item1=await Menu.find({category:'Lunch'});
        const item2=await Menu.find({category:'Dinner'});
        const item3=await Menu.find({category:'Desert'});
        res.render('customer/preorder',{item:item,item1:item1,item2:item2,item3:item3});
    }
    else{
        const error="You cant access this feature as you do not have premium subcription"
        res.render('customer/subcription',{error:error});
    }
     
    
});
router.post('/preorder/:id',async(req,res)=>{
    const item=await Menu.findById(req.params.id);
    const user=await User.findOne({_id:req.user.id});
    const customer=await Order.findOne({user:req.user.id});
    if(user.balance>=item.price){
        await User.findOneAndUpdate({_id:req.user.id},{$inc:{'balance': -item.price}});
        const order=new orders(item.Name,item.price,"pre",req.body.quantity);
        customer.item.unshift(order.newpreorder(req.body.time));
        await customer.save();
        req.flash('success','Order placed successfully and money has been deducted from wallet');
        res.redirect('/user/preorder');

    }
    else{
        req.flash('success','Order cannot placed due to insufficent balance');
                res.redirect('/user/menu');
    }

})





router.get('/wallet',(req,res)=>{
    User.findOne({_id:req.user.id})
    .then(user=>{
        
        res.render('customer/wallet',{balance:user.balance});
    })   
    
    
});

router.post('/wallet',(req,res)=>{
    User.findOneAndUpdate({_id:req.user.id},{$inc:{'balance':req.body.amount}})
    .then(user=>{
        req.flash('success',`Rs ${req.body.amount} added to your wallet`);
       res.redirect('/user/wallet');
        }) 
})



module.exports = router;