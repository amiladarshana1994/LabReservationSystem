const express = require('express');
 
//to access files in directories
const path = require('path');
const mongoose = require ('mongoose');

//to handle json request in urr
const bodyparser = require('body-parser');

//middleware for authentication
const passport = require('passport');

//for connect frontend req and backend port:3000 and port:4200
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000 ;
app.use(cors());

app.use(bodyparser.urlencoded({ extended : false}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport') (passport);


//requre database file that contain database configuration
const config = require ('./config/database');

//require user_routes file in routs folder
const user = require('./routs/user_rout');

//connect to database
const connection = mongoose.connect(config.database);
//check connection succes or not
    if(connection){
        console.log('database connection successful');
    }
    else{
        console.log('database connection unsuccessful')
    }

//join app.js and public folder that contain static files (html/css) of the system
app.use(express.static(path.join(__dirname,'public')))

//if localhost:3000/user url request come,then access user
app.use ('/user',user);

app.get("/", function(req,res){
    res.send("Hello World");
}) 

app.listen (port,function(){
    console.log('listning to port '+ port);
})