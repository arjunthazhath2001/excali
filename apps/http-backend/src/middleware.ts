import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
interface Token{
    userId:string,
    iat: Date
}
export function Middleware(req:Request,res:Response,next:NextFunction){
    const auth= req.headers.authorization

    if(!auth || !auth.startsWith("Bearer")){
        res.json({message:"Invalid credentials"})
    }

    const token= auth?.split(" ")[1] || ""

    const decodedToken= jwt.verify(token, process.env.JWT_SECRET) as Token

    if(decodedToken){
        req.userId= decodedToken.userId
        next()
    } else{
        res.json("You are not authorised")
        return
    }


}