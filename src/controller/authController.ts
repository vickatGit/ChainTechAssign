import { bool } from 'joi'
import {login,signup} from '../service/AuthService'
import {Request,Response,NextFunction} from 'express'
import { UserValidationLoginModel } from '../model/UserValidationLoginModel'
import { UserValidationSignupModel } from '../model/userValidationSignupModel'

export const loginController =async (req:Request,res:Response,next:NextFunction) => {

    const {error} = UserValidationLoginModel.validate(req.body,{abortEarly:false})
    if(error) return res.status(400).send({ errors:error})

    try {
        const data = await login(req.body.email,req.body.password,res)
        res.status(200).send({ data:data })
    }catch (error:any) { 
        res.status(404).send({
            error:error.message
        })
     }
}

export const signupController =async (req:Request,res:Response,next:NextFunction) => {
    const {error} = UserValidationSignupModel.validate(req.body,{abortEarly:false})
    if(error) return res.status(400).send({ errors:error })

    try {
        const data = await signup(req.body.userName,req.body.email,req.body.password,res)
        res.status(200).send({ data:data })
    } catch (error:any) { 
        res.status(404).send({
            error:error.message
        })
     }
}