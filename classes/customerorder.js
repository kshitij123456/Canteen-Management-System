const Menu=require('../models/Menu');

class menu {
    constructor(name,price,category){
        this.name=name;
        this.price=price;
        this.category=category;
        //this.file=filename;
        
    }
    addItem(){
        const newItem = new Menu({
            Name:this.name,
            price:this.price,
            category:this.category,
            file:this.filename
            
        });
        newItem.save();
        
    }
}

class orders extends menu{
    constructor(name,price,category,quantity){
        super(name,price,category);
        this.quantity=quantity;
        this.date=Date.now();
    }
    neworder(){
        const newOrder={
            Name:this.name,
            price:this.price,
            quantity:this.quantity, 
            category:this.category,
            date:this.date
        }
        return newOrder;
    }
    newpreorder(time){
        const newpreOrder={
            Name:this.name,
            price:this.price,
            quantity:this.quantity, 
            category:this.category,
            date:this.date,
            time:time
        }
        return newpreOrder;
    }
}

module.exports={menu,orders}