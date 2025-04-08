import e, { Router } from "express";
import { footballProfileRegister } from "../types";
import client from "@multisport/db/client"

export const router  =Router()

router.post("/profileRegister", async(req, res) => {
    console.log(req.body);
    
    const parsedData = footballProfileRegister.safeParse(req.body)
    if(!parsedData.success)
    {
        res.status(400).json({message: "Invalid data format"})
        return 
    }
    try{
        const existUser = await client.footballProfile.findUnique({
            where: {
                userId : parsedData.data.userId
            }
        })
        if(existUser)
        {
            res.status(403).json({message: "User Already Exists"})
            return 
        }
        const newProfile = await client.footballProfile.create({
            data:{
                userId : parsedData.data.userId,
                role: parsedData.data.role,
                nickname : parsedData.data.nickname,
                experience : parsedData.data.experience
                
            }
        })
        if(newProfile)
        {
            res.status(200).json({id : newProfile.id, role: newProfile.role, experience :newProfile.experience, nickname : newProfile.nickname})
            return 
        }
        res.status(400).json({message : "Cannot create Football Profile"})
        return 
    }
    catch(e)
    {
        res.status(500).json({message: "Server Error"})
        return 
    }
})


router.get("/profileCheck/:id" , async(req, res) => {
    
    const id = parseInt(req.params.id); 

    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return 
    }

    try {
        const userExist = await client.footballProfile.findUnique({
            where: {
            userId: id,
            },
        });

        if (userExist) {
            res.status(200).json(userExist);
            return 
        } else {
            res.status(404).json({ message: "User not found" });
            return 
        }
    } 
    catch (err) 
    {
        console.error("Error checking user profile:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return 
    }
})