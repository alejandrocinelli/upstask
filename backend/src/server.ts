import  express  from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import Projectrouter from "./routers/projectRoutes";

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// routes 
app.use('/api/projects', Projectrouter)

export default app 