import { Router } from "express";
import client from "@multisport/db/client"
import { basicOnboardingInfo } from "../types";

export  const router = Router()

router.post("/basicInfo", async(req, res) => {
    
    const parsedData = basicOnboardingInfo.safeParse(req.body)
    if(!parsedData.success)
    {
        res.status(400).json({message:"Invalid data format"})
        return

    }
    try{
        const user = await client.userInfo.findFirst({
            where:{
                username: parsedData.data.username
            }
        })
        if(user)
        {
            res.status(403).json({message:"User Already Exists"})
            return 
        }
        const newUser  = await client.userInfo.create({
            data:{
                username: parsedData.data.username,
                firstname: parsedData.data.firstname,
                lastname : parsedData.data.lastname,
                age : parsedData.data.age,
                city : parsedData.data.city,
                email : parsedData.data.email
    
            }
        })
        if(newUser)
        {
            res.status(200).json(newUser)
            return
        }
        res.status(400).json({message : "Cannot create new user"})
        return 
    }
    catch(e)
    {
        res.status(500).json({message: "Server Error"})
        return 
    }
   
})