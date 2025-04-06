import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Middleware } from './middleware'
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema, SignInSchema } from '@repo/common/types'

const app= express()
app.use(cors())
app.use(express.json())

app.post('/signup', async(req,res)=>{

    const parsedBody= CreateUserSchema.safeParse(req.body)

    if(!parsedBody.success){
        res.json({message:parsedBody.error.issues[0]?.message})
        return
    }

    const {email,password}= req.body

    try{
    //hit the db to check whether email already exists

    if(existingUser){
        res.json({message:"Email already exists. Try a new one"})
        return
    }

    const hashedPassowrd= await bcrypt.hash(password,5)

    //hit the db and store the email along with hashed password

    if(userCreated){
        res.json({message:"User created successfully"})
    } else{
        res.json({message:"User not created"})
    }
    } catch(error){
        res.json({message:"Some error has occured. Try again later"})
    }

})

app.post('/signin', async(req,res)=>{
    const parsedBody= SignInSchema.safeParse(req.body)

    if(!parsedBody.success){
        res.json({message:parsedBody.error.issues[0]?.message})
        return
    }
    const {email,password}= req.body

    try{//hit the db to find user with this email
        }
        catch(error){
            res.json({message:'Some error connecting to db. Try later'})
            return
        }

    if(user){
        const verified= await bcrypt.compare(password,user.password)
        if(verified){
            const token= jwt.sign({user._id}, JWT_SECRET)
            res.json({"token":token})

        }
    } else{
        res.json({message:"User does not exist"})
    }
} )

app.post('/createroom', Middleware, async(req,res)=>{

    //db call

    res.json({roomId:123})
})



app.listen(3001)