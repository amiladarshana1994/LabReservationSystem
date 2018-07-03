const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const labSchema = new schema({
    labname : { type: String, required: true },
    location: { type: String, required: true },
    seat    : { type: Number, required: true },
    type    : { type: String, required: true },
    details : { type: String, required: true },
});

const Lab = module.exports = mongoose.model("Lab",labSchema) ;

module.exports.saveLab = function(lab,callback){
    //console.log(lab);
    Lab.insertMany(lab,callback);
}

module.exports.findLab = function(lab,callback){
    //console.log(lab);
    const query = {labname : lab.labname};
    Lab.findOne(query,callback);
}
module.exports.getLab = function(lab,callback){
    //console.log(lab);
    const query = {labname : lab.labname};
    Lab.find({},callback);
}