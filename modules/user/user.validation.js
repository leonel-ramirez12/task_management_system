import { generalField } from "../../middleware/validation.middleware.js";
import joi from 'joi'
export const signup=joi.object().keys({
name:generalField.name.required(),
email:generalField.email.required(),
password:generalField.password.required()
}
).required()

export const signin =joi.object().keys({
email:generalField.email.required(),
password:generalField.password.required()
}).required()