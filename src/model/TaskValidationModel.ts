import Joi from "joi";
import { TaskStatus } from "./TaskStatus";
import { CategoryTypes } from "./CategoryTypes";

export const taskValidator = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .messages({
      "any.only": `Status should be one of: ${Object.values(TaskStatus).join(
        ", "
      )}`,
    })
    .required(),
  dueDate: Joi.date()
    .greater("now")
    .message("dueDate should be greater than current date")
    .optional(),
  category: Joi.string()
    .valid(...Object.values(CategoryTypes))
    .messages({
      "any.only": `Status should be one of: ${Object.values(CategoryTypes).join(
        ", "
      )}`,
    })
    .optional(),
});
