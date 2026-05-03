import { Dbconnection } from "../database/db.connection.js"
import bcrypt from 'bcrypt'
const connection=Dbconnection()


export const emailExist=(req,res,next)=>{
    req.body.password=bcrypt.hashSync(req.body.password,8)
    connection.execute(`select email from user where email ='${req.body.email}'`,(err,data)=>{
    if(data.length!=0)
        return res.status(409).json({message:"email exist"})
        next()
    })
}