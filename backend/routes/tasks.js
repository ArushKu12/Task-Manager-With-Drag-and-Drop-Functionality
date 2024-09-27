import express from 'express'
import { PrismaClient } from '@prisma/client';
import { z } from 'zod'; 
import { ErrorResponse,SuccessResponse } from '../utils/responses';

const Prisma = new PrismaClient();
const router = express.Router();

const taskSchema = z.object({
    title: z.string().unique(),
    status:z.string()
})


router.get("/", async (req,res) => {
    try {
        const tasks = await Prisma.task.findMany();

        return SuccessResponse(res,200,"Responses Sent Successfully",tasks)
    } catch (error) {
        return ErrorResponse(res,403)
    }
})

router.post("/", async (req,res) => {
    try {
        const {task} = req.body;

        if(!taskSchema.safeParse(task)){
            return ErrorResponse(res,402,"Input Format Incorrect")
        }

        const newtask = await Prisma.task.create({
            data:{task}
        });

        return SuccessResponse(res,200,"Successfully Stored in Database",newtask)
    } catch (error) {
        return ErrorResponse(res,403)
    }
})


export default router;