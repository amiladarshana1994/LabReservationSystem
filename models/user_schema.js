const mongoose = require('mongoose');
const bcrypt   = require ('bcryptjs');
const schema   = mongoose.Schema;

const userSchema = new schema({
    username : {type : String , required : true},
    name     : {type : String , required : true},
    regno    : {type : String , required : true},
    email    : {type : String , required : true},
    password : {type : String , required : true},

});

const User = module.exports = mongoose.model("User",userSchema) ;

//save data comming from url to database by saveUser function
//
module.exports.saveUser = function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){

        //encrypt password befor save
        bcrypt.hash(newUser.password, salt, function(err,hash){
            //console.log(hash);
            newUser.password = hash ;

            if (err){
                     throw err ;
                    //console.log(err);
            };
            //console.log(newUser);
            newUser.save(callback);

        });
    });

};

module.exports.findUserByEmail = function(email,callback){
    //check that is input email is equal to the database email
    const query = {email : email};
    User.findOne(query,callback);
};

module.exports.checkPassword = function(plainpassword,hash,callback){
    bcrypt.compare(plainpassword, hash, function(err, res) {
        //console.log(res);
        if (err) throw err ;
        callback(null,res);
    });
};

module.exports.findUserById = function(id,callback){
    User.findOne(id,callback);
}; 