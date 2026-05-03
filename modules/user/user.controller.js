
import { Dbconnection } from '../../database/db.connection.js'
const connection=Dbconnection()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import joi from 'joi'
const signupvalidation=joi.object({
    name:joi.string().required()
})

export const signup=(req,res,next)=>{
connection.query('insert into user set ?',req.body)
res.status(201).json({message:"success"})
}

export const signin = (req, res, next) => {
    const{email,password}=req.body;
    connection.execute(
        'SELECT id, email, password FROM user WHERE email = ?',
        [email],
        (err, data) => {
            if (err) return res.status(500).json({ message: err.message });

            if (data&&data.length!==0) {
                const match= bcrypt.compareSync(password, data[0].password);
                if (match){
                    const token=jwt.sign(
                        { userId: data[0].id,email:data[0].email},
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN||'1d'}
                    );
                    res.json({ message:"login successful",token});
                } else {
                    return res.status(409).json({ message: "Password or email not correct" });
                }
            } else {
                return res.status(409).json({ message: "Account not found" });
            }
        }
    );
};