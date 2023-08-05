const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    name:{type:String, required:['Name is required']},
    age : {type:Number, required:['Age is required']},
    email:{type:String, required:['Email is required']},
    contact:{type:Number, required:['Contact is required']},
    standard:{type:String,required:['Class is required']},
    school:{type:String, required:['School is required']},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('student', studentSchema)