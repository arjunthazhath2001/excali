import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";
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

    const decodedToken= jwt.verify(token, JWT_SECRET as string)

    if(decodedToken){
        req.userId= decodedToken.userId
        next()
    } else{
        res.json("You are not authorised")
        return
    }


}