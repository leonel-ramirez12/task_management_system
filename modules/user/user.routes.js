import {Router}from 'express'
import * as auth from './user.controller.js'
import { emailExist } from '../../middleware/checkEmail.js'
import * as validators from './user.validation.js'
import { validation } from '../../middleware/validation.middleware.js'
const userRouter=Router()




userRouter.post('/signup',validation(validators.signup),emailExist,auth.signup)
userRouter.post('/signin',validation(validators.signin),auth.signin,)
export default userRouter