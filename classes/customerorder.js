const Menu=require('../models/Menu');

class menu {
    constructor(name,price,category){
        this.name=name;
        this.price=price;
        this.category=category;
    }
    addItem(){
        const newItem = new Menu({
            Name:this.name,
            price:this.price,
            category:this.category
            
                });
        newItem.save();
    }
}

class order extends menu{
    constructor(){
        super();
    }
}

module.exports={menu,order}