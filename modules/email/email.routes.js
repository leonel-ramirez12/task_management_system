import { Router } from "express";
const router=Router()
import emailcontroller from './email.controller.js'

router.post('/sendEmail',emailcontroller)


export default router

