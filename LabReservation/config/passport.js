const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./database');
const User = require ('../models/user_schema');

const opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.secretOrKey = config.secret;

module.exports = function(passport){
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //call fibdUserById method in User that is user_schema object.
        //check there is a user that matched
        User.findUserById({_id: jwt_payload._id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
                //done(null, user);
            } 
            else {
                return done(null, false);
                //done(null, false);
                
            }
        });
    }));
};
