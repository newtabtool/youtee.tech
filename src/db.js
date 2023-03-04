import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);
async function main(){
    await mongoose.connect(`mongodb://admin:${process.env.DB_PASSWORD}@ac-yoht00p-shard-00-00.k76spm3.mongodb.net:27017,ac-yoht00p-shard-00-01.k76spm3.mongodb.net:27017,ac-yoht00p-shard-00-02.k76spm3.mongodb.net:27017/?ssl=true&replicaSet=atlas-a3ag63-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("conectado")
}

main().catch(err => console.error(err))
export default main;