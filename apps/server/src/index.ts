import  express from "express";
import client from "@multisport/db/client"
import {router as onboardingRouter} from "./routers/onboardingRouter"

const app =  express()

app.use(express.json())

app.use("/api/v1/onboarding", onboardingRouter)


app.listen(3000, ()=> {
    console.log("server is up at port 3000");
    })


