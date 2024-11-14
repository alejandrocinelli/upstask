import mongoose from "mongoose";
import  color  from "colors";

export const connectDB = async () => {

    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(color.cyan.bold("Mongo Conectado a " +url))
    } catch (error) {
        console.log(error.message)
        console.log("Error al conectar a MongoDb")
        process.exit(1)
    }
}