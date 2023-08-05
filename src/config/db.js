const mongoose = require ("mongoose");
const connectDB =async()=>{
    try{
        console.log(process.env.CONNECTION_STRING)
        const uri = 'mongodb+srv://Helpmetutors:GLqz0Fk0MlUzKFWm@cluster0.y1d0lyr.mongodb.net/theindianspellingbeedb?retryWrites=true&w=majority';
        const connect = await mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
        console.log('DB connected successfully', connect.connection.host, connect.connection.name)
     }catch(err){
         console.error(err);
         process.exit(1);
     }
}


module.exports = connectDB;