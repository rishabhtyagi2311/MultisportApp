import  express from "express";
import client from "@multisport/db/client"

const app =  express()

app.listen(3000, ()=> {
    console.log("server is up at port 3000");
    })


