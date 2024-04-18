import express, {Express, Request, Response} from "express";
import {db} from './database';
import {serverStart} from "./config/startServer";
import setCors from "./middlewares/CORS";
import authRouter from './routes/authRoute'
import tasksRouter from './routes/tasksRoute'
import recordingRoute from "./routes/recordingRoute";
const app:Express=express()
app.use(express.json())
app.use(setCors)
app.use('/auth',authRouter)
app.use('/tasks',tasksRouter)
app.use('/refresh',recordingRoute)
app.get("/",(req:Request, res:Response)=>{
    res.send('hello')
})
serverStart(app, db)
