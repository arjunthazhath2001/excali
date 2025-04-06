import express from 'express'
import cors from 'cors'
import z from 'zod'
import bcrypt from 'bcrypt'
const app= express()
app.use(cors())
app.use(express.json())

app.post('/signup', async(req,res)=>{
    const requiredBody= z.object({
        email: z.string().email(),
        password: z.string().min(5,{message:"password should have min 5 characters"}).max(50,{message:"password not more than 50 characters"})
    })

    const parsedBody= requiredBody.safeParse(req.body)

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
        return res.json({message:"User created successfully"})
    } else{
        res.json({message:"User not created"})
    }
    } catch(error){
        res.json({message:"Some error has occured. Try again later"})
    }


})




app.listen(3001)