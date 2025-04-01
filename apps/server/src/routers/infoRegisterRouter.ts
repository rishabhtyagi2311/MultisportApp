import { Router } from "express";
import client from "@multisport/db/client"
import { infoRegistertype } from "../types";

const router = Router()

router.post("/infoRegister", async(req, res) => {
    
    const parsedData = infoRegistertype.safeParse(req.body)
    if(!parsedData.success)
    {
        res.status(400).json({message:"Invalid data format"})
        return

    }
    

})