const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const exphb=require('express-handlebars');
const home=require('./routes/home');
const bodyParser=require('body-parser');
const passport=require('passport');
const upload=require('express-fileupload');
const session=require('express-session');
const flash=require('connect-flash');
const app=express();

app.use(express.static(path.join(__dirname,'public')));

app.use(upload());



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret:'cms',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})


const {iftop,ifless,ifpre,formatDate,today,isEmptytop,isEmptyless,isEmptypre,ifsub:ifsub, expiryDate: expiryDate,startDate:startDate,ifreceived:ifreceived}=require('./helpers/handlebars-helper');
app.engine('handlebars',exphb({defaultLayout:'home',helpers:{iftop:iftop,
                                                            ifless:ifless,
                                                            ifpre:ifpre,
                                                            formatDate:formatDate,
                                                            today:today,
                                                            ifreceived:ifreceived,
                                                            isEmptytop:isEmptytop,
                                                            isEmptyless:isEmptyless,
                                                            isEmptypre:isEmptypre,
                                                            ifsub:ifsub,
                                                            expiryDate: expiryDate,
                                                          startDate:  startDate
                                                        },
                               runtimeOptions: {        
                                                    allowProtoPropertiesByDefault: true,
                                                    allowProtoMethodsByDefault: true,
                                                }}));
app.set('view engine','handlebars');

 
app.use(passport.initialize());
app.use(passport.session());




app.use((req,res,next)=>{
    res.locals.user = req.user || null ;
    next();
})

app.use('/',home);
app.use('/admin',require('./routes/admin'));
app.use('/user',require('./routes/customer'));

mongoose.connect("mongodb+srv://CMS:cmsoops@cms.dujeq.mongodb.net/<dbname>?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
},
()=>console.log('db connected'));



const port=process.env.PORT || 4343;

app.listen(port, ()=>console.log(`The server has started at ${port}`));