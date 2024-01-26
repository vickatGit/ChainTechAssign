import Joi from "joi";

export const UserValidationSignupModel = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s).+$/)
    .message('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one numeric character, and one special character. Spaces are not allowed.')
    .required(),
    userName:Joi.string().required()
})