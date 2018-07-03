

const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const reservationSchema = new schema({
    regno  : { type: String, require: true },
    labname: { type: String, require: true },
    date   : { type: String, require: true },
    intime : { type: String, require: true },
    outtime: { type: String, require: true },
    reason : { type: String }
});

const Reservation = module.exports = mongoose.model("Reservation",reservationSchema) ;

module.exports.addReservation = function(newReservation,callback){
            //console.log(newReservation);
            Reservation.insertMany(newReservation,callback);

};

module.exports.findReservation = function(reservation,callback){
    //check that is input email is equal to the database email
    //console.log(reservation);
    
    const query = {labname : reservation.labname , date : reservation.date , intime : reservation.intime};
    
    Reservation.findOne(query,callback);
    
};

module.exports.getReservation = function(reservation,callback){
    //console.log('jj');
    const query = {labname : "A" ,labname : "B"  , labname :" C"};
    
    
    Reservation.find(callback,function(query,result){
       return callback;
        //console.log(result);
    });
    
        
   
    
}