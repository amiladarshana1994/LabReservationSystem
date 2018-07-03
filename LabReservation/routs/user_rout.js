const express = require('express');
const router  = express.Router();
const user_model_schema = require('../models/user_schema');
const lab_model_schema = require('../models/lab_schema');
const reservation_model_schema = require('../models/reservation_schema'); 
const jwt     = require ('jsonwebtoken');
const config  = require ('../config/database');
const passport = require('passport'); 

router.post("/register", function(req,res){
    //res.send("Register Page");
    //console.log(req.body); 
    const new_user =new user_model_schema({
        username : req.body.username,
        name     : req.body.name,
        regno    : req.body.regno,
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
                //console.log(match);
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
                            regno    : user.regno,
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

router.post("/reservation",passport.authenticate('jwt', { session: false }), function(req,res){

    /* const labname = req.body.labname;
    const date = req.body.date;
    const intime = req.body.intime; */

    const new_reservation =new reservation_model_schema({
        regno   : req.body.regno,
        labname : req.body.labname,
        date    : req.body.date,
        intime  : req.body.intime,
        outtime : req.body.outtime,
        reason  : req.body.reason, 
    });
    //console.log(req);
    reservation_model_schema.findReservation(new_reservation,function(err,reservation){
        if(err) throw err ;
        //console.log(reservation);
        if (reservation){
            
            res.json({state : false , msg : "There is Reservation.Please Choose Available Lab"});
                return false ;
        }
        else{
            reservation_model_schema.addReservation(new_reservation,function(err,reservation){
                if(err){
                    res.json({state : false , msg : "Resevation not Complete.."});
                }
                else{
                    res.json({state : true , msg : "Reservation Complete.."});
                }
            });
        }
    }); 
});

router.get('/viewreservation',passport.authenticate('jwt', { session: false }),function(req, res) {
    console.log(req);
    reservation_model_schema.getReservation({},function(err,reservations){
        //console.log(reservations);
        if(err){
            res.json({state : false , msg : "Something went Wrong.. Please Try Again.."});
        }
        else{
            res.json(reservations);
            //console.log(reservation);
        //res.send(req.user.body);
        }
          
    });
}
);

router.post("/registerlab", passport.authenticate('jwt', { session: false }),function(req,res){
    //res.send("Register Page");
    //console.log(req.body); 
    const new_lab =new lab_model_schema({
        labname : req.body.labname,
        location: req.body.location,
        seat    : req.body.seat,
        type    : req.body.type,
        details : req.body.details 
    });
    //console.log(new_lab);
     lab_model_schema.findLab(new_lab,function(err,lab){
         //console.log(lab);
        if(err) throw err;
        if(lab){
            res.json({state : false , msg : "There is a Lab .Please Check Details and Add again"});
                return false ;
        }
        else{
            lab_model_schema.saveLab(new_lab,function(err,lab){
                console.log(err);
                if (err){
                    console.log(err);
                    res.json({state : false , msg : "Please Fill All the Details"});
                }
                else{
                    res.json({state : true , msg : "Lab Details Inserted"});
                }
            });            
        }
    }); 

}); 
router.get('/viewlab',passport.authenticate('jwt', { session: false }),function(req, res) {
    //console.log(req);
    lab_model_schema.getLab({},function(err,labs){
        //console.log(labs);
        if(err){
            res.json({state : false , msg : "Something went Wrong.. Please Try Again.."});
        }
        else{
            res.json(labs);
            //console.log(reservation);
        //res.send(req.user.body);
        }
          
    });
}
);

module.exports = router; 