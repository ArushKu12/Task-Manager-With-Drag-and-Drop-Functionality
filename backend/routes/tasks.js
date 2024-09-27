import express from 'express'
import { PrismaClient } from '@prisma/client';
import { z } from 'zod'; 
import { ErrorResponse,SuccessResponse } from '../utils/responses.js';

const Prisma = new PrismaClient();
const router = express.Router();

const taskSchema = z.object({
    title: z.string(),
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
    const {task} = req.body;

        if(!taskSchema.safeParse(task)){
            return ErrorResponse(res,402,"Input Format Incorrect")
        }
    try {
        

        const newtask = await Prisma.task.create({
            data:{
                title:task.title,
                status:task.status
            }
        });

        return SuccessResponse(res,200,"Successfully Stored in Database",newtask)
    } catch (error) {
        console.log(error)
        return ErrorResponse(res,403)
    }
})

router.put("/:id",async(req,res) => {
    const {id,status} = req.body;

    const newTask = await Prisma.task.update({
        where:{
            id:id
        },
        data:{
            status:status
        }
    })

    SuccessResponse(res,200,"Task Updated Successfully");
})

export default router;