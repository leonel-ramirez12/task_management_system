import express from "express";
import * as tasks from './task.controller.js'

const taskRouter = express.Router();
taskRouter.post("/addtask",tasks.addtask);
taskRouter.get("/getAlltask",tasks.getAlltask);
taskRouter.get("/getSingletask/:id",tasks.getSingletask);
taskRouter.put("/updatetask/:id",tasks.updatetask);
taskRouter.delete("/deletetask/:id",tasks.deletetask);

export default taskRouter;  