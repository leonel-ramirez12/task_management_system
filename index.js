import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
dotenv.config()
import { Dbconnection } from './database/db.connection.js'
import emailsender from './modules/email/email.routes.js'
import userRouter from './modules/user/user.routes.js'
 import taskrouter from './modules/task/task.routes.js'

const app = express()
const port = 3004
app.use(cors())
app.use(express.json())
app.use('/auth', userRouter)
app.use('/tasks',taskrouter)
app.use('/email',emailsender)


Dbconnection()
app.listen(port, () => console.log(`server is running on port ${port}`))