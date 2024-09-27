import express from 'express'
import dotenv from 'dotenv'
import taskRouter from "./routes/tasks.js"

dotenv.config()

const app = express();
app.use(express.json())

app.use('/api/v1/tasks/',taskRouter);


const PORT = process.env.PORT || 4000;






app.listen(PORT,() => {
    console.log("Server is listening on PORT "+PORT)
})