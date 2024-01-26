import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const authvalidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authToken = req.headers.authorization || req.headers.authorization;
  if (authToken) {
    authToken = authToken.split(" ")[1];
    jwt.verify(
      authToken,
      `${process.env.JWT_AUTH_SECRET_KEY}`,
      (err: any, decoded: any) => {
        if (err) {
          res.status(400).send({
            msg: "Unauthorised",
          });
        }
        req.headers.userId = decoded.userId;
        req.headers.userName = decoded.userName;
      }
    );
  } else {
    res.status(400).send({
      msg: "No Token Provided",
    });
  }
  next();
};
