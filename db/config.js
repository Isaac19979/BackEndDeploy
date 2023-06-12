const mongoose= require("mongoose");


const dbConnection = async() =>{

    try{
        mongoose.set('strictQuery', false);

        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME,
            
        });

        console.log('Db online');


    }catch(error){
        console.log(error);
        throw new Error('El error a la hora de inicializar DB');
    }

}

module.exports ={
    dbConnection
}



