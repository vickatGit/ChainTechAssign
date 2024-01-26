import Joi from "joi";
import { TaskStatus } from "./TaskStatus";


export const taskStatusValidator = Joi.object({
    status:Joi.string()
    .valid(...Object.values(TaskStatus))
    .messages({
        'any.only': `Status should be one of: ${Object.values(TaskStatus).join(', ')}`,
    }).required(),
})