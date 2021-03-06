const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);//en caso de error, se detiene la app
    }
}

module.exports = connect;