import { WebSocketServer } from "ws";
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const wss= new WebSocketServer({port:8080})

wss.on("connection",function connection(ws,req){
    
    
    const url= req.url

    if(!url){
        return
    }

    const queryParams= new URLSearchParams(url.split("?")[1])

    const token= queryParams.get('token') || ""

    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    
    if(!decoded || !decoded.userId)
    {
        ws.close()
        return 
    }
    
    
    ws.on("message", function message(data){
        ws.send(`You have sent ${data.toString()}`)
    })
})