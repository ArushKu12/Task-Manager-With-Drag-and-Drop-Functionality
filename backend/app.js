import express from 'express'
import dotenv from 'dotenv'
import taskRouter from "./routes/tasks.js"
import { ErrorResponse } from './utils/responses.js';
import cors from 'cors'

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,
}));

app.use('/api/v1/',taskRouter);


const PORT = process.env.PORT || 4000;


app.use("/*",(err,req,res,next) => {
   return ErrorResponse(res,404,"Page Not Found")
})


app.listen(PORT,() => {
    console.log("Server is listening on PORT "+PORT)
})