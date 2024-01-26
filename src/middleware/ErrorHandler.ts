// import { Request,Response,NextFunction } from "express";
// import {CustomeError} from '../model/ErrorType'
// export const ErrorHandler =async (error:Error,req:Request,res:Response,next:NextFunction) => {
//     console.error("error Handler ",error.stack)

//     if(error instanceof CustomeError){
//         const errCode = error.statusCode || 500
//         const errStatus = error.status || false
//         res.status(errCode).send({
//             code:errCode,
//             status:errStatus,
//             msg:error.message,
//             errors:error.errors
//         })
//     }

//     res.status(500).send({
//         code:500,
//         status:false,
//         msg:"Internal Server Error"
//     })
//     next()
// }

