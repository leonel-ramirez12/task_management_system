import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


export const Dbconnection=()=>{
const conn=mysql.createConnection({
   host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
 conn.connect((err) => {
    if (err) {
      console.error('Database connection error:', err.message)
      return
    }
    console.log('Database connected successfully')
  })

  return conn
}