import { Dbconnection } from "../../database/db.connection.js";
const db = Dbconnection();
import { asynchandler } from "../../utils/response/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";

export const addtask = asynchandler(async (req, res, next) => {
    const { title, description, user_id } = req.body;
    if (!title || !user_id) throw new Error("Title and user_id are required", { cause: 400 });
    const query = "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)";
    const result = await new Promise((resolve, reject) => {
        db.query(query, [title, description, user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
    successResponse({ res, message: "Task created successfully", data: { taskId: result.insertId } });
});

export const getAlltask = asynchandler(async (req, res, next) => {
    const query = "SELECT * FROM tasks";
    const rows = await new Promise((resolve, reject) => {
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
    successResponse({ res, data: { tasks: rows } });
});

export const getSingletask = asynchandler(async (req, res, next) => {
    const {id}=req.params;
    const query= "SELECT * FROM tasks WHERE id = ?";
    const rows=await new Promise((resolve, reject) => {
        db.query(query,[id],(err, rows)=>{
            if (err) return reject(err);
            resolve(rows);
        });
    });
    if(rows.length===0) throw new Error("Task not found",{cause:404});
    successResponse({res,data:{task:rows[0]}});
});

export const updatetask=asynchandler(async (req, res, next) => {
    const {id}=req.params;
    const{title,description}=req.body;
    const query="UPDATE tasks SET title = ?, description = ? WHERE id = ?";
    const result=await new Promise((resolve, reject) => {
        db.query(query,[title,description,id],(err,result)=>{
            if (err) return reject(err);
            resolve(result);
        });
    });
    if (result.affectedRows === 0) throw new Error("Task not found",{cause:404});
    successResponse({ res, message: "Task updated successfully" });
});

export const deletetask = asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const query = "DELETE FROM tasks WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
    if (result.affectedRows === 0) throw new Error("Task not found", { cause: 404 });
    successResponse({ res, message: "Task deleted successfully" });
});
