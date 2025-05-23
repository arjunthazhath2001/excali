import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from 'jsonwebtoken'

const wss= new WebSocketServer({port:8080})

wss.on("connection",function connection(ws,req){
    
    
    const url= req.url

    if(!url){
        return
    }

    const queryParams= new URLSearchParams(url.split("?")[1])

    const token= queryParams.get('token') || ""

    const decoded= jwt.verify(token,JWT_SECRET as string)
    
    if(!decoded || !decoded.userId)
    {
        ws.close()
        return 
    }
    
    
    ws.on("message", function message(data){
        ws.send(`You have sent ${data.toString()}`)
    })
})