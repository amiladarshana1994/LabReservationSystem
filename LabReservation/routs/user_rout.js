const express = require('express');
const router  = express.Router();
const user_model_schema = require('../models/user_schema');
const jwt     = require ('jsonwebtoken');
const config  = require ('../config/database');
const passport = require('passport'); 

router.post("/register", function(req,res){
    //res.send("Register Page");
    //console.log(req.body); 
    const new_user =new user_model_schema({
        username : req.body.username,
        name     : req.body.name,
        email    : req.body.email,
        password : req.body.password 
    });
    //console.log('new_uer'+new_user);
    //call save user method in user_model_schema (user_schema object)
     user_model_schema.saveUser(new_user,function(err,user){
        if(err){
            res.json({state : false , msg : "data not inserted"});
        }
        else{
            res.json({state : true , msg : "data inserted"});
        }
    }); 

}); 

router.post("/login", function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    user_model_schema.findUserByEmail(email,function(err,user){
        if (err) throw err;

        if (!user){
            //console.log(user);
            res.json({state : false , msg : "User not found"});
            return false ;
        }

        user_model_schema.checkPassword(password,user.password, function(err,match){
            if(err) throw err;

            if(!match){
                res.json({state : false , msg : "Password didn't Matched"});
                return false ;
            }

            else{
                //console.log('matched')
                //create token that contain user,secret key, and expire time in seconds
                const payload = ({_id : user.id , name : user.name});
                const token = jwt.sign(payload,config.secret,{expiresIn : 86400});
                res.json(
                    {
                        state : true ,
                        token : 'bearer '+ token,
                        user  : {
                            id       : user._id ,
                            name     : user.name,
                            username : user.username,
                            email    : user.email                        
                        }
                    }
                )
            };
        });

    });
}) ;

router.get('/profile', passport.authenticate('jwt', { session: false }),function(req, res) {
    res.json({user : req.user});
    //res.send(req.user.body);
}
);



module.exports = router ;