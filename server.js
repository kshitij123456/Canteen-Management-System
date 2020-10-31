const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const exphb=require('express-handlebars');
const home=require('./routes/home');
const bodyParser=require('body-parser');
const passport=require('passport');
const app=express();

app.use(express.static(path.join(__dirname,'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('handlebars',exphb({defaultLayout:'home'}));
app.set('view engine','handlebars');

app.use(passport.initialize());
app.use(passport.session());

app.use('/',home);
app.use('/admin',require('./routes/admin'));
app.use('/user',require('./routes/customer'));

mongoose.connect("mongodb+srv://CMS:cmsoops@cms.dujeq.mongodb.net/<dbname>?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
},
()=>console.log('db connected'));



const port=process.env.PORT || 4343;

app.listen(port, ()=>console.log(`The server has started at ${port}`));